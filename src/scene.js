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

  Fog,
  Clock,

  // renderização
  Scene, // cria cena
  WebGLRenderer, // renderiza 
  PerspectiveCamera
} from 'three';

import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls'

import C from 'cannon'

export default class AnimationScene {
  setup () {
    this.scene = new Scene();

    // Init Physics world
    this.world = new C.World()
    this.world.gravity.set(0, -50, 0)

    this.scene.fog = new Fog(0x202533, -1, 100);
    this.clock = new Clock();
    this.objects = {}

    this.setCamera()
    this.setLights()
    this.setRender()

    this.scene.add(new AxesHelper(5))

    this.controls = new OrbitControls(
      this.camera,
      this.renderer.domElement
    )

    this.renderer.setAnimationLoop(() => { this.draw() })
  }

  setRender () {
    this.renderer = new WebGLRenderer( { antialias: true } )

    /* define o tamanho da renderização */
    this.renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );
  
    document.body.appendChild( this.renderer.domElement );
  }

  /*
   * Adiciona camera
   */
  setCamera () {
    /* configura o posicionamento da câmera */
    this.camera = new PerspectiveCamera(
      90,
      window.innerWidth / window.innerHeight,
      0.01,
      1000
    );
    
    /* define posição da câmera */
    this.camera.position.set(6, 6, 6);
    this.camera.lookAt(0, 0, 0);
  }

  /*
   * Adiciona luzes
   */
  setLights () {
    this.light = {}

    this.light.ambient = new AmbientLight(0xFF5500)
    this.scene.add(this.light.ambient)

    this.light.point = new PointLight(
      0xFF5500, // cor da luz
      2 // intensidade
    )

    this.light.point.position.set(6, 6, 6)
    this.scene.add(this.light.point)
  }

  /*
   * Adiciona os objetos
   */
  addObject (name, Object) {
    this.objects[name] = new Object(this.scene, this.world);
  }

  draw () {
    this.updatePhysics();
    this.renderer.render(this.scene, this.camera);
  }

  updatePhysics () {
    //this.objects['player'].update()
    // As simple as that!
    this.world.step(1 / 60);
  }
}
