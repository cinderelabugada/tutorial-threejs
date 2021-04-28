import {
  Mesh,
  SphereGeometry,
  MeshLambertMaterial,
  Vector3,
  BoxHelper
} from 'three'

import MeshObject from './MeshObject'

import C from 'cannon'

import {
  getRandomCoords
} from './helpers'

export default class RandomSphere extends MeshObject {
  constructor (scene, world, geometry, material) {
    super(scene, world)
  }

  setup () {
    this.object = {}

    this.geometry =
      new SphereGeometry(0.5, 8, 8)

    this.material =
      new MeshLambertMaterial(0xF5761A)

    this.object = new Mesh(this.geometry, this.material)
    this.object.position.set(...getRandomCoords(1, 5))

    this.geometry.computeBoundingBox()
    this.geometry.computeBoundingSphere()

    this.size = this.geometry
      .boundingBox.getSize(new Vector3())
  
    const box = new C.Box(new C.Vec3().copy(this.size).scale(0.5))

    this.mass = 300
    this.body = new C.Body({
      mass: this.mass,
      position: new C.Vec3(0, 3, 0)
    })

    const { center } = this.geometry.boundingSphere

    this.body
      .addShape(box,
        new C.Vec3(center.x, center.y, center.z)
      )

    this.world.addBody(this.body)

    this.scene.add(this.object)
  }
}
