class About {
  constructor() {
    this.toggleAboutBtn = document.getElementById('aboutBtn');
    this.aboutScreen = document.getElementById('aboutScreen');
    this.closeBtn = document.getElementById('closeOv');
    this.events();
  }
  events() {
    this.toggleAboutBtn.addEventListener('click', this.openOverlay.bind(this));
    this.closeBtn.addEventListener('click', this.closeOverlay.bind(this));
  }
  openOverlay() {
    this.aboutScreen.classList.add('expanded');
  }
  closeOverlay() {
    this.aboutScreen.classList.remove('expanded');
  }
}
export default About;