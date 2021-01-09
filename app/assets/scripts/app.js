import * as THREE from 'three';
import { materials } from './modules/materials';
import { models } from './modules/models';
import { lights } from './modules/lights';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import Manager from './modules/manager';
const manager = new Manager();
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';



import About from './modules/about';
const about = new About();
// import Manager from './modules/manager';
// const manager = new Manager();

const ui = (function () {
  let domStrings = {
    webglContainer: 'webgl',
  }
  return {
    getDomStrings: function () {
      return domStrings;
    }
  }
})()

const scene = (function (ui, lights, materials) {
  const domStrings = ui.getDomStrings();
  const audio = new Audio();
  var toggleLightsBtn = document.getElementById('lightToggler');

  var scene, camera, clock, renderer, controls, composer, params, bloomPass, renderScene, toggleLightsBtn;
  var WIDTH = window.innerWidth;
  var HEIGHT = window.innerHeight;
  var loader = new FBXLoader(manager);

  var params = {
    exposure: 1,
    bloomStrength: 0.3,
    bloomThreshold: 0,
    bloomRadius: 0.7
  };

  clock = new THREE.Clock();

  camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 1000);
  camera.position.z = 0;
  camera.position.x = -3.5

  camera.position.y = 0;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  var textureLoader = new THREE.TextureLoader();

  renderer.toneMapping = THREE.Uncharted2ToneMapping;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(WIDTH, HEIGHT);
  document.getElementById(domStrings.webglContainer).appendChild(renderer.domElement);
  var scene = new THREE.Scene();
  renderer.autoClear = false;


  var controls = new OrbitControls(camera, renderer.domElement);
  controls.maxDistance = 10;
  controls.maxPolarAngle = Math.PI * 0.495;
  controls.enableDamping = true;
  controls.screenSpacePanning = true;


  // controls.lookSpeed = 0.1;
  // controls.movementSpeed = 1;
  // controls.noFly = true;
  // controls.lookVertical = true;
  // controls.constrainVertical = true;
  // controls.verticalMin = 0;
  // controls.verticalMax = 3;
  // controls.lon = -200;
  // controls.lat = 200;


  scene.add(camera);

  renderScene = new RenderPass(scene, camera);
  bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
  bloomPass.threshold = params.bloomThreshold;
  bloomPass.strength = params.bloomStrength;
  bloomPass.radius = params.bloomRadius;


  composer = new EffectComposer(renderer);

  composer.addPass(renderScene);
  composer.addPass(bloomPass);

  //lightSetup

  var main_grp = new THREE.Group();

  function switchToNight() {
    if (this.checked) {
      nightStyle();
    } else dayStyle();
  }
  var stateIconDay = document.querySelector('.sun');
  var stateIconNight = document.querySelector('.moon');

  function nightStyle() {
    stateIconDay.style.opacity = 0;
    stateIconNight.style.opacity = 1;
    rmSwitch('night');
  }
  function dayStyle() {
    stateIconDay.style.opacity = 1;
    stateIconNight.style.opacity = 0;
    rmSwitch('day');
  }


  const windowPlane = models.loadWindow();
  main_grp.add(windowPlane);


  const all = models.loadAll();
  main_grp.add(all);



  function rmSwitch(type) {


    var roomNightSrc = textureLoader.load('./assets/images/textures/room/room_nightlightmap.png');
    var roomDaySrc = textureLoader.load('./assets/images/textures/room/room_lightmap.png');

    var furNightSrc = textureLoader.load('./assets/images/textures/furniture/fur_nightlightmap.png');
    var furDaySrc = textureLoader.load('./assets/images/textures/furniture/fur_lightmap.png');

    var screenNightSrc = textureLoader.load('./assets/images/textures/reflector/reflector_nightlightmap.png');
    var screenDaySrc = textureLoader.load('./assets/images/textures/reflector/reflector_lightmap.png');

    var fabNightSrc = textureLoader.load('./assets/images/textures/fabrics/fabrick_nightlightmap.png');
    var fabDaySrc = textureLoader.load('./assets/images/textures/fabrics/fabrick_lightmap.png');

    var cursNightSrc = textureLoader.load('./assets/images/textures/curtains/curtains_nightlightmap.png');
    var cursDaySrc = textureLoader.load('./assets/images/textures/curtains/curtains_lightmap.png');

    var stuffNightSrc = textureLoader.load('./assets/images/textures/lamps/stuff_nightlightmap.png');
    var stuffDaySrc = textureLoader.load('./assets/images/textures/lamps/stuff_lightmap.png');

    var books2NightSrc = textureLoader.load('./assets/images/textures/books/books_2_nightlightmap.png');
    var books2DaySrc = textureLoader.load('./assets/images/textures/books/books_2_lightmap.png');

    var kompNightSrc = textureLoader.load('./assets/images/textures/pc_nightlightmap.png');
    var kompDaySrc = textureLoader.load('./assets/images/textures/pc_lightmap.png');

    var booksNightSrc = textureLoader.load('./assets/images/textures/books/books_nightlightmap_2k.png');
    var booksDaySrc = textureLoader.load('./assets/images/textures/books/books_lightmap_2k.png');

    var plantNightSrc = textureLoader.load('./assets/images/textures/plant/plant_nightlightmap.png');
    var plantDaySrc = textureLoader.load('./assets/images/textures/plant/plant_lightmap.png');

    var windowPlaneNightSrc = textureLoader.load('./assets/images/textures/trees_night.png');
    var windowPlaneDaySrc = textureLoader.load('./assets/images/textures/trees.png');


    var sc = scene.getObjectByName('room_base');
    var fur = scene.getObjectByName('furz');
    var ref = scene.getObjectByName('screen');
    var fabs = scene.getObjectByName('fabs')
    var curs = scene.getObjectByName('curtains1');
    var lamps = scene.getObjectByName('stuff');
    var books2 = scene.getObjectByName('books_2');
    var komp = scene.getObjectByName('komp');
    var books1 = scene.getObjectByName('books_1');
    var plant = scene.getObjectByName('plant');
    var windowPlane = scene.getObjectByName('pPlane1');

    switch (type) {
      case 'day':
        sc.material.lightMap = roomDaySrc;
        fur.material.lightMap = furDaySrc;
        ref.material.lightMap = screenDaySrc;
        fabs.material.lightMap = fabDaySrc;
        curs.material.lightMap = cursDaySrc;
        lamps.material.lightMap = stuffDaySrc;
        books2.material.lightMap = books2DaySrc;
        komp.material.lightMap = kompDaySrc;
        books1.material.lightMap = booksDaySrc;
        plant.material.lightMap = plantDaySrc;
        windowPlane.material.map = windowPlaneDaySrc;
        break;
      case 'night':
        sc.material.lightMap = roomNightSrc;
        fur.material.lightMap = furNightSrc;
        ref.material.lightMap = screenNightSrc;
        fabs.material.lightMap = fabNightSrc;
        curs.material.lightMap = cursNightSrc;
        lamps.material.lightMap = stuffNightSrc;
        books2.material.lightMap = books2NightSrc;
        komp.material.lightMap = kompNightSrc;
        books1.material.lightMap = booksNightSrc;
        plant.material.lightMap = plantNightSrc;
        windowPlane.material.map = windowPlaneNightSrc;

        break;
      default:
        sc.material.lightMap = roomDaySrc;
        fur.material.lightMap = furDaySrc;
        ref.material.lightMap = screenDaySrc;
        fabs.material.lightMap = fabDaySrc;
        curs.material.lightMap = cursDaySrc;
        lamps.material.lightMap = stuffDaySrc;
        books2.material.lightMap = books2DaySrc;
        komp.material.lightMap = kompDaySrc;
        books1.material.lightMap = booksDaySrc;
        plant.material.lightMap = plantDaySrc;
        break;
    }
  }

  main_grp.add(all);

  var mirr = new THREE.PlaneBufferGeometry(0.98, 2);
  var verticalMirror = new Reflector(mirr, {
    clipBias: 0.003,
    textureWidth: WIDTH * window.devicePixelRatio,
    textureHeight: HEIGHT * window.devicePixelRatio,
    color: 0x889999,
    recursion: 1
  });
  verticalMirror.position.x = 2.38;
  verticalMirror.position.y = 1.1;
  verticalMirror.position.z = 1.48;
  verticalMirror.rotation.y = -Math.PI / 2;

  main_grp.add(verticalMirror);
  main_grp.position.y = -1;
  scene.add(main_grp);

  window.onresize = function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);

  };


  function animate() {
    requestAnimationFrame(animate);
    var delta = clock.getDelta();

    render();
  }

  animate();

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    composer.setSize(window.innerWidth, window.innerHeight);
    camera.updateProjectionMatrix();
    render();
  }
  function render() {
    controls.update();
    composer.render();
  }

  return {
    init: function () {
      animate();

      window.onload = function () {
        toggleLightsBtn.addEventListener('change', switchToNight, false);
        window.addEventListener('resize', onWindowResize, false);
      }
    }

  }

})(ui, lights, materials);
scene.init();








