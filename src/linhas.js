import {
  // renderização
  Scene,
  WebGLRenderer,
  PerspectiveCamera,

  // objetos renderizados
  Vector3,
  Line,
  LineBasicMaterial,
  LineDashedMaterial,
  BufferGeometry,

  FontLoader,
  TextGeometry
} from 'three'

import helvetiker from 'three/examples/fonts/helvetiker_regular.typeface.json'

export const init = () => {

  // objeto renderização
  const renderer = new WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );

  // inclui o elemento renderizado no documento
  document.body.appendChild( renderer.domElement );

  // cria a camera
  const camera = new PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
  camera.position.set( 0, 0, 100 );
  camera.lookAt( 0, 0, 0 );

  // cria a cena
  const scene = new Scene();

  const material = new LineBasicMaterial( { color: 0x0000ff } );

  const points = []
  points.push( new Vector3(- 10, 0, 0) );
  points.push( new Vector3(0, 10, 0 ) );
  points.push( new Vector3(10, 0, 0 ) );

  const geometry = new BufferGeometry().setFromPoints( points );

  const line = new Line( geometry, material )

  scene.add(line)
  renderer.render(scene, camera)
}
