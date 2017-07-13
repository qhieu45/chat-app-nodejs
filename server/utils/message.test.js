const expect = require('expect');
const { generateMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate the correct Message object', () => {
        message = {from: 'Hieu', text: 'Test Hieu'};
        const generatedMessage = generateMessage(message.from, message.text);
        expect(generatedMessage).toInclude({
            from: message.from,
            text: message.text
        });
        // expect(generatedMessage.from).toEqual(message.from);
        // expect(generatedMessage.text).toEqual(message.text);
        expect(generatedMessage.createdAt).toBeA('number');
    })
})