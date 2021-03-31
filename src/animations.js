import {
  // cores
  Color,

  // lights
  PointLight,

  /* classe base de todos os objetos 3d, util para
   * agrupamentos */
  Object3D,

  // grid
  AxesHelper,

  // indica progresso para carregar objetos
  LoadingManager,

  AnimationMixer,

  // renderização
  Scene, // cria cena
  WebGLRenderer, // renderiza 
  PerspectiveCamera

} from 'three'

// controles
import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls'

import {
  SkeletonUtils
} from 'three/examples/jsm/utils/SkeletonUtils'

// importa GLTFLoader
import {
  GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader.js'

// importa modelos 
import bonecoGLB from './assets/boneco.glb'
import bauGLB from './assets/bau.glb'

/*
 * Cria um objeto com os modelos, para incluir outras
 * informações como gltf e animações
 */
const models = {
  //'boneco': { glb: bonecoGLB, scale: [0.5, 0.5, 0.5] },
  'bau': { glb: bauGLB },
}

/* objetos globais para serem utilizados na função
 * de animação [final arquivo]
 */
const mixers = []

  /* configura o posicionamento da câmera */
const camera = new PerspectiveCamera(
  45, // campo de visão
  window.innerWidth / window.innerHeight, // razão de aspecto
  0.01, // cliping de elementos próximos
  100 // cliping de elementos distantes
);

const scene = new Scene()
 
/* define os parâmetros de renderização */
/* cria o objeto de renderização */
const renderer = new WebGLRenderer({
  antialias: true
})

/* define o tamanho da renderização */
renderer.setSize(
  window.innerWidth,
  window.innerHeight
);

const manager = new LoadingManager()
manager.onLoad = init;

const progressbarElem = document.querySelector(
  '#progressbar'
)
manager.onProgress = (url, itemsLoaded, itemsTotal) => {
  progressbarElem.style.width =
    `${itemsLoaded / itemsTotal * 100 | 0}%`;
}
{
  // carrega o gltf dos modelos
  const gltfLoader = new GLTFLoader(manager)
  for (const model of Object.values(models)) {
    gltfLoader.load(model.glb, (gltf) => {
      if (model.scale) {
        gltf.scene.scale.set(...model.scale)
      }
      model.gltf = gltf;
    });
  }
}

/**
 * prepara as animacoes, as incluindo nos objetos dos
 * modelos
 */
function preparaAnimatimacoes() {
  Object.values(models).forEach(model => {
    const animsByName = {}
    model.gltf.animations.forEach((clip) => {
      animsByName[clip.name] = clip
    })
    model.animations = animsByName
  })
}

function init() {
  // hide the loading bar
  const loadingElem = document.querySelector('#loading')
  loadingElem.style.display = 'none'

  preparaAnimatimacoes()

  // ativar as animações
  Object.values(models).forEach((model, ndx) => {
    // cria uma cópia de todos meshs dos modelos
    const clonedScene = SkeletonUtils.clone(
      model.gltf.scene
    )

    /* cria um objeto para agrupar todos od meshes na
     * cena
     */
    const root = new Object3D()

    // adiciona todas as cópias no grupo
    root.add(clonedScene)
  
    // adiciona grupo na cena
    scene.add(root)

    // reposiciona cada elemento na cena
    root.position.x = (ndx - 3) * 3;

    const mixer = new AnimationMixer(clonedScene)
    const firstClip = Object.values(model.animations)[0]
    const action = mixer.clipAction(firstClip)

    action.play()
    mixer.push(mixer)
  })

  /* define a animação a ser renderizada [função abaixo] */
  renderer.setAnimationLoop( render );
}

let then = 0;
function render(now) {
  now *= 0.001;  // convert to seconds
  const deltaTime = now - then;
  then = now;
 
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
 
  for (const mixer of mixers) {
    mixer.update(deltaTime);
  }
 
  renderer.render(scene, camera);
 
  //requestAnimationFrame(render);
}
