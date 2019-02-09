const timer = document.querySelectorAll('.timer');
const startButton = document.querySelectorAll('.button--start');
const pauseButton = document.querySelectorAll('.button--pause');
const resetButton = document.querySelectorAll('.button--reset');
const timerCounterSec = document.querySelectorAll('.timer__pointers--seconds');
const timerCounterMin = document.querySelectorAll('.timer__pointers--minutes');

timerCounterSec.forEach((item) => {
    item.textContent = 0;
});

timerCounterMin.forEach((item) => {
    item.textContent = 0;
});

const counter = function() {
    this.textContent++;
    if (this.textContent === '60') {
        this.previousSibling.previousSibling.textContent++;
        this.textContent = 0;
    }
}

const startCount = function() {
    console.log('This is startCount function');
    const secondsCounter = this.parentElement.previousSibling.previousSibling.childNodes[3];
    let numberOfTimer = this.tempProp;
    this.parentElement.parentElement.intervalID = setInterval(counter.bind(secondsCounter), 1000);
    startButton.forEach((item) => {
        console.log('Start forEach is working');
        if (this.parentElement.parentElement.id === numberOfTimer) {
            this.classList.add('hidden');
        }
    });
    pauseButton.forEach((item) => {
        if (this.parentElement.parentElement.id === numberOfTimer) {
            const pauseButton = this.nextSibling.nextSibling;
            pauseButton.classList.remove('hidden');
        }
    });
    resetButton.forEach((item) => {
        if (this.parentElement.parentElement.id === numberOfTimer) {
            const resetButton = this.nextSibling.nextSibling.nextSibling.nextSibling;
            resetButton.classList.remove('hidden');
        }
    });
}

const pauseCount = function() {
    console.log('This is pauseCount function');
    const numberOfTimer = this.tempProp;
    console.log(numberOfTimer);
    if (!this.isCounting) {
        clearInterval(this.parentElement.parentElement.intervalID);
        this.textContent = 'resume';
        this.isCounting = true;
    } else {
        const secondsCounter = this.parentElement.previousSibling.previousSibling.childNodes[3];
        this.textContent = 'pause';
        this.parentElement.parentElement.intervalID = setInterval(counter.bind(secondsCounter), 1000);
        this.isCounting = false;
    }
}

const resetCount = function() {
    console.log('this is resetCount function');
    const resetButton = this;
    const pauseButton = this.previousSibling.previousSibling;
    const startButton = this.previousSibling.previousSibling.previousSibling.previousSibling;
    const minutesCounter = this.parentElement.previousSibling.previousSibling.childNodes[1];
    const secondsCounter = this.parentElement.previousSibling.previousSibling.childNodes[3];
    clearInterval(this.parentElement.parentElement.intervalID);
    pauseButton.isCounting = false;
    pauseButton.textContent = 'pause';
    minutesCounter.textContent = 0;
    secondsCounter.textContent = 0;
    resetButton.classList.add('hidden');
    pauseButton.classList.add('hidden');
    startButton.classList.remove('hidden');
}

startButton.forEach((item) => {
    item.tempProp = item.parentElement.parentElement.id; //get an id of the timer and write into temporary property of item
    item.addEventListener('click', startCount.bind(item)); // make this item to be this to the cb-function
    item.parentElement.parentElement.intervalID = 0;
});

pauseButton.forEach((item) => {
    item.tempProp = item.parentElement.parentElement.id;
    item.isCounting = false;
    item.addEventListener('click', pauseCount.bind(item));
});

resetButton.forEach((item) => {
    item.tempProp = item.parentElement.parentElement.id;
    item.addEventListener('click', resetCount.bind(item));
});