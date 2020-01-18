const users = [];

const addUser = name => {
	name = name.toLowerCase();
	if (users.includes(name)) {
		return true;
	}
	return false;
};

const fullRegEx = /^([a-zåäö]{1})(\S{2,19})$/i;
const doesntStartWithLetter = /^([^a-zåäö]{1})/i;
const noSpacesAllowed = /\s/;

const validateUsername = username => {
	switch (true) {
		case username === undefined:
			return {
				error: 'please enter a nickname'
			};
		case addUser(username) === true:
			return {
				error: 'unfortunately, that nickname is already taken'
			};
		case doesntStartWithLetter.test(username):
			return {
				error: 'your nickname must begin with letter'
			};
		case noSpacesAllowed.test(username):
			return {
				error: 'your nickname may not contain spaces'
			};
		case username.length < 3:
			return {
				error: 'your nickname must be at least 3 characters long'
			};
		case username.length > 20:
			return {
				error: 'your nickname may not exceed 20 characters'
			};
		case fullRegEx.test(username):
			users.push(username);
			return {
				username: username,
				error: ''
			};
		default:
			return {
				error: 'please try a different nickname'
			};
	}
};

module.exports = { addUser, validateUsername, users };
