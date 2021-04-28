import {
  DoubleSide,
  // objetos para renderização
  BoxGeometry,
  PlaneGeometry,
  SphereGeometry,
  MeshBasicMaterial,
  Mesh, // cria objeto de mesh

  AmbientLight,
  PointLight,

  AxesHelper,
  Vector3,

  // renderização
  Scene, // cria cena
  WebGLRenderer, // renderiza 
  PerspectiveCamera
} from 'three';

import {
  OrbitControls
} from 'three/examples/jsm/controls/orbitcontrols'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import {
  FirstControls
} from './controls'

import {
  getRandomInterval,
  getRandomCoords,
  addObjectsOnScene,
  randomPositionItems
} from './helpers'

import bonecoGLB from './basico/assets/boneco.glb'
import bauGLB from './basico/assets/bau.glb'

/* objetos globais para serem utilizados na função de animação [final arquivo] */
let camera, scene, renderer, controls;
let objects = {}

/**
 * init: função que inicializa a rendenrização
 */
function init() {

  /* configura o posicionamento da câmera */
  camera = new PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    0.01,
    1000
  );
  
  /* define posição da câmera */
  camera.position.set(6, 6, 6);
  camera.lookAt(0, 0, 0)

  /* cria uma nova cena */
  scene = new Scene();

  const loader = new GLTFLoader();

  objects.boxes = []
  loader.load(bauGLB, (gltf) => {
    objects.boxes = randomPositionItems(
      3, 0, 10, gltf.scene
    )
    addObjectsOnScene(scene, objects.boxes)
  })

  objects.player = {}
  loader.load(bonecoGLB, (gltf) => {
      objects.player.threejs = gltf.scene
      objects.player.threejs.scale.set(
        0.5, 0.5, 0.5
      )
      objects.player.v = new Vector3(0, 0, 0)
      scene.add(objects.player.threejs)
      objects.player.controls = 
        new FirstControls(objects.player.threejs)
    })

  objects.room = {}
  objects.room.threejs = new Mesh(
    new PlaneGeometry(20, 20),
    new MeshBasicMaterial({
      color: 0x555555, side: DoubleSide
    })
  )

  objects.room.threejs.rotation.x = Math.PI / 2

  scene.add(objects.room.threejs)

  const axesHelper = new AxesHelper( 5 )
  scene.add( axesHelper )

  const light = new AmbientLight(0xFF5500)
  scene.add(light)

  // luz pontual
  const lightP = new PointLight(
    0xFF5500, // cor da luz
    2 // intensidade
  )
  lightP.position.set(6, 6, 6)

  scene.add(lightP)


  /* define os parâmetros de renderização */
  /* cria o objeto de renderização */
  renderer = new WebGLRenderer( { antialias: true } );

  /* define o tamanho da renderização */
  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  );

  /* define a animação a ser renderizada [função abaixo] */
  renderer.setAnimationLoop( animation );

  // controles
  controls = new OrbitControls(
    camera,
    renderer.domElement
  );

/*
  controls = new FirstPersonControls(
    camera,
    renderer.domElement
  )
  */
  
  /* insere no elemento do documento */
  document.body.appendChild( renderer.domElement );
}

/**
 * animation: cria a função de animação, modifica os mesh e objetos da cena
 * time: ticks ou frames
 */
function animation( time ) {
  //if (objects.player.threejs) {
  //  objects.player.threejs.position.copy(
  //    (new Vector3(1, 1, 1)).multiply(objects.player.v)
  //  )
  //}
  //objects.plano.threejs.rotation.x = time / 2000;
  //objects.plano.threejs.rotation.z = time / 1000;


  /* atualiza a renderização */
  renderer.render( scene, camera );
}



export default init

