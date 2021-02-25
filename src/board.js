import _ from "lodash";

function create2dArray(width = 0, height = 0) {
	return _.range(width).map(() => new Array(height));
}

class Board {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.cells = create2dArray(width, height);
	}

	getCell(x, y) {
		return this.cells[x][y];
	}

	setCell(x, y, value) {
		this.cells[x][y] = value;
	}

	toggleCell(x, y) {
		this.cells[x][y] = !this.isAlive(x, y);
	}

	isInBounds(x, y) {
		return 0 <= x && x < this.width && 0 <= y && y < this.height;
	}

	isAlive(x, y) {
		return this.getCell(x, y) === true;
	}

	isDead(x, y) {
		return this.getCell(x, y) !== true;
	}

	getLiveNeighbors(x, y) {
		let count = this.isAlive(x, y) ? -1 : 0;

		_.range(3).forEach(i => {
			_.range(3).forEach(j => {
				if (
					this.isInBounds(x + j - 1, y + i - 1) &&
					this.isAlive(x + j - 1, y + i - 1)
				) {
					count++;
				}
			});
		});

		return count;
	}
}

export default Board;
