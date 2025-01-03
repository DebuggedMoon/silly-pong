import { CustomBindableEvent } from "./lib/CustomBindableEvent.js";
import { PongGame } from "./PongGame.js";

const FRAMERATE = 24;

/**
 * @type {HTMLCanvasElement}
*/
const gameCanvas = document.querySelector("#game-viewport");
const pongGame = new PongGame(gameCanvas, FRAMERATE);

const testEvent = new CustomBindableEvent("custom_test");
const testConnection = testEvent.connect((...args) => console.log(...args));

setInterval(
	() => testEvent.fire("HAHHAHA", 123, false),
	1000
)

setTimeout(
	() => testConnection.disconnect(),
	6000
)


pongGame.initialize();