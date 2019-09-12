import * as THREE from 'three';

export const materials = (function(){
  return {
    initMaterials: function(type, color){
        var selectedMaterial;
        var materialOptions = {
            color: color === undefined ? 'rgb(255, 255, 255)' : color    
        };
        switch (type) {
            case 'basic':
                selectedMaterial = new THREE.MeshBasicMaterial(materialOptions);
                // selectedMaterial.wireframe = true;
                break;
            case 'lambert':
                selectedMaterial = new THREE.MeshLambertMaterial(materialOptions);
                break;
            case 'phong':
                selectedMaterial = new THREE.MeshPhongMaterial(materialOptions);
                break;
            case 'standard':
                selectedMaterial = new THREE.MeshStandardMaterial(materialOptions);
                morphTargets: true;
                break;
            default: 
                selectedMaterial = new THREE.MeshBasicMaterial(materialOptions);
                break;
        }
        return selectedMaterial;  
      
    }
  
  }
})()