import blessed from "blessed";

import Game from "./src/app.js";
import Ticker from "./src/ticker.js";

const blessedConfig = {
	top: 0,
	left: 0,
	width: "100%",
	height: "100%",
	tags: true,
	border: {
		type: "line",
	},
	style: {
		border: {
			fg: "#f0f0f0",
		},
	},
};

const gameConfig = {
	speed: 200,
};

function init() {
	const screen = blessed.screen();

	const game = new Game(screen, blessedConfig, gameConfig);

	screen.title = "Game of Life";

	screen.key(["escape", "q", "C-c"], function () {
		return process.exit(0);
	});

	screen.append(game.element);

	const ticker = new Ticker(gameConfig.speed, game.onTick);
	ticker.start();

	screen.render();
}

init();
