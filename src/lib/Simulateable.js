import Entity from "../Entity.j";

/**
 * @interface
 */
export default class Simulateable {

	/**
	 * @override
	 * @param {Entity} entity 
	 * @param {number} deltaTime 
	 */
	simulate(entity, deltaTime) {}

}