import { BindableEventConnection } from "./BindableEvent.js";

/**
 * @class
 */
export class CustomBindableEvent {

	/**
	 * 
	 * @param {string} eventName
	 */
	constructor(eventName) {

		/**
		 * @type {Map<BindableEventConnection, callback>}
		 * @private
		 */
		this.connections = new Map();

		/**
		 * @type {string}
		 */
		this.eventName = eventName;
	}

	/**
	 * @param {(...) => void} callback 
	 * @public
	 */
	connect(callback) {
		
		const eventConnection = new BindableEventConnection(this);
		window.addEventListener(this.eventType, callback);
		this.connections.set(eventConnection, callback);

		return eventConnection;
	}

	/**
	 * 
	 * @param {BindableEventConnection} connection 
	 * @public
	 */
	disconnect(connection) {
		
		this.connections.delete(connection);
	}

	/**
	 * @public
	 * @param {...*} args 
	 */
	fire(...args) {
		for (const [_, callback] of this.connections) {

			try {
				callback(...args);
			} catch {
				console.log(this, "failed to fire!")
			}

		}
	}

}