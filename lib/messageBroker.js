const { connect } = require('amqplib');

/**
 * Connect to a RabbitMQ instance and return that connection
 *
 * @return {*}
 */
const getConnection = () => {
    const url = `amqp://${process.env.AMQP_USER}:${process.env.AMQP_PASSWORD}@`
        + `${process.env.AMQP_HOST}:${process.env.AMQP_PORT}`;
    return connect(url);
}

/**
 * Get messages from a RabbitMQ queue and perform an action on it
 *
 * @param queueName {string} the queue to fetch data from
 * @param action {function} a callback function that receives `message` and `channel` arguments
 * @param error {function} a callback function called whenever an error occurs. A good error function includes reporting to a monitoring platform (e.g. Sentry | AWS Cloudwatch | Bugsnagg)
 */
const getMessageFromQueue = (queueName, action, error = null) => {
    const connection = getConnection();

    connection.then(connected => {
        return connected.createChannel();
    }).then(channel => {
        return channel.assertQueue(queueName).then(ok => {
            return channel.consume(queueName, async message => {
                if (message !== null) {
                    await action(message, channel);
                } else {
                    console.log(`No message in queue ${queueName}`);
                }
            });
        });
    }).catch(e => {
        if (error) return error();
        console.warn(e);
    });
}

/**
 * Acknowledges the message fetched from RabbitMQ and logs a success message
 *
 * @param msg the message pulled from RabbitMQ queue
 * @param channel the channel object exposed by the RabbitMQ client
 * @param value value provided by a resolved Promise
 */
const handleSuccessRequest = (msg, channel, value) => {
    console.log(`Request successful with status code ${value.status}`);
    // acknowledge message without which data is automatically returned
    // back to queue
    channel.ack(msg);
}

module.exports = {
    getMessageFromQueue: getMessageFromQueue,
    handleSuccessRequest: handleSuccessRequest
}