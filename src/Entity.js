import Simulateable from "./lib/Simulateable.js";
import Vector2 from "./lib/Vector2.js";

/**
 * A drawable RectangeEntity
 * @class
 * @constructor
 */
export default class Entity {

	/**
	 * @param {Vector2} position 
	 * @param {Vector2} size 
	 * @param {Simulateable} physicsBehavior 
	 */
	constructor(position, velocity, physicsBehavior) {
		/**
		 * @type {Vector2}
		 * @field
		 * @private
		 */
		this.position = position;
		/**
		 * @type {Vector2}
		 * @field
		 * @private
		 */
		this.velocity = velocity;

		/**
		 * @type {Simulateable}
		 * @field
		 * @readonly
		 */
		this.physicsBehavior = physicsBehavior;
	}

	/**
	 * @returns {Vector2}
	 */
	getPosition() {
		return this.position;
	}

	/**
	 * @param {Vector2} position
	 */
	setPosition(position) {
		this.position = position;
	}

	/**
	 * @returns {Vector2}
	 */
	getVelocity() {
		return this.velocity;
	}

	/**
	 * @param {Vector2} velocity
	 */
	setVelocity(velocity) {
		this.velocity = velocity;
	}

	/**
	 * @param {CanvasRenderingContext2D} context 
	 */
	render(context) {
		context.fillStyle = "Red";
		context.fillRect(
			this.position.x - 10,
			this.position.y - 10,
			5,
			5
		);
	}

	/**
	 * 
	 * @param {number} deltaTime 
	 */
	simulate(deltaTime) {

		this.physicsBehavior.simulate(
			this, 
			deltaTime
		);

		this.setPosition(
			new Vector2(
				this.position.x + this.velocity.x * deltaTime,
				this.position.y + this.velocity.y * deltaTime
			)
		);
	}

}