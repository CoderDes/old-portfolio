const flickr = document.querySelector('.flickr');

var intervalOne = setInterval(() => {
    setTimeout(() => {
        flickr.classList.remove('hidden');
    }, 3000);
    flickr.classList.add('hidden');
}, 4000);

class Timer {
  constructor() {
    this.days = +document.querySelector('.timer__section--days')
    .querySelector('.timer__digits').textContent;
    this.hours = +document.querySelector('.timer__section--hours')
    .querySelector('.timer__digits').textContent;
    this.minutes = +document.querySelector('.timer__section--minutes')
    .querySelector('.timer__digits').textContent;
    this.seconds = +document.querySelector('.timer__section--seconds')
    .querySelector('.timer__digits').textContent;
  }

  run() {
      
    const templateFunction = (time, result) => {
      document
        .querySelector(`.timer__section--${time}`)
        .querySelector('.timer__digits')
          .textContent = result;
    }

    let intervalTimer = setInterval(() => {

      let seconds;
      let minutes;
      let hours;
      let days;

      if (this.seconds < 10) {
        seconds = `0${--this.seconds}`;
      } else {
        seconds = --this.seconds;
      }

      templateFunction('seconds', seconds);
    
      if (this.seconds === 0) {
        this.seconds = 60;

        minutes = --this.minutes;

        if (this.minutes < 10) {
            minutes = `0${minutes}`;
        }

        if (this.minutes === -1) {
          this.minutes = 59;
          minutes = 59;
        }

        templateFunction('minutes', minutes);
      }

      if (this.minutes === 59 && this.seconds === 60) {

        hours = --this.hours;

        if (this.hours === -1) {
          this.hours = 23
          hours = 23;
        }

        if (this.hours < 10) {
          hours = `0${hours}`;
        } 

        templateFunction('hours', hours);
      }

      if (this.hours === 23 && this.minutes === 59 && this.seconds === 60) {
        days = --this.days;

        if (this.days < 10) {
            days = `0${days}`;
        } 

        templateFunction('days', days);
      }
    }, 1000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const timer = new Timer;
  timer.run();
});