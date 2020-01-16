const server = require('http').createServer();
const io = require('socket.io')(server);
const { addUser } = require('./users');

io.on('connection', socket => {
	socket.on('join', username => {
		return io.emit('join', `${username} has joined the chat`);
	});

	socket.on('sentMessages', message => {
		console.log(message)
		return socket.broadcast.emit('receivedMessages', message);
	});

	socket.on('disconnect', data => {
		console.log(data);
	});
});

server.listen(8080);
