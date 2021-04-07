import {
  AmbientLight,
  PointLight,

  // objetos para renderização
  BoxGeometry, // cria geometria caixa
  MeshNormalMaterial, // cria um novo tipo de material
  Mesh, // cria objeto de mesh

  // renderização
  Scene, // cria cena
  WebGLRenderer, // renderiza 
  PerspectiveCamera
} from 'three';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import bonecoGLB from './assets/boneco.glb'

import eixos from './eixos'

/* objetos globais para serem utilizados na função de animação [final arquivo] */
let camera, scene, renderer;
let geometry, material, mesh;

/**
 * init: função que inicializa a rendenrização
 */
export const init = () => {
  
  /* inicializa a camera */
  camera = new PerspectiveCamera(
    120, // campo de visão
    window.innerWidth / window.innerHeight,
    0.1,
    10000
  );
  camera.position.set(-6, 6, 0);

  /* cria uma nova cena */
  scene = new Scene();

  const loader = new GLTFLoader();
  loader.load(
    bonecoGLB,
    function (gltf) {
      scene.add( gltf.scene )
    },
    undefined,
    error => console.log(error)
  );

  const light = new AmbientLight( 0x404040 )
  const light2 = new PointLight( 0xFFFF00 )

  light2.position.set(10, 5, 0)

  scene.add(light)
  scene.add(light2)

  const eixosG = eixos()

  scene.add(eixosG.x)
  scene.add(eixosG.y)
  scene.add(eixosG.z)

  /* define os parâmetros de renderização */
  /* cria o objeto de renderização */
  renderer = new WebGLRenderer( { antialias: true } );

  /* define o tamanho da renderização */
  renderer.setSize( window.innerWidth, window.innerHeight );


  //renderer.render(scene, camera)

  /* define a animação a ser renderizada [função abaixo] */
  renderer.setAnimationLoop( animation );

  /* insere no elemento do documento */
  document.body.appendChild( renderer.domElement );
}

/**
 * animation: cria a função de animação, modifica os mesh e objetos da cena
 * time: ticks ou frames
 */
function animation( time ) {

  /* rotaciona a camera */
  //camera.rotation.z += 0.01
  //console.log(camera.rotation.y)

  /* atualiza a renderização */
  renderer.render( scene, camera );
}



