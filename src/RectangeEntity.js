

/**
 * A drawable RectangeEntity
 * @class
 * @constructor
 */
export default class RectangeEntity {

	/**
	 * @param {object} position 
	 * @param {object} size 
	 */
	constructor(position, size) {
		this.position = position;
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