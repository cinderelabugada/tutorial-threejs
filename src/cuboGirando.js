import {
  // objetos para renderização
  BoxGeometry, // cria geometria caixa
  MeshNormalMaterial, // cria um novo tipo de material
  MeshBasicMaterial, // cria um novo tipo de material
  MeshLambertMaterial,
  LineBasicMaterial,

  Mesh, // cria objeto de mesh

  // lights
  PointLight,
  AmbientLight,
  DirectionalLight,

  // linhas
  Vector3,
  Line,
  BufferGeometry,

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
    45, // campo de visão
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

  /* Cria um material para esse objeto.
   * No caso específico do MeshNormalMaterial, cada porção do
   * mesh é coberta com uma textura que reflete a direção de sua
   * normal. Esse tipo de textura é importante para compreender
   * quais são as normais em diversos pontos do mesh, uma vez
   * que essa direção influência em outro processos como reflexão
   * dentre outras
   */
  //material = new MeshNormalMaterial();

  /* outro tipo de material */
  //material = new MeshBasicMaterial({ color: 0x404040 });

  material = new MeshLambertMaterial({ color: 0xFFFFFF })

  /* cria um malha com a geometria e o material */
  mesh = new Mesh(geometry, material);

  /* adiciona o mesh na cena */
  scene.add( mesh );

  // luz pontual
  const lightP = new PointLight(
    0xFF5500, // cor da luz
    1 // intensidade
  )
  // luz de ambiente
  const lightA = new AmbientLight(0xFF5500)

  // luz direcional
  const lightD = new DirectionalLight(0xFF5500)

  lightP.position.set(10, 0, 25)
  lightD.position.set(10, 0, 25)
  
  scene.add(lightP)
  //scene.add(lightA)
  //scene.add(lightD)


  const pointsX = [
    new Vector3(-0.3, 0, 0),
    new Vector3(10, 0, 0)
  ]

  const pointsY = [
    new Vector3(0, -0.3, 0),
    new Vector3(0, 10, 0)
  ]
  
  const pointsZ = [
    new Vector3(0, 0, -5),
    new Vector3(0, 0, 10)
  ]

  const materialLineZ = new LineBasicMaterial({ color: 0x0000FF })
  const materialLineY = new LineBasicMaterial({ color: 0x00FF00 })
  const materialLineX = new LineBasicMaterial({ color: 0xFF0000 })

  const gLineX = new BufferGeometry().setFromPoints(pointsX)
  const lineX = new Line(gLineX, materialLineX)
  scene.add(lineX)

  const gLineY = new BufferGeometry().setFromPoints(pointsY)
  const lineY = new Line(gLineY, materialLineY)
  scene.add(lineY)

  const gLineZ = new BufferGeometry().setFromPoints(pointsZ)
  const lineZ = new Line(gLineZ, materialLineZ)
  scene.add(lineZ)

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
 * importe essa função criandoUmaCena no seu arquivo principal
 * e a chame para realizar a renderização desse exemplo.
 */
export default init

