import Vector2 from "../lib/Vector2.js";
import Entity from "../Entity.js";
import Simulateable from "../lib/Simulateable.js";

/**
 * @class
 * @constructor
 */
export default class AffectedByGravity extends Simulateable {

	/**
	 * 
	 * @param {Vector2} gravity 
	 * @param {number} mass 
	 */
	constructor(gravity, mass) {
		super();

		/** @type {Vector2} */
		this.gravity = gravity;
		/** @type {number} */
		this.mass = mass;
	}

	/**
	 * @param {Entity} entity
	 * @param {number} deltaTime 
	 */
	simulate(entity, deltaTime) {
		
		// TODO: Implement mass being taken into account

		const entityVelocity = entity.getVelocity();

		let xVelocity = entityVelocity.x;
		let yVelocity = entityVelocity.y;

		if (xVelocity < this.gravity.x) {
			xVelocity = Math.min(
				entityVelocity.x + this.gravity.x * deltaTime,
				this.gravity.x
			);
		}

		if (yVelocity < this.gravity.y) {
			yVelocity = Math.min(
				entityVelocity.y + this.gravity.y * deltaTime,
				this.gravity.y
			);
		}

		entity.setVelocity(
			new Vector2(
				xVelocity,
				yVelocity
			)
		);
	}

}