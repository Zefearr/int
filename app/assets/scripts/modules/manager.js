
import * as THREE from 'three'; 
class Manager {
  constructor() {
    this.manager = new THREE.LoadingManager();
    // this.splashScreen = document.createElement('div');
    // this.splashScreen.className = 'splash';
    // console.log(this.splashScreen);
    this.events();
    return this.manager;
  }

  events() {
    

    
      this.manager.onStart = function (itemsLoaded, itemsTotal) { 
     
        let spScreen = document.createElement('div');
        spScreen.className = 'splash-screen';
        if(!document.querySelector('.splash-screen')) {
          document.body.appendChild(spScreen);
        }
       
        // console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
        spScreen.innerHTML = ` 
              <div class="splash--inner">
                  <h3 style="float:left">Loading</h3>
                  <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
              </div>
            
              `; 
        // this.splashScreen.classList.add('loading');
      }
      this.manager.onLoad = function () {
        var splashScreen = document.querySelector('.splash-screen');
    
        splashScreen.classList.add('dissolving');
        // setTimeout(() => {
        //   document.body.removeChild(splashScreen);
        // }, 2000);
     
      }
    
  
  }

}
export default Manager;



