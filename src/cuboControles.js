import {
  // objetos para renderização
  BoxGeometry, // cria geometria caixa
  MeshLambertMaterial,
  LineBasicMaterial,

  // cores
  Color,

  Mesh, // cria objeto de mesh

  // lights
  PointLight,

  // linhas
  Vector3,
  Line,
  BufferGeometry,

  // grid
  AxesHelper,

  // renderização
  Scene, // cria cena
  WebGLRenderer, // renderiza 
  PerspectiveCamera
} from 'three';

// controles
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import bonecoGLB from './assets/boneco.glb'

import bauGLB from './assets/bau.glb'

/* objetos globais para serem utilizados na função de animação [final arquivo] */
let camera, scene, renderer, controls;
let geometry, material, mesh;

/*
 * Cria um objeto com os modelos, para incluir outras
 * informações como gltf e animações
 */
const models = {
  'boneco': {
    glb: bonecoGLB,
    scale: [0.5, 0.5, 0.5],
    position: [3, 0, 0]
  },
  'bau': { glb: bauGLB },
}



/**
 * init: função que inicializa a rendenrização
 */
function init() {

  /* configura o posicionamento da câmera */
  camera = new PerspectiveCamera(
    45, // campo de visão
    window.innerWidth / window.innerHeight, // razão de aspecto
    0.01, // cliping de elementos próximos
    100 // cliping de elementos distantes
  );
  
  /* define posição da câmera */
  camera.position.set(7, 5, 7);

  /* cria uma nova cena */
  scene = new Scene();

  const loader = new GLTFLoader();
  Object.values(models).forEach((model, ndx) => {
    loader.load(model.glb, (gltf) => {
      if (model.scale) {
        gltf.scene.scale.set(...model.scale)
      }
      if (model.position) {
        gltf.scene.position.set(...model.position)
      }
      model.gltf = gltf
      scene.add(gltf.scene)
    })
  })
  // luz pontual
  const lightP = new PointLight(
    0xFF5500, // cor da luz
    2 // intensidade
  )
  lightP.position.set(6, 6, 6)

  scene.add(lightP)

  const axesHelper = new AxesHelper( 5 )
  scene.add( axesHelper )

  /* define os parâmetros de renderização */
  /* cria o objeto de renderização */
  renderer = new WebGLRenderer( { antialias: true } );

  /* define o tamanho da renderização */
  renderer.setSize( window.innerWidth, window.innerHeight );

  /* define a animação a ser renderizada [função abaixo] */
  renderer.setAnimationLoop( animation );

  /* insere no elemento do documento */
  const el = document.querySelector('#root')
  el.appendChild( renderer.domElement );

  // controles
  controls = new OrbitControls(
    camera,
    renderer.domElement
  );

  controls.update()
  setupKeyControls()
}

/**
 * animation: cria a função de animação, modifica os mesh e objetos da cena
 * time: ticks ou frames
 */
function animation( time ) {
  /* modificação do mesh com o peração de rotação */
  //mesh.rotation.x = time / 2000;
  //mesh.rotation.y = time / 1000;

  /* rotaciona a camera */
  // camera.rotation.y += 0.01 

  /* atualiza a renderização */
  renderer.render( scene, camera );
}

function setupKeyControls() {
	document.onkeydown = function(e) {
		switch (e.keyCode) {
			case 37:
			models['boneco'].gltf.scene.rotation.x += 0.1;
			break;
			case 38:
			models['boneco'].gltf.scene.rotation.z -= 0.1;
			break;
			case 39:
			models['boneco'].gltf.scene.rotation.z -= 0.1;
			break;
			case 40:
			models['boneco'].gltf.scene.rotation.z += 0.1;
			break;
      case 87:
			models['boneco'].gltf.scene.position.z += 0.1;
			break;
			case 83:
			models['boneco'].gltf.scene.position.z -= 0.1;
			break;
			case 65:
			models['boneco'].gltf.scene.position.x -= 0.1;
			break;
			case 68:
			models['boneco'].gltf.scene.position.x += 0.1;
			break;

		}
	};
}


/**
 * importe essa função criandoUmaCena no seu arquivo principal
 * e a chame para realizar a renderização desse exemplo.
 */
export default init

