const server = require('http').createServer();
const io = require('socket.io')(server);
const { validateUsername, users } = require('./validator');

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

	socket.on('userLeft', user => {
		users.pop(user);
		return io.emit('userLeft', user);
	});

});

server.listen(8080);

const handleSignal = signal => {
  console.log(`received ${signal}, terminating connections`)
  io.close();
  process.exit(0);
}

process.on('SIGINT', handleSignal);
process.on('SIGTERM', handleSignal);
