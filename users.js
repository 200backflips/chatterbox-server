const users = [];

const addUser = name => {
	name = name.trim().toLowerCase();

	const existingUser = users.find(user => {
		user.name === name;
	});

	if (existingUser) {
		return { error: 'username is already taken' };
	}
	const user = name;
	users.push(user);
};

module.exports = addUser;
