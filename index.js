const server = require('http').createServer();
const io = require('socket.io')(server);

const users = [];

const addUser = name => {
	name = name.toLowerCase();
	if (!users.includes(name)) {
		return true;
	}
	users.push(name);
	return false;
};

io.on('connection', socket => {
	socket.on('getUsername', username => {
		io.emit('validateUsername', addUser(username));
	});

	socket.on('join', username => {
		return io.emit('join', username);
	});

	socket.on('sentMessages', message => {
		return io.emit('receivedMessages', message);
	});
});

server.listen(8080);
