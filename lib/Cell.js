'use strict';

const TYPES = {
	WALL: 1,
	HALL: 2,
	DOOR: 3,
	ROOM: 4,
	START: 5
};

class Cell {
	constructor(x, y, value) {
		this.pos = {
			x: x,
			y: y
		};

		this.value = value;
		this.type = this.getType();
	}

	isA(type) {
		return this.type === type;
	}

	getType() {
		if (typeof this.value === 'string') {
			switch(this.value.toLowerCase()) {
				case '-':
				case '|':
				case '+':
				case '*':
					return TYPES.WALL;

				case 's':
					return TYPES.START;

				case ' ':
					return TYPES.HALL;

				case '[':
				case ']':
					// return TYPES.DOOR;

				default:
					return TYPES.HALL;
			}
		} else if (typeof this.value === 'function') {
			return TYPES.ROOM;
		}

		return TYPES.HALL;
	}

	static get TYPES() {
		return TYPES;
	}
}

module.exports = Cell;