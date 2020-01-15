const server = require('http').createServer();
const io = require('socket.io')(server);
const { addUser } = require('./users');

io.on('connection', socket => {
	socket.emit('join', `u has joined the chat`);

	socket.on('message', message => {
		console.log(message);
	});

	socket.on('disconnect', user => {
		console.log(user);
		console.log(`${user} has left the chat`);
	});
});

server.listen(8080);
