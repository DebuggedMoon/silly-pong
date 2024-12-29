import { PongGame } from "./PongGame.js";

const FRAMERATE = 24;

/**
 * @type {HTMLCanvasElement}
*/
const gameCanvas = document.querySelector("#game-viewport");
const pongGame = new PongGame(gameCanvas, FRAMERATE);

pongGame.initialize();