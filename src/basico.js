import {
  // objetos para renderização
  BoxGeometry, // cria geometria caixa
  MeshNormalMaterial, // cria um novo tipo de material
  Mesh, // cria objeto de mesh

  // renderização
  Scene, // cria cena
  WebGLRenderer, // renderiza 
  PerspectiveCamera
} from 'three';


/* objetos globais para serem utilizados na função de animação [final arquivo] */
let camera, scene, renderer;
let geometry, material, mesh;

/**
 * init: função que inicializa a rendenrização
 */
function init() {

  /* configura o posicionamento da câmera */
  camera = new PerspectiveCamera(
    70, // campo de visão
    window.innerWidth / window.innerHeight, // razão de aspecto
    0.01, // cliping de elementos próximos
    10 // cliping de elementos distantes
  );
  
  /* define posição da câmera */
  camera.position.z = 1;

  /* cria uma nova cena */
  scene = new Scene();

  /* cria um objeto 3D */
  geometry = new BoxGeometry( 0.2, 0.2, 0.2 );
  /* cria um material para esse objeto */
  material = new MeshNormalMaterial(  );

  /* outro tipo de material */
  // material = new MeshBasicMaterial({ color: 0x00ff00 });

  /* cria um malha com a geometria e o material */
  mesh = new Mesh( geometry, material );

  /* adiciona o mesh na cena */
  scene.add( mesh );

  /* define os parâmetros de renderização */
  /* cria o objeto de renderização */
  renderer = new WebGLRenderer( { antialias: true } );

  /* define o tamanho da renderização */
  renderer.setSize( window.innerWidth, window.innerHeight );

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

  /* mesh é uma variavel global */
  /* modificação do mesh com o peração de rotação */
  mesh.rotation.x = time / 2000;
  mesh.rotation.y = time / 1000;

  /* rotaciona a camera */
  // camera.rotation.y += 0.01 

  /* atualiza a renderização */
  renderer.render( scene, camera );
}


/**
 * importe esse init no seu arquivo principal e chame a função init para
 * iniciar a renderização
 */
export default init
