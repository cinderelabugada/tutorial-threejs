class FirstControls {
	constructor(mesh) {
		this.object = mesh

		this.init()
	}

	onKeyDown(e) {
		switch (e.keyCode) {
			// left
			case 37:
				this.object.rotation.y -= 0.1
				break

			// up
			case 38:
				this.object.position.x += Math.sin(this.object.rotation.y)
				this.object.position.z += Math.cos(this.object.rotation.y)
				break

			// right
			case 39:
				this.object.rotation.y += 0.1
				break

			// down
			case 40:
				this.object.position.x -= Math.sin(this.object.rotation.y)
				this.object.position.z -= Math.cos(this.object.rotation.y)
				break
		}
	}

	init() {
		const _onKeyDown = bind( this, this.onKeyDown )
		window.addEventListener('keydown', _onKeyDown)
	}
}

function bind( scope, fn ) {
	return function () {

		fn.apply( scope, arguments );

	};
}

export { FirstControls }
