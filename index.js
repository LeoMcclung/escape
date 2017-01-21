'use strict';

var DIRECTIONS = {
	NORTH: 'north',
	SOUTH: 'south',
	EAST: 'east',
	WEST: 'west'
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

userName = readlineSync.question('What is your name? ');
console.log('Hi ' + userName + '! Welcome to my game!');

var dir = getDirection();

if (dir === DIRECTIONS.NORTH) {
	if (confirm('Are you sure you want to go north?')) {
		console.log('You moved north!');
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
}

