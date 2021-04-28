//import init from './main'
import Scene from './scene'
import Player from './player'
import RandomSphere from './RandomSphere'

import {
  BoxGeometry,
  SphereGeometry,
  MeshLambertMaterial
} from 'three'

const scene = new Scene()
scene.setup()
scene.addObject('player', Player)


Array.from(Array(3)).map((i, idx) =>
  scene.addObject(`sphereRandom${idx}`, RandomSphere)
)



//init()
