import UserInputObserver from "./lib/UserInputObserver.js";
import { PongGame } from "./PongGame.js";

const FRAMERATE = 24;

/**
 * @type {HTMLCanvasElement}
*/
const gameCanvas = document.querySelector("#game-viewport");
const pongGame = new PongGame(gameCanvas, FRAMERATE);

const connection = UserInputObserver.onKeyPressed(
	"w",
	duration => console.log("Duration:", duration)
);


pongGame.initialize();