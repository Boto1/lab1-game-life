import blessed from "blessed";
import _ from "lodash";

import Board from "./board.js";
import StringEngine from "./engine.js";

class Game {
	constructor(screen, blessedSettings, gameSettings) {
		this.screen = screen;

		this.width = gameSettings.width || screen.width;
		this.height = gameSettings.height || screen.height;
		this.numOfCells = gameSettings.numOfCells;

		this.engine = new StringEngine();
		this.board = new Board(this.width, this.height);

		_.range(_.random(1, this.width * this.height)).forEach(() => {
			const randomX = _.random(this.width - 1);
			const randomY = _.random(this.height - 1);

			this.board.setCell(randomX, randomY, true);
		});

		this.element = blessed.box({ ...blessedSettings, content: this.render() });
	}

	onTick = () => {
		this.tick();
		this.element.setContent(this.render());

		this.screen.render();
	};

	tick() {
		const newBoard = new Board(this.board.width, this.board.height);

		for (var y = 0; y < this.board.height; y++) {
			for (var x = 0; x < this.board.width; x++) {
				var liveNeighbors = this.board.getLiveNeighbors(x, y);

				if (this.board.isAlive(x, y)) {
					if (liveNeighbors === 2 || liveNeighbors === 3) {
						newBoard.setCell(x, y, true);
					}
				} else if (liveNeighbors === 3) {
					newBoard.setCell(x, y, true);
				}
			}
		}

		this.board = newBoard;
	}

	render() {
		return this.engine.render(this.board);
	}
}

export default Game;
