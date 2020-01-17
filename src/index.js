const server = require('http').createServer();
const io = require('socket.io')(server);
const { validateUsername } = require('./validator');

io.on('connection', socket => {
	socket.on('sendUsername', username => {
		io.emit('validateUsername', validateUsername(username));
	});

	socket.on('join', username => {
		return io.emit('join', username);
	});

	socket.on('sentMessages', message => {
		return io.emit('receivedMessages', message);
	});
});

server.listen(8080);
