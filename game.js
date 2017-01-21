'use strict';

const lib = require('./lib');

const game = new lib.Game('Escape');

var hasKey = false;

function c() {
	game.info("I'm in the closet");
	return true;
}

function r() {
	game.info("You found a key!");
	hasKey = true;
	return true;
}

function s() {
	if (hasKey) {
		game.info("Welcome to the secret room!");
		return true;
	} else {
		game.info("Go away!");
		return false;
	}
}

game.build([
	[ '|', '+', '+', '+',  '+' ],
	[ '|', 's', ' ', ' ',   c  ],
	[ '|', ' ', '+',  r ,  '+' ],
	[ '|', ' ', '+', '+',  '+' ],
	[ '|', ' ', ' ', ' ',   s  ],
	[ '|', '-', '|', '-',  '-' ] 
]);

game.start();

