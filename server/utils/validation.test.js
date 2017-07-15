const expect = require('expect');
const { isRealString } = require('./validation');

// non string values
// string with only spaces
// should allow string with non-space characters

describe('Testing isRealString method', () => {
    it('should return false for non string values', () => {
        number = 123;
        expect(isRealString(number)).toBe(false);
    });

    it('should return false for string with only spaces', () => {
        string = '             ';
        expect(isRealString(string)).toBe(false);
    })

    it('should return true for good string value', () => {
        string = 'abavcs';
        expect(isRealString(string)).toBe(true);
    })
});
