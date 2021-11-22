const { serverConnected, errorOccurred} = require('../lib/mailActions');
const { MailListener } = require('mail-listener6');
const { mailConfig } = require('../config');


describe('mail listener', () => {
    const mailHostBackup = process.env.MAIL_HOST;

    afterEach(() => {
        process.env.MAIL_HOST = mailHostBackup;
    });

    it('should throw an error if connection is not successful', async () => {
        const mailListener = new MailListener(mailConfig);
        // set MAIL_HOST to a wrong string to mock/cause a failed connection
        process.env.MAIL_HOST = 'fake.host.com';

        // is this unit testing?
        // ain't I supposed to be testing the smallest indivisible part of code i.e. errorOccurred()?
        // is this approach correct?
        // should you be testing libraries or testing what you implement with the library?
        // if I come across situations like this, is it okay to refactor instead so that I can test units?

        mailListener.start();

        await expect(() => {
            mailListener.on('error', errorOccurred);
        }).rejects.toThrowError();
    });

});