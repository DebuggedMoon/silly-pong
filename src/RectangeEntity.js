import Entity from "./Entity.js";
import Vector2 from "./lib/Vector2.js";
import AffectedByGravity from "./PhysicsBehavior/AffectedByGravity.js";


/**
 * A drawable RectangeEntity
 * @class
 * @constructor
 */
export default class RectangeEntity extends Entity{

	/**
	 * @param {Vector2} position 
	 * @param {Vector2} size 
	 */
	constructor(position, size) {

		super(
			position, 
			new Vector2(0, 0), 
			new AffectedByGravity(
				new Vector2(250, 1000),
				100
			)
		)

		/**
		 * @type {Vector2}
		 * @field
		 * 
		 */
		this.size = size;
	}

	/**
	 * @returns {Vector2}
	 */
	getSize() {
		return this.size;
	}

	/**
	 * @param {Vector2} position
	 */
	setSize(size) {
		this.size = size;
	}
	/**
	 * @param {CanvasRenderingContext2D} context 
	 * @override
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