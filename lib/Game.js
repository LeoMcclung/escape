'use strict';

var readlineSync = require('readline-sync');

const colors = require('colors');

const Cell = require('./Cell');
const DIRECTIONS = require('./Directions');

class Game {
	constructor(name = 'My Game') {
		this.verbose = true;
		this.name = name;
		this.finished = false;
		this.finishedMsg = 'Finished!';
		this.currentCell = null;

		this.board = [
			[
				// Empty 2D array
			]
		];

		this.select = readlineSync.keyInSelect;
		this.prompt = readlineSync.question;
		this.confirm = readlineSync.keyInYN;
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

	getDirection() {
		var dirs = Object.keys(DIRECTIONS).map(k => DIRECTIONS[k]);

		var dirIndex = this.select(dirs, 'Which direction?');

		if (dirIndex >= 0) {
			var dir = DIRECTIONS[Object.keys(DIRECTIONS)[dirIndex]];

			this.info('Moving ' + dir + ' ...');

			return dir;
		}

		return DIRECTIONS.EXIT;
	}

	getOptions() {
		const pos = this.currentCell.pos;

		const cells = {
			north: this.getCell(pos.x-1, pos.y),
			south: this.getCell(pos.x+1, pos.y),
			east: this.getCell(pos.x, pos.y+1),
			west: this.getCell(pos.x, pos.y-1)
		};

		this.log(`Current position: (${pos.y}, ${pos.x})`);

		Object.keys(cells).forEach(dir => {
			const colors = [];
			const cell = cells[dir];
			let info = 'nothing';

			if (cell) {
				switch(cell.type) {
					case Cell.TYPES.DOOR:
					case Cell.TYPES.WALL:
						info = 'a blank wall';
						break;

					case Cell.TYPES.HALL:
					case Cell.TYPES.START:
						info = 'a bleak hallway';
						break;

					case Cell.TYPES.ROOM:
						info = 'a room of some kind';
						colors.push('cyan');
						break;
				}
			}

			this.msg(`To your ${dir}, there is ${info}`, colors);
		});
	}

	getCell(x, y) {
		if (typeof this.board[x] !== 'undefined' && typeof this.board[x][y] !== 'undefined') {
			return this.board[x][y];
		}

		return null;
	}

	getMove() {
		if (!this.finished) {
			switch(this.currentCell.type) {
				case Cell.TYPES.HALL:
				case Cell.TYPES.START:
					this.info("There's not really anything interesting here...");
					break;
			}

			this.getOptions();

			var dir = this.getDirection();

			const nextPos = Object.assign({}, this.currentCell.pos);

			switch (dir) {
				case DIRECTIONS.EXIT:
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

			const nextCell = this.getCell(nextPos.x, nextPos.y);

			if (nextCell) {
				if (this.canMoveTo(nextCell, dir)) {
					this.currentCell = nextCell;
				} else if (!this.finished) {
					let msg = `Can't move ${dir}!`;

					if (nextCell.isA(Cell.TYPES.WALL)) {
						msg += ' There is a wall there!';
					}

					this.warn(msg);
				}
			} else {
				this.warn(`You can't go any farther ${dir}! (end of map)`);
			}

			this.getMove();
		} else {
			this.success(this.finishedMsg);
		}
	}

	canMoveTo(cell, dir) {
		switch(cell.type) {
			case Cell.TYPES.WALL:
				return false;

			case Cell.TYPES.HALL:
			case Cell.TYPES.START:
				return true;

			case Cell.TYPES.ROOM:
				return !!cell.value();
		}
	}

	start(msg = null) {
		if (typeof msg === 'string' && msg.trim() !== '') {
			this.banner(msg);
		} else {
			this.banner(`Welcome to: ${this.name}!`);
		}

		this.getMove();
	}

	finish(msg = null) {
		if (typeof msg === 'string' && msg.trim() !== '') {
			this.finishedMsg = msg;
		}

		this.finished = true;
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