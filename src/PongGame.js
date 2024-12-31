import RectangeEntity from "./RectangeEntity.js";
import Vector2 from "./lib/Vector2.js";

const GameState = {
	Initializing: Symbol("initializing"),
	StartMenu: Symbol("start-menu"),
	Playing: Symbol("playing"),
	GameOver: Symbol("game-over")
}

export class PongGame {

	/**
	 * 
	 * @param {HTMLCanvasElement} canvas 
	 * @param {number} framerate 
	 */
	constructor(canvas, framerate) {

		/**
		 * @type {GameState}
		 * @private
		 */
		this.state = GameState.Initializing

		/**
		 * @type {CanvasRenderingContext2D}
		 * @private
		 */
		this.canvasContext = canvas.getContext("2d");

		/**
		 * @type {HTMLCanvasElement}
		 * @private
		 */
		this.canvasElement = canvas;

		/**
		 * Target milliseconds per Frame
		 * @type {number}
		 * @readonly
		 */
		this.frameLength = 1000 / framerate

		/**
		 * @type {RectangeEntity}
		 * @private
		 */
		this.playerEntity = new RectangeEntity(
			new Vector2(200, 200), 
			new Vector2(200, 200)
		)

		/**
		 * @type {RectangeEntity[]}
		 * @private
		 */
		this.rectangeEntities = [
			this.playerEntity,
			new RectangeEntity(
				new Vector2(900, 0),
				new Vector2(100, 20)
			)
		];

	}

	/**
	 * @returns {GameState}
	 */
	getGameState() {
		return this.state;
	}

	/**
	 * Checks whetere a rectangle entity is colliding with the viewport and handles it
	 * @private
	 */
	_doViewportCollisions() {

		for (const entity of this.rectangeEntities) {

			const entityPosition = entity.getPosition();
			const entitySize = entity.getSize();

			const newPosition = {
				x: entityPosition.x,
				y: entityPosition.y
			}

			if (entityPosition.y + entitySize.y >= this.canvasElement.height) {

				newPosition.y = this.canvasElement.height - entitySize.y;

			} else if (entityPosition.y <= 0) {

				newPosition.y = 0;
				
			}

			if (entityPosition.x + entitySize.x >= this.canvasElement.width) {

				newPosition.x = this.canvasElement.width - entitySize.x;
				
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

	}

	initialize() {

		this.startGame();

	}

	/**
	 * @param {number} deltaTime 
	 * @private
	 */
	_doSimulations(deltaTime) {

		for (const entity of this.rectangeEntities) {

			entity.simulate(deltaTime / 1000);
	
		}
		
	}

	/**
	 * @private
	 */
	_drawEntities() {

		for (const entity of this.rectangeEntities) {

			entity.render(this.canvasContext);	
	
		}

	}

	startGame() {

		if (this.state == GameState.Playing) {
			return;
		}

		/** @type {number} */
		let lastFrameTime = this.frameLength;
		this.state = GameState.Playing

		console.log("Starting Game Loop");

		(async () => {

			console.log("Tick")
			while (this.state == GameState.Playing) {

				const frameStart = Date.now();
	
				this._doSimulations(lastFrameTime);
				this._doViewportCollisions();

				this.canvasContext.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
				this._drawEntities();
	
				lastFrameTime = Math.max(
					this.frameLength,
					frameStart - Date.now()
				)

				await new Promise(resolve => setTimeout(resolve, this.frameLength - ( lastFrameTime % this.frameLength )));
			}

		})()

	}

}