'use strict';

const Cell = require('./Cell');

class User {
	constructor(name = 'user') {
		this.name = name;
	}

	canMoveTo(cell) {
		switch(this.type) {
			case Cell.TYPES.WALL;
			case Cell.TYPES.DOOR;
				return false;

			case Cell.TYPES.HALL:
				return true;

			case Cell.TYPES.EXEC;
				return !!this.value();
		}
	}
}