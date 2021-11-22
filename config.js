// This is the module where global configurations for Mail Watchman is
// done and exported


/**
 * Configurations for Mail Listener NPM package
 *
 * @type {{debug: {(message?: any, ...optionalParams: any[]): void, (...data: any[]): void}, attachments: boolean, authTimeout: string, connTimeout: string, tlsOptions: {rejectUnauthorized: boolean}, attachmentOptions: {directory: string}, password: string, mailbox: string, port: string, host: string, markSeen: boolean, tls: string, username: string, searchFilter: string[], fetchUnreadOnStart: boolean}}
 */
const mail = {
    username: process.env.MAIL_USERNAME,
    password: process.env.MAIL_PASSWORD,
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT, // imap port
    tls: process.env.MAIL_TLS,
    connTimeout: process.env.MAIL_CONN_TIMEOUT,
    authTimeout: process.env.MAIL_AUTH_TIMEOUT,
    debug: console.log, // Or your custom function with only one incoming argument. Default: null
    tlsOptions: { rejectUnauthorized: false },
    mailbox: process.env.MAIL_BOX, // mailbox to monitor
    searchFilter: ["ALL"], // the search filter being used after an IDLE notification has been retrieved
    markSeen: true, // all fetched email will be marked as seen and not fetched next time
    fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`,
    attachments: false, // download attachments as they are encountered to the project directory
    attachmentOptions: { directory: "attachments/" } // specify a download directory for attachments
};

module.exports = {
    mailConfig: mail
}