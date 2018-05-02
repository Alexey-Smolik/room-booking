const io = require('socket.io')();
const colors = require('colors');

//  SOCKETS FOR DATA EXCHANGE
io.on('connection', socket => {
    let user = '';
    socket.on('connect user', data => {
        if(data) {
            user = data.username;
            console.log(`User ${data.username} connected!`.blue);
        }
    });

    socket.once('disconnect', () => {
        console.log(`User ${user} disconnected!`.magenta);
    });
});

module.exports = io;