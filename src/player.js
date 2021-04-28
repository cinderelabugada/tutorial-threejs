import {
  Mesh,
  SphereGeometry,
  MeshLambertMaterial,
  Vector3,
  BoxHelper
} from 'three'

import C from 'cannon'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import {
  FirstControls
} from './controls'

import bonecoGLB from './assets/bonecoGoku1.glb'

const loader = new GLTFLoader();

export default class Player {
  constructor (scene, world) {
    this.scene = scene
    this.world = world
    this.R = 1
    this.setup()
  }

  setup () {
    this.object = {}
    loader.load(bonecoGLB, (gltf) => {
        this.object = gltf.scene
        this.object.scale.set(0.5, 0.5, 0.5)
        this.object.position.set(0, 0, 0)
        this.scene.add(this.object)

        this.box = new BoxHelper(this.object)

        this.box.geometry.computeBoundingBox()
        this.box.geometry.computeBoundingSphere()

        this.size = this.box.geometry
          .boundingBox.getSize(new Vector3())

        const box = new C.Box(
          new C.Vec3().copy(this.size).scale(0.5)
        )

        this.mass = 20
        this.body = new C.Body({
            mass: this.mass,
            position: new C.Vec3(0, 0, 0)
        })

        const { center } = this.box.geometry.boundingSphere

        this.body
          .addShape(box,
            new C.Vec3(center.x, center.y, center.z)
          )

        this.world.addBody(this.body)

        this.controls = 
          new FirstControls(this.object)
    });
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

