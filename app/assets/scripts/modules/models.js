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

    
    
    
    
  
    
    loadWindow: function() {
      var windowGrp = new THREE.Group();

      loader.load('./assets/models/windowplane.fbx', function (object) {
        var windowMat = materials.initMaterials('basic', 'white');
        windowMat.map = textureLoader.load('./assets/images/textures/trees.png');
        windowMat.transparent = true;
        windowMat.alphaMap = textureLoader.load('./assets/images/textures/trees.png');


        object.material = windowMat;
        object.traverse(function(child){
          if(child instanceof THREE.Mesh) {
            child.material = windowMat;
          }
        })
        windowGrp.add(object);
      });
      return windowGrp;
    },
   
    
    loadAll: function () {
      var baseGrp = new THREE.Group();
      loader.load('./assets/models/room_plus_stuff.fbx', function (object) {

        var uvs = object.children[0].geometry.attributes.uv.array;
        object.children[0].geometry.addAttribute('uv2', new THREE.BufferAttribute(uvs, 2));
        var roomMat = materials.initMaterials('standard', 'white');
        roomMat.lightMap = textureLoader.load('./assets/images/textures/room/room_lightmap.png');
        roomMat.lightMapIntensity = 0.8;
        roomMat.metalnessMap = textureLoader.load('./assets/images/textures/room/roombase_metallic.jpg');

        var uvs2 = object.children[1].geometry.attributes.uv.array;
        object.children[1].geometry.addAttribute('uv2', new THREE.BufferAttribute(uvs2, 2));
        var mobelMat = materials.initMaterials('standard', 'white');
        mobelMat.lightMap = textureLoader.load('./assets/images/textures/furniture/fur_lightmap.png');
        mobelMat.lightMapIntensity = 0.7;
        mobelMat.metalness = 0;

   

        var fabricMat = materials.initMaterials('standard', 'white');
        var uvs3 = object.children[2].geometry.attributes.uv.array;
        object.children[2].geometry.addAttribute('uv2', new THREE.BufferAttribute(uvs3, 2));
        fabricMat.lightMap = textureLoader.load('./assets/images/textures/fabrics/fabrick_lightmap.png');
        fabricMat.metalness = 0;


        var curtainsMat = materials.initMaterials('standard', 'white');
        curtainsMat.side = THREE.DoubleSide;
        var uvs4 = object.children[3].geometry.attributes.uv.array;
        object.children[3].geometry.addAttribute('uv2', new THREE.BufferAttribute(uvs4, 2));
        curtainsMat.lightMap = textureLoader.load('./assets/images/textures/curtains/curtains_lightmap.png');
        curtainsMat.metalnessMap = textureLoader.load('./assets/images/textures/curtains/curtains_metallic.jpg');

   

        var pcMat = materials.initMaterials('standard', 'white');
        var uvs5 = object.children[4].geometry.attributes.uv.array;
        object.children[4].geometry.addAttribute('uv2', new THREE.BufferAttribute(uvs5, 2));
        pcMat.lightMap = textureLoader.load('./assets/images/textures/pc_lightmap.png');
        pcMat.metalnessMap = textureLoader.load('./assets/images/textures/pc_metalness.png');

        var plantMat = materials.initMaterials('standard', 'white');
        plantMat.side = THREE.DoubleSide;
        var uvs6 = object.children[5].geometry.attributes.uv.array;
        object.children[5].geometry.addAttribute('uv2', new THREE.BufferAttribute(uvs6, 2));
        plantMat.lightMap = textureLoader.load('./assets/images/textures/plant/plant_lightmap.png');

        var booksMat = materials.initMaterials('standard', 'white');
        var uvs7 = object.children[6].geometry.attributes.uv.array;
   
        object.children[6].geometry.addAttribute('uv2', new THREE.BufferAttribute(uvs7, 2));
        booksMat.lightMap = textureLoader.load('./assets/images/textures/books/books_lightmap_2k.png'); 
        booksMat.metalness = 0;
        // booksMat.map = textureLoader.load('./assets/images/textures/books/books_diff.jpg'); 

        var stuffMat = materials.initMaterials('standard', 'white');
        var uvs8 = object.children[7].geometry.attributes.uv.array;
     
        object.children[7].geometry.addAttribute('uv2', new THREE.BufferAttribute(uvs8, 2));
        stuffMat.lightMap = textureLoader.load('./assets/images/textures/lamps/stuff_lightmap.png'); 
        stuffMat.metalnessMap = textureLoader.load('./assets/images/textures/lamps/stuffs1_metallic.jpg'); 

        var books2Mat = materials.initMaterials('standard', 'white');
        var uvs9 = object.children[8].geometry.attributes.uv.array;
     
        object.children[8].geometry.addAttribute('uv2', new THREE.BufferAttribute(uvs9, 2));
        books2Mat.lightMap = textureLoader.load('./assets/images/textures/books/books_2_lightmap.png'); 
        books2Mat.metalness = 0;


        var screenMat = materials.initMaterials('standard', 'white');
        var uvs10 = object.children[9].geometry.attributes.uv.array;
     
        object.children[9].geometry.addAttribute('uv2', new THREE.BufferAttribute(uvs10, 2));
        screenMat.lightMap = textureLoader.load('./assets/images/textures/reflector/reflector_lightmap.png'); 
        screenMat.metalness = 0;



        object.material = roomMat;
        object.castShadow = true; 
        object.receiveShadow = true;
        baseGrp.add(object);
        object.traverse(function (child) {
          if (child.name === 'room_base') {
            child.material = roomMat;
            child.castShadow = true;
            child.receiveShadow = true;
          } else if (child.name === 'fabs') {
            child.material = fabricMat;
            child.castShadow = true;
            child.receiveShadow = true;
          } else if (child.name === 'furz') {
            child.material = mobelMat;
            child.castShadow = true;
            child.receiveShadow = true;
          } else if (child.name === 'curtains1') {
            child.material = curtainsMat;
            child.castShadow = true;
            child.receiveShadow = true;
          }  else if (child.name === 'komp') {
            child.material = pcMat;
            child.castShadow = true;
            child.receiveShadow = true;
          }  else if (child.name === 'plant') {
            child.material = plantMat;
            child.castShadow = true;
            child.receiveShadow = true;
          } else if (child.name === 'books_1') {
            child.material = booksMat;
            child.castShadow = true;
            child.receiveShadow = true;
          } else if (child.name === 'stuff') {
            child.material = stuffMat;
            child.castShadow = true;
            child.receiveShadow = true;
          }  else if (child.name === 'books_2') {
            child.material = books2Mat;
            child.castShadow = true;
            child.receiveShadow = true;
          }
        })
      });
      return baseGrp;
    }
  }
})() 