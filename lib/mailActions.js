const { emailSenderIsValid } = require("./validation");

/**
 * The function to call when connection to mail server is established
 *
 * @return {boolean}
 */
const serverConnected = () => {
    console.log("imap connected");
    return true;
}

/**
 * The function to call when connection to mail server ends
 *
 * @return {boolean}
 */
const serverDisconnected = () => {
    console.log("imap disconnected");
    return true;
}

/**
 * The function to call when a mailbox is fetched
 *
 * @param mailbox {Object} mailbox object returned
 */
const mailboxFetched = mailbox => {
    console.log("Total number of mails: ", mailbox.messages.total); // this field in mailbox gives the total number of emails
}

/**
 * The function to call when error occurs while trying to connect to mail server
 *
 * @param err
 */
const errorOccurred = err => {
    console.log(err.message);
    throw new Error(err.message);
}

/**
 * Do something with the whole email as a single object
 *
 * @param mail {Object} the mail object
 * @param sequenceNumber {Number} numbering from 1 to the number of messages in the mailbox. Also called MSN, sequence number is not unique and will change as messages are deleted
 */
const processMail = (mail, sequenceNumber) => {
    const [ sender ] = mail.from.value;

    if (emailSenderIsValid(sender.address)) {
        console.log('We process this')
    }
    // console.log('OBJECT KEYS:', Object.keys(mail));
    // console.log("Total number of mails: ", mail /*.messages.total*/); // this field in mailbox gives the total number of emails
}

module.exports = {
    serverConnected,
    serverDisconnected,
    mailboxFetched,
    errorOccurred,
    processMail
}