import _ from "lodash";

class StringEngine {
	constructor() {
		this.emptyCell = " ";
		this.liveCell = "1";
	}

	render(board) {
		let str = "";

		_.range(board.height).forEach(y => {
			_.range(board.width).forEach(x => {
				str += board.isAlive(x, y) ? this.liveCell : this.emptyCell;
			});

			str += "\n";
		});

		return str;
	}
}

export default StringEngine;
