const { emailSenderIsValid } = require("../lib/validation");
const {
    shouldFailIfSenderEmailAddressIsIncorrectOrEmpty,
    shouldFailForDifferentDomainsButPassForSameDomain
} = require('./helpers/groupedTests');


describe('ALLOWED_DOMAIN', () => {

    const backupForAllowedSender = process.env.ALLOWED_SENDER
    const backupForMailUsername = process.env.MAIL_USERNAME

    beforeAll(() => {
        process.env.MAIL_USERNAME = 'test@host.com'
    });

    afterAll(() => {
        process.env.ALLOWED_SENDER = backupForAllowedSender
        process.env.MAIL_USERNAME = backupForMailUsername
    });

    describe('environment variable is not set', () => {

        beforeAll(() => {
            delete process.env.ALLOWED_SENDER
        });

        describe('email sender validation', () => {
            shouldFailForDifferentDomainsButPassForSameDomain();
            shouldFailIfSenderEmailAddressIsIncorrectOrEmpty();
        });

    });

    describe('environment variable is set to "*"', () => {

        beforeAll(() => {
            process.env.ALLOWED_SENDER = '*'
        })

        describe('email sender validation', () => {

            it('should pass if email is sent from any valid email domain', function () {
                const validDomains = [
                    'email@another-domain.com',
                    'test@mydomain.com',
                    'email@yahoo.com',
                    'email@gmail.com',
                    'email@hotmail.com'
                ];

                for (const domain of validDomains) {
                    expect(emailSenderIsValid(domain)).toBe(true)
                }
            });

            shouldFailIfSenderEmailAddressIsIncorrectOrEmpty();

        });

    });

    describe('environment variable is set to "domain"', () => {

        beforeAll(() => {
            process.env.ALLOWED_SENDER = 'domain'
        })

        describe('email sender validation', () => {
            shouldFailForDifferentDomainsButPassForSameDomain();
            shouldFailIfSenderEmailAddressIsIncorrectOrEmpty();
        });

    });

    describe('environment variable is not set to "domain" or "*"', () => {

        beforeAll(() => {
            process.env.ALLOWED_SENDER = 'xx'
        })

        describe('email sender validation', () => {
            it('should fail', function () {
                expect(() => emailSenderIsValid('someone@host.com'))
                    .toThrowError(`ALLOWED_SENDER=${process.env.ALLOWED_SENDER} is invalid. Only "domain" or "*" is allowed.`)
            });
        });

    });

});