'use strict';

var DIRECTIONS = {
	NORTH: 'north',
	SOUTH: 'south',
	EAST: 'east',
	WEST: 'west',
	EXIT: 'exit'
};

var readlineSync = require('readline-sync');

var select = readlineSync.keyInSelect;
var prompt = readlineSync.question;
var confirm = readlineSync.keyInYN;

function getDirection() {
	var dirs = Object.keys(DIRECTIONS).map(k => DIRECTIONS[k]);

	var dirIndex = select(dirs, 'Which direction?');

	var dir = DIRECTIONS[Object.keys(DIRECTIONS)[dirIndex]];

	console.log('Moving ' + dir + ' ...');

	return dir;
}



var userName = 'Username';

userName = prompt('What is your name? ');
console.log('welcome ' + userName + '! ... to my nightmare');

console.log("You are in a pitch black room and someone or something is following you.");

console.log("You feel an intense need to escape but all you have is a dimly lit compass. Which direction do you want to go?")

do{
	var dir = getDirection();

	if (dir === DIRECTIONS.NORTH) {
		if (confirm('Are you sure you want to go north?')) {
			console.log('You moved north. The Unknown is still following you.');
		}
		// G0 north
	} else if (dir === DIRECTIONS.SOUTH) {
		var reason = prompt('Why? ');

		console.log('You moved south because: ' + reason);
		// Go south
	} else if (dir === DIRECTIONS.EAST) {
		// Go east
	} else if (dir === DIRECTIONS.WEST) {
		// Go west
	} else {
		// I don't know where you're going
	}


}while(dir !== DIRECTIONS.EXIT);

console.log('Goodbye');

