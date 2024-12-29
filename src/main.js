import Vector2 from "./lib/Vector2.js";
import RectangeEntity from "./RectangeEntity.js";

const FRAMERATE = 1 / 30;

/**
 * @type {HTMLCanvasElement}
*/
const gameCanvas = document.querySelector("#game-viewport");

/**
 * @type {CanvasRenderingContext2D}
*/
const canvasContext = gameCanvas.getContext("2d")

const rectangle = new RectangeEntity(
	new Vector2(200, 200), 
	new Vector2(200, 200)
);

function simulatePhysics() {

	rectangle.simulate(FRAMERATE);

}

function drawFrame() {

	canvasContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
	rectangle.render(canvasContext);

}

setInterval(
	() => {
		simulatePhysics();
		drawFrame();
	},
	FRAMERATE * 1000
)