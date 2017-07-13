const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message');

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

describe('generateLocationMessage', () => {
    it('should generate correct Location message', () => {
        message = {from: 'Admin', latitude: 2, longitude: 3}
        const generatedLocationMessage = 
                generateLocationMessage(message.from, message.latitude, message.longitude);
        expect(generatedLocationMessage).toInclude({
            from: message.from,
            url: `https://www.google.com/maps?q=${message.latitude},${message.longitude}`
        })
        expect(generatedLocationMessage.createdAt).toBeA('number');
    })
})
