'use strict';

const prompt = require('prompt');

console.log("You're in a dark room and something is following you.");
console.log("There are exit signs to your left, right, and straight ahead. Where do you go?");

prompt.get('direction', (err, result) => {
	if (err) {
		console.log('ERROR!', err);
	} else {
		console.log(result);
	}
});

