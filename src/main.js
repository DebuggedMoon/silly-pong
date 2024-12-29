import Vector2 from "./lib/Vector2.js";
import RectangeEntity from "./RectangeEntity.js";

/**
 * @type {HTMLCanvasElement}
*/
const gameCanvas = document.querySelector("#game-viewport");

/**
 * @type {CanvasRenderingContext2D}
*/
const canvasContext = gameCanvas.getContext("2d")

const rectangle = new RectangeEntity(new Vector2(200, 200), new Vector2(200, 200));

function drawFrame() {

	rectangle.render(canvasContext);

}

drawFrame();