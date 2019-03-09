class Clock {
  constructor() {
    this.secondsArrow = document.querySelector('.clock__seconds');
    this.minutesArrow = document.querySelector('.clock__minutes');
    this.hoursArrow = document.querySelector('.clock__hours'); 
  }

  run() {
    setInterval(() => {
      const time = this.initializeTime();
      const degrees = this.calculateDegree(time);

      this.rotateArrow(degrees);
    }, 1000);
  }

  calculateDegree(currTimeObj) {

    return {
      secondsDegree: (currTimeObj.currentSecond / 60) * 360,
      minutesDegree: (currTimeObj.currentMinute / 60) * 360,
      hoursDegree: (currTimeObj.currentHour / 12) * 360,
    }
  }

  initializeTime() {
    const now = new Date;
    
    return {
      currentSecond: now.getSeconds(),
      currentMinute: now.getMinutes(),
      currentHour: now.getHours()
    }
  }

  rotateArrow(currDegreesObj) {
    this.secondsArrow.style.transform = `translateY(-50%) rotate(${currDegreesObj.secondsDegree + 90}deg)`;
    this.minutesArrow.style.transform = `translateY(-50%) rotate(${currDegreesObj.minutesDegree + 90}deg)`;
    this.hoursArrow.style.transform = `translateY(-50%) rotate(${currDegreesObj.hoursDegree + 90}deg)`;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const clock = new Clock;
  clock.run();
});