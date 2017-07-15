const socket = io();

const scrollToBottom = () => {
    // Selectors
    let messages = jQuery('#messages');
    let newMessage = messages.children('li:last-child');
    // Heights
    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }

}

socket.on('connect', () => {
    console.log(`Connected to server`);
    const params = jQuery.deparam(window.location.search);

    socket.emit('join', params, (error) => {
        if (error) {
            alert(error);
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    });
})

socket.on('disconnect', () => {
    console.log(`Disconnected from server`);
})

socket.on('updateUserList', (users) => {
    var ol = jQuery('<ol></ol>');
    users.forEach((user) => {
        ol.append(jQuery('<li></li>').text(user));
    });
    // console.log('User list: ', users);
    jQuery('#users').html(ol);
})

socket.on('newMessage', (message) => {
    const formattedTime = moment(message.createdAt).format('h:mm a');    
    let template = jQuery('#message-template').html();
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
})

socket.on('newLocationMessage', (message) => {
    const formattedTime = moment(message.createdAt).format('h:mm a');    
    let template = jQuery('#location-message-template').html();
    let html = Mustache.render(template, {
        from: message.from,
        createdAt: formattedTime,
        url: message.url
    })
    jQuery('#messages').append(html);
    scrollToBottom();    
})

jQuery('#message-form').on('submit', (e) => {
    e.preventDefault();
    let messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        text: messageTextbox.val()
    }, () => {
        messageTextbox.val('');
    })
})

const locationButton = jQuery('#send-location');
locationButton.on('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported!');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location ...');

    navigator.geolocation.getCurrentPosition((position) => {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, (error) => {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
    })
});