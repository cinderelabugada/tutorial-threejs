export default class MeshObject {
  constructor (scene, world) {
    this.scene = scene
    this.world = world
    this.R = 1
    this.setup()
  }

  setup () {
  }

  update () {
    const t = this.world.time
    if (this.object && this.object.position) {
      this.object.position.set(
        0, t * this.R, 0
     )
    }
  }

}
