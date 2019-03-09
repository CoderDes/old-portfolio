class Drums {
  constructor() {
    this.buttons = [...document.querySelectorAll('.key')]
    this.keyCodes = [65,83,68,70,71,72,74,75,76];
  }

  buttonOn(key) {
  
    this.buttons.forEach(elem => {
      if (elem.dataset.key === `${key}`) {
        elem.classList.add('active');

        this.buttonOff(elem);
      }
    });
  }

  buttonOff(elem) {
    setTimeout(() => {
      elem.classList.remove('active');
    }, 200);
  }

  play(key) {
    const audio = document.querySelector(`audio[data-key="${key}"]`);
    audio.currentTime = 0;
    audio.play();
  }

  initialize() {
    window.addEventListener('keydown', function(e) {
      if(drums.keyCodes.includes(e.keyCode)) {
        drums.play(e.keyCode);
        drums.buttonOn(e.keyCode);
      }
    });

    window.addEventListener('click', function(e) {
      if (e.target.classList.contains('key')) {
        drums.play(e.target.dataset.key);
        drums.buttonOn(e.target.dataset.key);
      } 
    });
  }
}

const drums = new Drums;
drums.initialize();