import Vector2 from "./lib/Vector2.js";


/**
 * A drawable RectangeEntity
 * @class
 * @constructor
 */
export default class RectangeEntity {

	/**
	 * @param {Vector2} position 
	 * @param {Vector2} size 
	 */
	constructor(position, size) {
		/**
		 * @type {Vector2}
		 * @field
		 * 
		 */
		this.position = position;
		/**
		 * @type {Vector2}
		 * @field
		 * 
		 */
		this.size = size;
	}

	/**
	 * @param {CanvasRenderingContext2D} context 
	 */
	render(context) {
		context.fillStyle = "Blue";
		context.fillRect(
			this.position.x,
			this.position.y,
			this.size.x,
			this.size.y
		);
	}

}