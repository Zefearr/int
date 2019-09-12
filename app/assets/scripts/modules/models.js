import { materials } from './materials';
import Manager from './manager';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import * as THREE from 'three';

const manager = new Manager();
export const models = (function () {
  var loader = new FBXLoader(manager);

  var textureLoader = new THREE.TextureLoader(manager);
  return {
    getBox: function (material, w, h, d) {
      var geometry = new THREE.BoxGeometry(w, h, d);
      var obj = new THREE.Mesh(geometry, material);
      obj.castShadow = true;
      return obj;
    },
    getSphere: function (material, size, segments) {
      var geometry = new THREE.SphereGeometry(size, segments, segments);
      var obj = new THREE.Mesh(geometry, material);
      // obj.castShadow = true;
      // obj.receiveShadow = true; 
      return obj;
    },

    loadroom: function () {
      var roomGrp = new THREE.Group();
      loader.load('./assets/models/room_base.fbx', function (object) {

        var roomMat = materials.initMaterials('standard', 'white');
        roomMat.map = textureLoader.load('./assets/images/textures/room/room_diff.jpg');  
        roomMat.normalMap = textureLoader.load('./assets/images/textures/room/room_normals.png');
        roomMat.metalnessMap = textureLoader.load('./assets/images/textures/room/room_metalness.jpg');
        roomMat.roughness = 1; 
        roomMat.roughnessMap  = textureLoader.load('./assets/images/textures/room/room_roughness.jpg');
        roomMat.normalScale = new THREE.Vector2(1, 1);
        object.material = roomMat;
        object.castShadow = true;
        object.receiveShadow = true;
        object.traverse(function (child) { 
          if (child instanceof THREE.Mesh) {
            child.material = roomMat;
            child.castShadow = true;
            child.receiveShadow = true;
          }
          if (child.name === 'handler1') { 
            var handlerMat = materials.initMaterials('lambert', 0x99d6ff);
            handlerMat.emissive = new THREE.Color(0x99d6ff);
            handlerMat.emissiveIntensity = 20;
            child.material = handlerMat;
          } 
        });
        roomGrp.add(object);
      });
      return roomGrp;
    }, 
    loadPC: function () {
      var pcGrp = new THREE.Group();
      loader.load('./assets/models/kompp.fbx', function (object) {
        var pcMat = materials.initMaterials('standard', 'white');
        var screenMat = materials.initMaterials('basic', 0x000000);
        screenMat.map = textureLoader.load('./assets/images/screen.jpg');

        pcMat.map = textureLoader.load('./assets/images/textures/pc_diff.png');
        pcMat.normalMap = textureLoader.load('./assets/images/textures/pc_normal.png');
        pcMat.metalnessMap = textureLoader.load('./assets/images/textures/pc_metalness.png');

        object.material = pcMat;
        object.castShadow = true;
        object.receiveShadow = true;
        pcGrp.add(object);
        object.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            child.material = pcMat;
            child.castShadow = true;
            child.receiveShadow = true;
          }
          if(child.name === 'screen') {
            child.material = screenMat;
          }

        })
      });
      return pcGrp;
    },
    loadFabrics: function () {
      var fabricGrp = new THREE.Group();
      loader.load('./assets/models/fabrics.fbx', function (object) {
        var fabricMat = materials.initMaterials('standard', 'white');
        
        fabricMat.map = textureLoader.load('./assets/images/textures/fabrics/fabrics_albedo.jpg');
        fabricMat.metalness = 0;
        fabricMat.normalMap = textureLoader.load('./assets/images/textures/fabrics/fabrics_normal.png'); 
        fabricMat.normalScale = new THREE.Vector2(0.5, 0.5);
        fabricMat.roughness = 1;
        fabricMat.roughnessMap = textureLoader.load('./assets/images/textures/fabrics/fabrics_roughness.jpg'); 

        object.material = fabricMat;

        object.castShadow = true;
        object.receiveShadow = true;
        fabricGrp.add(object);
        object.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            child.material = fabricMat;
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
      });
      return fabricGrp;
    },
    loadStuff: function () {
      var stuffGrp = new THREE.Group();
      loader.load('./assets/models/stuff.fbx', function (object) {
        var stuffMat = materials.initMaterials('standard', 'white');
        var glassMat = materials.initMaterials('basic', 'black');
        var kolpakMat = materials.initMaterials('basic', 0x333333);
      
        kolpakMat.map = textureLoader.load('./assets/images/textures/stuff/stuffs_albedo.jpg');
      
   
        stuffMat.map = textureLoader.load('./assets/images/textures/stuff/stuffs_albedo.jpg');
        stuffMat.normalMap = textureLoader.load('./assets/images/textures/stuff/stuffs_normal.png');
        stuffMat.metalnessMap = textureLoader.load('./assets/images/textures/stuff/stuffs_metallic.jpg');
        stuffMat.roughness = 1;
        stuffMat.roughnessMap = textureLoader.load('./assets/images/textures/stuff/stuffs_roughness.jpg');
    
        object.material = stuffMat;
        object.castShadow = true;
        object.receiveShadow = true;
        stuffGrp.add(object);
        object.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            child.material = stuffMat;
            child.castShadow = true;
            child.receiveShadow = true;
          }
          if (child.name === 'glass') {
            child.material = glassMat;
          }
          if (child.name === 'kolpak') {
            child.material = kolpakMat;
            child.castShadow = true;
            child.receiveShadow = true;
          }
          if (child.name === 'bulb') {
            child.castShadow = false;
            child.receiveShadow = false;
            child.material = glassMat;
          }

        });
        
      });
      return stuffGrp;
    },
    loadMobel: function () {
      var mGrp = new THREE.Group();
      loader.load('./assets/models/furniture.fbx', function (object) {
        
        var mobelMat = materials.initMaterials('standard', 'white');
        mobelMat.map = textureLoader.load('./assets/images/textures/furniture/fur_diff.jpg');
        mobelMat.metalnessMap = textureLoader.load('./assets/images/textures/furniture/fur_metalness.jpg');   
        mobelMat.roughness = 1;
        mobelMat.roughnessMap = textureLoader.load('./assets/images/textures/furniture/fur_roughness.jpg');
        mobelMat.normalMap = textureLoader.load('./assets/images/textures/furniture/fur_normals.png');
        mobelMat.normalIntensity = new THREE.Vector2(0.5, 0.5); 

        object.material = mobelMat;
        object.castShadow = true;
        object.receiveShadow = true;
        mGrp.add(object);
        object.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            child.material = mobelMat;
            child.castShadow = true;
            child.receiveShadow = true;
          }

        })
      });
      return mGrp;
    },

    loadBooks: function () {
      var booksGrp = new THREE.Group();
      loader.load('./assets/models/books.fbx', function (object) {
      var booksMat = materials.initMaterials('standard', 'white');
      booksMat.map = textureLoader.load('./assets/images/textures/books/books_diff.jpg');
      booksMat.roughness = 1;
      booksMat.roughnessMap = textureLoader.load('./assets/images/textures/books/books_roughness.jpg');
      object.material = booksMat; 
      object.castShadow = true;
      object.receiveShadow = true;
      booksGrp.add(object);
        object.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            child.material = booksMat;
            child.castShadow = true;
            child.receiveShadow = true;
          }
        })
      });
      return booksGrp;
    }



  }
})()