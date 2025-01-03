import { BindableEvent, BindableEventConnection } from "./BindableEvent.js";
import { CustomBindableEvent } from "./CustomBindableEvent.js";

const windowKeyDownEvent = new BindableEvent("keydown");
const windowKeyUpEvent = new BindableEvent("keyup");

/**
 * Singleton for managing and listen for user input
 * @constructor
 */
class UserInputObserver {

	constructor() {

		/**
		 * @type {Map<string, boolean>}
		 */
		this.keysPressed = new Map();

		/**
		 * @type {Map<string, CustomBindableEvent>}
		 * @private
		 */
		this.onPressedEvents = new Map();

		/**
		 * @type {Map<string, CustomBindableEvent>}
		 * @private
		 */
		this.onPressBeganEvents = new Map();

		/**
		 * @type {Map<string, CustomBindableEvent>}
		 * @private
		 */
		this.onPressEndedEvents = new Map();
		
		/**
		 * @type {Map<string, number>}
		 * @private
		 */
		this.keyPressTimes = new Map();

		/**
		 * @type {BindableEventConnection}
		 * @private
		 */
		this.keyDownEventConnection = windowKeyDownEvent.connect(
			/** @param {KeyboardEvent} input */
			input => {

				if (this.keysPressed.get(input.key) == true) {
					return;
				}

				const keyPressBeganEvent = this.onPressBeganEvents.get(input.key);

				if (keyPressBeganEvent != null) {
					keyPressBeganEvent.fire();
				}

				this.keysPressed.set(input.key, true);
				this.keyPressTimes.set(input.key, Date.now());
			}
		);

		/**
		 * @type {BindableEventConnection}
		 * @private
		 */
		this.keyUpEventConnnection = windowKeyUpEvent.connect(
			/** @param {KeyboardEvent} input */
			input => {

				const keyPressedEvent = this.onPressedEvents.get(input.key);
				const keyPressEndedEvent = this.onPressEndedEvents.get(input.key);

				if (keyPressedEvent != null) {

					keyPressedEvent.fire(
						Date.now() - this.keyPressTimes.get(input.key)
					);
				}
				
				if (keyPressEndedEvent != null) {

					keyPressEndedEvent.fire();
				}

				this.keyPressTimes.delete(input.key);
				this.keysPressed.set(input.key, false);
			}
		);

	}

	/**
	 * @param {string} key 
	 * @param {(duration: number) => void} callback
	 * @returns {BindableEventConnection}
	 */
	onKeyPressed(key, callback) {

		const event = new CustomBindableEvent(key + "_pressed");

		this.onPressedEvents.set(
			key,
			event
		);

		return event.connect(callback); // TODO: Figure out how to handle disconnects :)
	}

	/**
	 * @param {string} key 
	 * @param {() => void} callback
	 * @returns {BindableEventConnection}
	 */
	onKeyPressEnded(key, callback) {

		const event = new CustomBindableEvent(key + "_press_ended");

		this.onPressEndedEvents.set(
			key,
			event
		);

		return event.connect(callback); // TODO: Figure out how to handle disconnects :)
	}
	
	/**
	 * @param {string} key 
	 * @param {() => void} callback
	 * @returns {BindableEventConnection}
	 */
	onKeyPressBegan(key, callback) {

		const event = new CustomBindableEvent(key + "_press_began");

		this.onPressBeganEvents.set(
			key,
			event
		);

		return event.connect(callback); // TODO: Figure out how to handle disconnects :)
	}

}

export default (new UserInputObserver());