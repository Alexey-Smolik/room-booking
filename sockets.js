const io = require('socket.io')();
const colors = require('colors');

io.on('connection', socket => {
    let user = '';
    socket.emit('test', { message: 'test' });
    socket.on('connect user', data => {
        if(data) {
            user = data.currentUser.username;
            console.log(`User ${data.currentUser.username} connected!`.blue);
        }
    });

    socket.once('disconnect', () => {
        console.log(`User ${user} disconnected!`.magenta);
    });
});

module.exports = io;