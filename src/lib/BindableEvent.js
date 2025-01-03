
/**
 * @class
 */
export class BindableEventConnection {

	/**
	 * @param {BindableEvent} BindableEvent 
	 * @public
	 */
	constructor(event) {

		/**
		 * @type {BindableEvent} 
		 */
		this.event = event

	}

	/**
	 * @public
	 */
	disconnect() {

		this.event.disconnect(this);
		this.event = null
	}

}

/**
 * @class
 */
export class BindableEvent {

	/**
	 * 
	 * @param {string} eventType 
	 */
	constructor(eventType) {

		/**
		 * @type {Map<BindableEventConnection, callback>}
		 * @private
		 */
		this.connections = new Map();

		/**
		 * @type {string}
		 */
		this.eventType = eventType;
	}

	/**
	 * @private
	 */
	_fireEvent(...args) {

		for (const [connection, callback] of this.connections) {

			try {
				callback(...args);
			} catch {
				console.log(this, "failed to fire!")
			}

		}

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
		
		const callback = this.connections.get(connection);

		if (callback != null) {

			window.removeEventListener(
				this.eventType,
				callback
			)
		}

		this.connections.delete(connection);
	}

}