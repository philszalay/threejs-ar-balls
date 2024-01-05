import './style.css'
import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { ARButton } from 'three/examples/jsm/webxr/ARButton'

export default class ThreeJsDraft {
  constructor() {
    /**
     * Variables
     */
    this.canvas = document.querySelector('canvas.webgl')
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.devicePixelRatio = window.devicePixelRatio

    
    /**
     * Scene
    */
   this.scene = new THREE.Scene()
   
   /**
    * Camera
   */
  this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000)
  this.camera.position.z = 5
  
  /**
   * Renderer
  */
 this.renderer = new THREE.WebGLRenderer({
   canvas: this.canvas,
   alpha: true
  })
  this.renderer.setSize(this.width, this.height)
  this.renderer.setPixelRatio(Math.min(this.devicePixelRatio, 2))
  this.renderer.xr.enabled = true;
  document.body.appendChild(ARButton.createButton(this.renderer, { requiredFeatures: ["hit-test"] },));

  this.controller = this.renderer.xr.getController(0)
  this.controller.addEventListener("select", () => this.shootBall());

  this.scene.add(this.controller)


  this.renderer.setAnimationLoop(this.animate.bind(this));
  
  /**
   * Resize
  */
 window.addEventListener('resize', () => {
   this.width = window.innerWidth
   this.height = window.innerHeight
   this.camera.aspect = this.width / this.height
   this.camera.updateProjectionMatrix()

      this.devicePixelRatio = window.devicePixelRatio

      this.renderer.setSize(this.width, this.height)
      this.renderer.setPixelRatio(Math.min(this.devicePixelRatio, 2))
    }, false)

    /**
     * Loading Manager
     */
    this.loadingManager = new THREE.LoadingManager()

    this.loadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
      console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.')
    }

    this.loadingManager.onLoad = function () {
      console.log('Loading complete!')
    }

    this.loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
      console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.')
    }

    this.loadingManager.onError = function (url) {
      console.log('There was an error loading ' + url)
    }

    /**
     * Load Assets
     */
    this.loadAssets()

    /**
     * Helpers
     */
    this.addHelpers()

    /**
     * Objects
     */
    this.addObjects()
  }

  loadAssets() {
  }

  addHelpers() {
    const axisHelper = new THREE.AxesHelper(3)
    this.scene.add(axisHelper)

    this.stats = Stats()
    document.body.appendChild(this.stats.dom)
  }

  addObjects() {

  }

  shootBall() {
    console.log('shooooot ball');
    // Create a small ball geometry and material
    const ballGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    const ballMaterial = new THREE.MeshStandardMaterial({ color: 0x00FF00 });

    // Create a mesh for the ball
    const ball = new THREE.Mesh(ballGeometry, ballMaterial);

    // Set the position of the ball to (0, 0, 0)
    ball.position.set(0, 0, -10);

    // Add the ball to the scene
    console.log(this.scene);
    this.scene.add(ball);
  }

  animate() {
    this.stats.update()
    this.renderer.render(this.scene, this.camera)
  }
}

/**
 * Create ThreeJsDraft
 */
// eslint-disable-next-line no-new
new ThreeJsDraft()
