/**
 * Check if email sender address is in the list of permitted
 * addresses. Default is 'domain' which processes only mails
 * sent from the same domain as the email address this application
 * listens to.
 *
 * @param address {string} sender's email address
 * @return {boolean}
 */
const emailSenderIsValid = (address) => {
    const allowedEmails = process.env.ALLOWED_SENDER || 'domain';

    switch (allowedEmails) {
        case 'domain':
            // check if email is from same domain
            const expectedDomain = getDomainFromEmailAddress(process.env.MAIL_USERNAME);
            const receivedDomain = getDomainFromEmailAddress(address);
            return expectedDomain === receivedDomain;
        case '*':
            checkThatEmailAddressIsWellFormed(address);
            return true;
        default:
            throw new Error(`ALLOWED_SENDER=${allowedEmails} is invalid. Only "domain" or "*" is allowed.`);
    }
};


/**
 * Extract domain name from an email address
 *
 * @param address {string} an email address
 * @return {*}
 */
const getDomainFromEmailAddress = (address) => {
    checkThatEmailAddressIsWellFormed(address);
    return address.split('@')[1].split('.')[0];
};


/**
 * Check that an email string is well-formed
 *
 * @param address {string} an email address
 */
const checkThatEmailAddressIsWellFormed = (address) => {
    const expectedPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!expectedPattern.test(address)) throw new Error(`${address} has an invalid email pattern`);
};


module.exports.emailSenderIsValid = emailSenderIsValid;