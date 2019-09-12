import * as THREE from 'three';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { materials } from './modules/materials';
import { models } from './modules/models';
import { lights } from './modules/lights';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import About from './modules/about';
const about = new About();

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

  var scene,  camera, clock,  renderer,  controls, composer,  light, params, bloomPass, renderScene, toggleLightsBtn;

  var WIDTH = window.innerWidth;
  var HEIGHT = window.innerHeight;
  RectAreaLightUniformsLib.init();

  var params = {
    exposure: 1,
    bloomStrength: 0.5,
    bloomThreshold: 0,
    bloomRadius: 1
  };

  clock = new THREE.Clock();

  camera = new THREE.PerspectiveCamera(55, WIDTH / HEIGHT, 0.1, 100);
  camera.position.z = 0;
  camera.position.x = -3.1;
  camera.position.y = 0;

  renderer = new THREE.WebGLRenderer({ antialias: true });

  renderer.toneMapping = THREE.Uncharted2ToneMapping;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(WIDTH, HEIGHT);
  document.getElementById(domStrings.webglContainer).appendChild(renderer.domElement); 
  var scene = new THREE.Scene();
  renderer.autoClear = false;

  var controls = new OrbitControls(camera, renderer.domElement);
  controls.screenSpacePanning = true;

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
  var pivotMat = materials.initMaterials('basic', 'white');
  pivotMat.opacity = 0.1;
  var lightPivot = models.getSphere(pivotMat, 0.01, 24);
  var hemilightPivot = models.getSphere(pivotMat, 0.1, 24);
  var light = lights.getPointLight(0);

  light.position.y = 0.75;
  light.position.z = 1.68;
  light.position.x = 1.20;
  light.castShadow = true;

  main_grp.add(light);

  var dirPivot = models.getSphere(pivotMat, 1, 24);
  var directionalLight = new lights.getDirectionalLight(0xffffff, 0.5);
  directionalLight.castShadow = true;
  // directionalLight.position.set( 0, 1, 0 ); 	
  // directionalLight.add(dirPivot);
  directionalLight.position.x = -10;
  directionalLight.intensity = 0.5;
  directionalLight.position.z = 2;
  directionalLight.position.y = 4;
  main_grp.add(directionalLight);

  var video = document.getElementById('video');
  // video.play();
  var videoTexture = new THREE.VideoTexture(video);
  var VidParameters = { color: 0xffffff, map: videoTexture };
  videoTexture.minFilter = THREE.NearestFilter;
  videoTexture.magFilter = THREE.NearestFilter;
  videoTexture.format = THREE.RGBFormat;
  var vidMaterial = new THREE.MeshLambertMaterial(VidParameters);


  var screenLight = new THREE.RectAreaLight(0xA4E5FF, 0, 0.7, 0.4);
  screenLight.position.z = -1.76;
  screenLight.position.y = 1.1;
  screenLight.rotation.y = Math.PI;

  main_grp.add(screenLight);

  var windowlight = new THREE.RectAreaLight(0xffffff, 2, 2.2, 1.2);
  var windowlightHelper = new THREE.RectAreaLightHelper(windowlight);
  windowlight.add(windowlightHelper);
  windowlight.rotation.y = -Math.PI / 2;
  windowlight.position.y = 1.66;
  windowlight.position.z = 0;
  windowlight.position.x = -3.25;
  main_grp.add(windowlight);


  var squaredLight = new THREE.RectAreaLight(0x99d6ff, 0, 5, 0.05);
  squaredLight.rotation.y = Math.PI;
  squaredLight.position.y = 2.7;
  squaredLight.position.z = -1.7;
  squaredLight.position.x = 0;

  main_grp.add(squaredLight);

  var squaredLight2 = new THREE.RectAreaLight(0x99d6ff, 0, 2.8, 0.05);
  squaredLight2.rotation.y = -Math.PI / 2;
  squaredLight2.position.y = 2.7;
  squaredLight2.position.z = 0;
  squaredLight2.position.x = -2.7;

  main_grp.add(squaredLight2);

  var squaredLight3 = new THREE.RectAreaLight(0x99d6ff, 0, 5, 0.05);
  squaredLight3.position.y = 2.7;
  squaredLight3.position.z = 1.7;
  squaredLight3.position.x = 0;

  main_grp.add(squaredLight3);

  var squaredLight4 = new THREE.RectAreaLight(0x99d6ff, 0, 2.8, 0.05);
  squaredLight4.rotation.y = Math.PI / 2;
  squaredLight4.position.y = 2.7;
  squaredLight4.position.z = 0;
  squaredLight4.position.x = 2.7;

  main_grp.add(squaredLight4);




  var dayPointLight = lights.getDayPointLight(0.3);
  dayPointLight.position.x = -1.7;
  dayPointLight.position.y = 0.5;
  scene.add(dayPointLight);

  var dayPointLight2 = lights.getDayPointLight(0.16);
  dayPointLight2.position.x = 1.4;
  dayPointLight2.position.z = -0.6;
  dayPointLight2.position.y = 0.5;
  dayPointLight2.distance = 3;
  scene.add(dayPointLight2);

  var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.05);
  hemiLight.color.setHSL(0.6, 1, 0.6);
  hemiLight.groundColor.setHSL(204, 100, 71);

  main_grp.add(hemiLight);

  var sealingLamp = lights.getSealingLight(0);
  sealingLamp.position.y = 2.45;
  sealingLamp.position.z = -1.7;
  sealingLamp.position.x = 0.98;
  main_grp.add(sealingLamp);

  var sealingLamp2 = lights.getSealingLight(0);
  sealingLamp2.position.y = 2.45;
  sealingLamp2.position.z = -1.7;
  sealingLamp2.position.x = -1.03;
  main_grp.add(sealingLamp2);

  var sealingLamp3 = lights.getSealingLight(0);

  sealingLamp3.position.y = 2.45;
  sealingLamp3.position.z = 1.73;
  sealingLamp3.position.x = 0.98;
  main_grp.add(sealingLamp3);

  var sealingLamp4 = lights.getSealingLight(0);

  sealingLamp4.position.y = 2.45;
  sealingLamp4.position.z = 1.73;
  sealingLamp4.position.x = -1.03;
  main_grp.add(sealingLamp4);

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
    var sc = scene.getObjectByName('screen');
    sc.material.color = new THREE.Color(0xffffff);
    var kol = scene.getObjectByName('kolpak');
    kol.material.color = new THREE.Color('gray'); 
    let glasses = scene.getObjectByName('glass');
    glasses.material.color = new THREE.Color(0xffffff);

    dayPointLight.intensity = 0
    dayPointLight2.intensity = 0;
    windowlight.intensity = 0;
    directionalLight.intensity = 0;
    hemiLight.intensity = 0;
    windowlightHelper.color = new THREE.Color(0x000000);
    windowlightHelper.update();

    sealingLamp.intensity = 0.2;
    sealingLamp2.intensity = 0.2;
    sealingLamp3.intensity = 0.2;
    sealingLamp4.intensity = 0.2;
    screenLight.intensity = 2;
    light.intensity = 0.3;
    squaredLight.intensity = 10;
    squaredLight2.intensity = 10;
    squaredLight3.intensity = 10;
    squaredLight4.intensity = 10;
  }
  function dayStyle() {
    stateIconDay.style.opacity = 1;
    stateIconNight.style.opacity = 0;
    var sc = scene.getObjectByName('screen');
    sc.material.color = new THREE.Color(0x000000);

    var kol = scene.getObjectByName('kolpak');
    kol.material.color = new THREE.Color(0x333333); 

    let glasses = scene.getObjectByName('glass');
    glasses.material.color = new THREE.Color(0x000000);

    light.intensity = 0;
    squaredLight.intensity = 0;
    squaredLight2.intensity = 0;
    squaredLight3.intensity = 0;
    squaredLight4.intensity = 0;
    screenLight.intensity = 0;

    sealingLamp.intensity = 0;
    sealingLamp2.intensity = 0;
    sealingLamp3.intensity = 0;
    sealingLamp4.intensity = 0;
    windowlightHelper.color = new THREE.Color(0xccebff);
    windowlightHelper.update();
    hemiLight.intensity = 0.05;
    directionalLight.intensity = 0.5;
    windowlight.intensity = 2;
    dayPointLight.intensity = 0.3;
    dayPointLight2.intensity = 0.16;
  }


  // loader.load('./assets/models/screen.fbx', function (object) {


  //   object.traverse(function (child) {
  //     if (child.isMesh) {
  //       child.material = vidMaterial;
  //       child.castShadow = true;
  //       child.receiveShadow = false;
  //     }

  //   });

  //   main_grp.add(object);
  // });

  //   var geom = new THREE.PlaneGeometry( 1.6, 0.9, 32 );
  // var videoScreen = new THREE.Mesh( geom, vidMaterial );
  // main_grp.add( videoScreen );
  // videoScreen.position.y = 1.2;
  // videoScreen.position.z = -1.6;

  // var position = new THREE.Vector3().copy(screenLight.position);
  // screenLight.localToWorld(position);
  // camera.lookAt(position);



  // var bMat = materials.initMaterials('standard', 'blue');
  // var b = models.getBox(bMat, 1, 1, 1);
  // scene.add(b);
  // var mashMat = materials.initMaterials('standard', 0xffffff);
  // mashMat.roughness = 1;
  // loader.load('./assets/models/mash_h.fbx', function (object) {
  //   // scene.add(gltf.scene);
  //   let triggerBtn = document.getElementById('playSound');
  //   let muteSoundBtn = document.getElementById('muteSound');

  //   object.material = mashMat;
  //   object.castShadow = true;
  //   object.receiveShadow = true;

  //   object.traverse(function (child) {
  //     if (child instanceof THREE.Mesh) {
  //       child.material = mashMat;
  //       child.castShadow = true;
  //       child.receiveShadow = true;
  //     }
  //   });

  //   mixer = new THREE.AnimationMixer(object);
  //   animationClip = mixer.clipAction(object.animations[0]);

  //   animationClip.clampWhenFinished = false;
  //   animationClip.setLoop(THREE.LoopOnce);

  //   mixer.addEventListener("finished", function (e) {
  //     triggerBtn.checked = false;
  //     audio.pause();
  //     audio.currentTime = 0;
  //     isPlay = !isPlay;
  //     var curAction = e.action;
  //     setTimeout(function () {
  //       curAction = e.action;
  //       curAction.stop();
  //     }, 0);
  //   });

  //   mashGrp.add(object);
  //   mashGrp.scale.x = 1;
  //   mashGrp.scale.y = 1;
  //   mashGrp.scale.z = 1;
  //   mashGrp.position.y = 10;
  //   mashGrp.position.z = 0;

  //   muteSoundBtn.addEventListener('click', () => {
  //     audio.muted = !audio.muted;
  //   });
  //   triggerBtn.addEventListener('click', () => {

  //     isPlay = !isPlay;

  //     if (isPlay) {
  //       animationClip.enabled = true;
  //       animationClip.paused = false;
  //       animationClip.timeScale = 1;
  //       animationClip.play();

  //       // deactivateActions(animationClip);

  //     } else {
  //       animationClip.paused = true;

  //       // activateActions(animationClip);
  //     }
  //     return audio.paused ? audio.play() : audio.pause();
  //   });

  //   mashGrp.position.y = 0;
  //   mashGrp.position.y = 5;
  //   mashGrp.add(object);

  // });
  // scene.add(mashGrp);

  const deactivateActions = function (action) {
    action.paused = true;
  }
  const activateActions = function (action) {
    action.paused = false;
    action.timeScale = 20;
    action.setLoop(THREE.LoopOnce);
    // action.clampWhenFinished = true;
    action.play();
  }

  const room = models.loadroom();
  main_grp.add(room);

  const furniture = models.loadMobel();
  main_grp.add(furniture);

  const pc = models.loadPC();
  main_grp.add(pc);

  const fabrics = models.loadFabrics();
  main_grp.add(fabrics);


  const stuff = models.loadStuff();
  main_grp.add(stuff);

  const books = models.loadBooks();
  main_grp.add(books);

  var mirr = new THREE.PlaneBufferGeometry(0.49, 1.26);
  var verticalMirror = new Reflector(mirr, {
    clipBias: 0.003,
    textureWidth: WIDTH * window.devicePixelRatio,
    textureHeight: HEIGHT * window.devicePixelRatio,
    color: 0x889999,
    recursion: 1
  });
  main_grp.add(verticalMirror);
  verticalMirror.position.x = 2.355;
  verticalMirror.position.y = 1.405;
  verticalMirror.position.z = 0.74;
  verticalMirror.rotation.y = -Math.PI / 2;

  var mirr2 = new THREE.PlaneBufferGeometry(0.49, 1.26);
  var verticalMirror2 = new Reflector(mirr2, {
    clipBias: 0.003,
    textureWidth: WIDTH * window.devicePixelRatio,
    textureHeight: HEIGHT * window.devicePixelRatio,
    color: 0x889999,
    recursion: 1
  });
  main_grp.add(verticalMirror2);
  verticalMirror2.position.x = 2.355;
  verticalMirror2.position.y = 1.405;
  verticalMirror2.position.z = 1.238;
  verticalMirror2.rotation.y = -Math.PI / 2;

  var mirr3 = new THREE.PlaneBufferGeometry(0.49, 0.65);
  var verticalMirror3 = new Reflector(mirr3, {
    clipBias: 0.003,
    textureWidth: WIDTH * window.devicePixelRatio,
    textureHeight: HEIGHT * window.devicePixelRatio,
    color: 0x889999,
    recursion: 1
  });
  main_grp.add(verticalMirror3);
  verticalMirror3.position.x = 2.355;
  verticalMirror3.position.y = 0.41;
  verticalMirror3.position.z = 1.238;
  verticalMirror3.rotation.y = -Math.PI / 2;

  var mirr4 = new THREE.PlaneBufferGeometry(0.49, 0.65);
  var verticalMirror4 = new Reflector(mirr4, {
    clipBias: 0.003,
    textureWidth: WIDTH * window.devicePixelRatio,
    textureHeight: HEIGHT * window.devicePixelRatio,
    color: 0x889999,
    recursion: 1
  });
  main_grp.add(verticalMirror4);
  verticalMirror4.position.x = 2.355;
  verticalMirror4.position.y = 0.41;
  verticalMirror4.position.z = 0.74;
  verticalMirror4.rotation.y = -Math.PI / 2;


  main_grp.position.y = -1;
  scene.add(main_grp);





  // var gui = new GUI();

  // gui.add(light, 'intensity', 0, 10);
  // gui.add(screenLight, 'intensity', 0, 10);
  // gui.add(squaredLight, 'intensity', 0, 30);
  // gui.add(squaredLight2, 'intensity', 0, 30);
  // gui.add(squaredLight3, 'intensity', 0, 30);
  // gui.add(squaredLight4, 'intensity', 0, 30);
  // gui.add(windowlight, 'intensity', 0, 100);
  // gui.add(directionalLight, 'intensity', 0, 100);

  // gui.add(directionalLight.position, 'x', -50.00, 50.00);
  // gui.add(directionalLight.position, 'y', -50.00, 50.00);
  // gui.add(directionalLight.position, 'z', -50.00, 50.00);

  // gui.add(hemiLight.position, 'z', -50.00, 50.00);
  // gui.add(hemiLight.position, 'x', -50.00, 50.00);
  // gui.add(hemiLight.position, 'y', -50.00, 50.00);

  // gui.add(screenLight.position, 'z', -2, 10);
  // gui.add(screenLight.position, 'y', -2, 10);
  // gui.add(main_grp.position, 'y', -20, 20);

  // gui.add(light.position, 'y', 0.00, 10.00);
  // gui.add(light.position, 'z', -2.00, 10.00);
  // gui.add(light.position, 'x', -2.00, 10.00);
  // gui.add(screenLight, 'distance', 0, 10.00);
  // gui.add(screenLight.shadow.camera, 'near', 0, 100.00);
  // gui.add(audio, 'volume', 0, 1);
  // gui.add(effectController, "focus", 1.0, 3000.0, 1).onChange(matChanger);
  // gui.add(effectController, "aperture", 0, 10, 0.1).onChange(matChanger);
  // gui.add(effectController, "maxblur", 0.0, 3.0, 0.025).onChange(matChanger);
  // matChanger(); 

  // var folder1 = gui.addFolder('DayLights');
  // folder1.add(directionalLight, 'intensity', 0, 10);
  // folder1.add(windowlight, 'intensity', 0, 10);
  // folder1.add(dayPointLight, 'intensity', 0, 10);
  // folder1.add(dayPointLight2, 'intensity', 0, 10);

  // var folder2 = gui.addFolder('NightLights');
  // folder2.add(light, 'intensity', 0, 10);
  // folder2.add(sealingLamp, 'intensity', 0, 10);

  


  // gui.add(params, 'exposure', 0.1, 2).onChange(function (value) {

  //   renderer.toneMappingExposure = Math.pow(value, 4.0);

  // });

  // gui.add(params, 'bloomThreshold', 0.0, 1.0).onChange(function (value) {

  //   bloomPass.threshold = Number(value);

  // });

  // gui.add(params, 'bloomStrength', 0.0, 3.0).onChange(function (value) {

  //   bloomPass.strength = Number(value);

  // });

  // gui.add(params, 'bloomRadius', 0.0, 1.0).step(0.01).onChange(function (value) {

  //   bloomPass.radius = Number(value);

  // });
  // gui.open();

  window.onresize = function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);

  };


  function animate() {
    requestAnimationFrame(animate);
    render();
  }

  animate();

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
    camera.updateProjectionMatrix();
    render();
  }
  function render() {
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

 






