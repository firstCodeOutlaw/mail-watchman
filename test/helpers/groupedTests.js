const { emailSenderIsValid } = require("../../lib/validation");


function shouldFailIfSenderEmailAddressIsIncorrectOrEmpty() {
    it('should fail if sender email address is incorrect', function () {
        const incorrectEmailAddresses = ['test@host', 'test@host.c', 'test@.org', 'test@..b.org'];

        for (const email of incorrectEmailAddresses) {
            expect(() => emailSenderIsValid(email)).toThrowError(`${email} has an invalid email pattern`)
        }
    });

    it('should fail if sender email address is empty', function () {
        expect(() => emailSenderIsValid('')).toThrowError('has an invalid email pattern')
    });
}


function shouldFailForDifferentDomainsButPassForSameDomain() {
    it('should fail if email is sent from a different domain', function () {
        expect(emailSenderIsValid('email@another-host.com')).toBe(false)
    });

    it('should pass if email is sent from same domain', function () {
        expect(emailSenderIsValid('email@host.com')).toBe(true)
    });
}


module.exports = {
    shouldFailIfSenderEmailAddressIsIncorrectOrEmpty: shouldFailIfSenderEmailAddressIsIncorrectOrEmpty,
    shouldFailForDifferentDomainsButPassForSameDomain: shouldFailForDifferentDomainsButPassForSameDomain
}