'use strict';

const prompt = require('prompt');
const colors = require('colors');

const Cell = require('./Cell');
const DIRECTIONS = require('./Directions');

class Game {
	constructor(name = 'My Game') {
		this.verbose = true;
		this.name = name;
		this.currentCell = null;

		this.board = [
			[
				// Empty 2D array
			]
		];
	}

	build(board = [[]]) {
		this.board = board;

		for (let i=0; i<board.length; i++) {
			for (let j=0; j<board[i].length; j++) {
				this.board[i][j] = new Cell(i, j, board[i][j]);

				if (this.board[i][j].type === Cell.TYPES.START) {
					this.currentCell = this.board[i][j];
				}
			}
		}
	}

	getMove() {
		switch(this.currentCell.type) {
			case Cell.TYPES.HALL:
			case Cell.TYPES.START:
				this.info("There's not really anything interesting here...");
				break;
		}

		this.log("Where to go? ('north', 'south', 'east' or 'west'):");

		prompt.get('direction', (err, res) => {
			const nextPos = Object.assign({}, this.currentCell.pos);

			switch (res.direction.toLowerCase()) {
				case 'exit':
				case 'quit':
					return;

				case DIRECTIONS.NORTH:
					nextPos.x--;
					break;

				case DIRECTIONS.SOUTH:
					nextPos.x++;
					break;

				case DIRECTIONS.WEST:
					nextPos.y--;
					break;

				case DIRECTIONS.EAST:
					nextPos.y++;
					break;

				default:
					this.error('Invalid input!');
					return this.getMove();
			}

			if (typeof this.board[nextPos.x] !== 'undefined' && typeof this.board[nextPos.x][nextPos.y] !== 'undefined') {
				const nextCell = this.board[nextPos.x][nextPos.y];

				if (this.canMoveTo(nextCell, res.direction)) {
					this.currentCell = nextCell;
					this.success(`Moved ${res.direction}!`);
				} else {
					this.warn(`Can't move ${res.direction}!`);
				}
			} else {
				this.warn(`Can't move s ${res.direction}!`);
			}

			this.getMove();
		});
	}

	canMoveTo(cell, dir) {
		switch(cell.type) {
			case Cell.TYPES.WALL:
				return false;

			case Cell.TYPES.HALL:
			case Cell.TYPES.START:
				return true;

			case Cell.TYPES.EXEC:
				return !!cell.value();
		}
	}

	start() {
		this.banner(`Welcome to: ${this.name}!`);

		this.getMove();
	}

	msg(msg, colors = []) {
		colors.forEach(color => {
			if (typeof msg[color] !== 'undefined') {
				msg = msg[color];
			}
		});

		console.log(msg);
	}

	banner(msg) {
		const sep = '*';
		const settings = ['cyan'];

		msg = `${sep}  ${msg}  ${sep}`;

		this.msg(sep.repeat(msg.length), settings);
		this.msg(msg, settings);
		this.msg(sep.repeat(msg.length), settings);
	}

	log(msg) {
		this.msg(msg);
	}

	error(msg) {
		this.msg(msg, ['red']);
	}

	warn(msg) {
		this.msg(msg, ['yellow']);
	}

	success(msg) {
		this.msg(msg, ['green']);
	}

	info(msg) {
		this.msg(msg, ['cyan']);
	}

	debug(msg) {
		if (this.verbose) {
			this.msg(`DEBUG: ${msg}`, ['cyan']);
		}
	}
}

module.exports = Game;