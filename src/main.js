import { BindableEvent } from "./lib/BindableEvent.js";
import { PongGame } from "./PongGame.js";

const FRAMERATE = 24;

/**
 * @type {HTMLCanvasElement}
*/
const gameCanvas = document.querySelector("#game-viewport");
const pongGame = new PongGame(gameCanvas, FRAMERATE);

const keydownEvent = new BindableEvent("keydown");
const connection = keydownEvent.connect(
	/**
	 * 
	 * @param {KeyboardEvent} input 
	 */
	input => {
		console.log(input.key)
	}
)

setTimeout(
	() => {
		connection.disconnect()
		console.log("DICONNECTED")
	},
	5000
)

pongGame.initialize();