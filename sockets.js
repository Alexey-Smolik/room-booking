const io = require('socket.io')();
const logger = require('morgan');

io.on('connection', socket => {
    console.log('connected');
});

module.exports = io;