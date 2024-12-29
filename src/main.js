import Vector2 from "./lib/Vector2.js";
import RectangeEntity from "./RectangeEntity.js";

const FRAMERATE = 1 / 30;
const VIEWPORT_SIZE = new Vector2(
	1920,
	1080
)

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

const entities = [rectangle];

console.log(rectangle, entities)

function simulatePhysics() {

	rectangle.simulate(FRAMERATE);

}

function drawFrame() {

	canvasContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
	rectangle.render(canvasContext);

}

/**
 * 
 * @param {RectangeEntity} entity 
 */
function doBoundingBoxCollisionCheck(entity) {

	// console.log(entity, entity.getPosition)

	const entityPosition = entity.getPosition();
	const entitySize = entity.getSize();

	const newPosition = {
		x: entityPosition.x,
		y: entityPosition.y
	}

	if (entityPosition.y + entitySize.y >= VIEWPORT_SIZE.y) {

		newPosition.y = VIEWPORT_SIZE.y - entitySize.y;

	} else if (entityPosition.y <= 0) {

		newPosition.y = 0;
		
	}

	if (entityPosition.x + entitySize.x >= VIEWPORT_SIZE.x) {

		newPosition.x = VIEWPORT_SIZE.x - entitySize.x;
		
	} else if (entityPosition.x <= 0) {

		newPosition.x = 0;

	}

	entity.setPosition(
		new Vector2(
			newPosition.x,
			newPosition.y
		)
	);

}

setInterval(
	() => {
		simulatePhysics();

		for (const entity of entities) {
			doBoundingBoxCollisionCheck(entity)
		}

		drawFrame();
	},
	FRAMERATE * 1000
);