const server = require('http').createServer();
const io = require('socket.io')(server);
const { validateUsername, users } = require('./validator');
const { logger } = require('./logger');

io.on('connection', socket => {
	socket.on('sendUsername', username => {
		io.emit('validateUsername', validateUsername(username));
	});

	socket.on('join', username => {
		logger.info(`username: ${username} has joined the chat.`)
		return io.emit('join', username);
	});

	socket.on('sentMessages', message => {
		logger.info(`a message is sent by ${message.user}: '${message.message}'`)
		return io.emit('receivedMessages', message);
	});

	socket.on('userLeft', user => {
		logger.info(`username: ${user} has left the chat.`)
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
