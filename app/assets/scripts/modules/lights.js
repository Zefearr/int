import * as THREE from 'three';

export const lights = (function () {
  return {
    getDirectionalLight: function (intensity) {
      var light = new THREE.DirectionalLight(0xffffe6, intensity);
      light.castShadow = true;
      // light.shadow.camera.left = -200;
      // light.shadow.camera.bottom = -200;
      // light.shadow.camera.right = 200;
      // light.shadow.camera.top = 200;
      light.shadow.mapSize.width = 2048;
      light.shadow.mapSize.height = 2048;
      return light;
    },
    getRectAreaLight: function(intensity, width, height) {
      var light = THREE.RectAreaLight( 0xffffff, intensity,  width, height );
      return light;
    },

    getSpotLight: function (intensity) {
      var light = new THREE.PointLight(0xffffe6, intensity);
      light.castShadow = true;
      light.shadow.bias = 0.001;
      light.distance = 1;
      light.decay = 2;
      
      // light.shadow.camera.near = 0.1;      
      // light.shadow.camera.far = 5000
      // light.shadow.camera.left = -20;
      // light.shadow.camera.bottom = -20;
      // light.shadow.camera.right = 20;
      // light.shadow.camera.top = 20; 
      light.shadow.mapSize.width = 2048; 
      light.shadow.mapSize.height = 2048;
      return light;
    },
    getPointLight: function (intensity) {
      var light = new THREE.PointLight(0xffffe6, intensity);
      light.distance = 2;
      light.decay = 2;
      light.castShadow = true;
      light.shadow.mapSize.width = 2048;  // default
      light.shadow.mapSize.height = 2048; // default
      return light;
    },

    getSealingLight: function (intensity) {
      var light = new THREE.PointLight(0xffffe6, intensity);
      light.distance = 3;
      light.decay = 2;
      // light.castShadow = true;
      // light.shadow.mapSize.width = 2048;  // default
      // light.shadow.mapSize.height = 2048; // default
      return light;
    },

    getDayPointLight: function (intensity) {
      var light = new THREE.PointLight(0xb3e0ff, intensity);
      light.distance = 4.3; 
      light.castShadow = false;
      return light;
    },

    getScreenLight: function (intensity) {
      var light = new THREE.PointLight(0x99d6ff, intensity);
      light.distance = 4.6;
      light.decay = 2;
      light.shadow.bias = 0.001;
      light.castShadow = true;

      light.shadow.mapSize.width = 512;  // default
      light.shadow.mapSize.height = 512; // default
      light.shadow.camera.near = 0.09;       // default
      // light.shadow.camera.far = 100; 

      return light;
    },
    getAmbientLight: function (intensity) {
      var light = new THREE.AmbientLight(0x81AECB, intensity);
      return light;
    }
  }
})()