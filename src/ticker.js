class Ticker {
	constructor(interval, onTick) {
		this.running = false;
		this.intervalId = null;
		this.onTick = onTick;
		this.interval = interval;
	}

	start() {
		if (this.running) {
			return;
		}

		this.running = true;
		this.intervalId = setInterval(this.onTick, this.interval);
	}

	stop() {
		if (!this.running) {
			return;
		}

		clearInterval(this.intervalId);
		this.running = false;
		this.intervalId = null;
	}
}

export default Ticker;
