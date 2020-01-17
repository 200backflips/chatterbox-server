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
				error: 'username already taken'
			};
		case doesntStartWithLetter.test(username):
			return {
				error: 'must begin with letter'
			};
		case noSpacesAllowed.test(username):
			return {
				error: 'may not contain spaces'
			};
		case username.length < 3:
			return {
				error: 'must be at least 3 characters'
			};
		case username.length > 20:
			return {
				error: 'cannot exceed 20 characters'
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

module.exports = { addUser, validateUsername };
