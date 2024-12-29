import RectangeEntity from "./RectangeEntity.js";

/**
 * @type {HTMLCanvasElement}
*/
const gameCanvas = document.querySelector("#game-viewport");

/**
 * @type {CanvasRenderingContext2D}
*/
const canvasContext = gameCanvas.getContext("2d")

const rectangle = new RectangeEntity({x: 200, y: 200}, {x: 200, y: 200});

function drawFrame() {

	rectangle.render(canvasContext);

}

drawFrame();