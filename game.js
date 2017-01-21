'use strict';

const lib = require('./lib');

const game = new lib.Game('Escape');

var hasKey = false;

function cls() {
	game.info("I'm in the closet");
	return true;
}

function key() {
	game.success("You found a key!");
	hasKey = true;
	return true;
}

function sec() {
	if (hasKey) {
		game.info("Welcome to the secret room!");
		game.finish('Congratulations! You have escaped Donald Trump!');
	} else {
		game.error("This room is locked.");
		return false;
	}
}

game.build([
	[ '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+'],
	[ '+', 's', ' ', ' ', '+', '+', '+', '+', ' ', ' ', ' ', ' ', ' ', '+', '+'],
	[ '+', ' ', '+', ' ', '+', '+', '+', '+', ' ', '+', '+', '+', ' ', '+', '+'],
	[ '+', ' ', '+', ' ', '+', '+', '+', '+', ' ', '+', '+', '+', ' ', '+', '+'],
	[ '+', ' ', '+', ' ', '+', '+', cls, '+', ' ', '+', '+', '+', ' ', '+', '+'],
	[ '+', ' ', '+', ' ', '+', '+', ' ', '+', ' ', '+', ' ', ' ', ' ', ' ', '+'],
	[ '+', ' ', '+', ' ', ' ', '+', ' ', ' ', ' ', '+', ' ', '+', '+', ' ', '+'],
	[ '+', ' ', '+', '+', ' ', '+', ' ', '+', '+', '+', ' ', '+', '+', ' ', '+'],
	[ '+', ' ', '+', '+', ' ', ' ', ' ', '+', sec, ' ', ' ', '+', '+', key, '+'],
	[ '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+'],
]);


game.start();

