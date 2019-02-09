const tenthOfSecond = [...document.querySelectorAll('.timer__one-tenth-of-second')];
let rotateStepSeconds = 12;
const unitOfMeasurement = 'deg';
let rotateStepTenthOfSec = 1.2;
const halfMinute = [...document.querySelectorAll('.timer__half-a-minute')];
const rotateStepHalfMinutes = 6;
const intervalForTenthOfSec = 1.2;
const intervalForHalfMinutes = 6;
const secondsPointer = document.querySelector('.pointer--seconds');
const minutesPointer = document.querySelector('.pointer--minutes');
const startButton = document.querySelector('.button--start');
let intervalID = 0;
let rotateInterval = intervalID;
let buttonCounter = 0;
let isCounting = false;
let innerStepForSecondsPointer = 1.2;
let innerStepForMinutesPointer = 6;

const rotateFunction = (array,step,unitMeasurement,interval) => {
    array.forEach((item, index) => {
        item.style.transform = `rotate(${step}${unitMeasurement})`;
        step += interval;
        if (item.classList.contains('timer__one-tenth-of-second')) {
            if (index === 0) {
                item.classList.add('timer__second');
            } 
            if (index % 5 === 0) {
                item.classList.add('timer__half-a-second');
            }
        }
        if (item.classList.contains('timer__half-a-minute')) {
            if (index === 0) {
                item.classList.add('timer__minute');
            } 
            if (index % 2 === 0) {
                item.classList.add('timer__minute');
            }
        }
    });
}

const addingDigits = (array) => {
    let minutesCounter = 0;
    array.forEach((item,index) => {
        if (item.classList.contains('timer__second')) {
            let secondsCounter = index;
            item.innerHTML = `<span class="seconds__content">${secondsCounter}</span>`;
            secondsCounter++;
            if (index === 0) {
                item.innerHTML = `<span class="seconds__content">30</span>`;
            } 
        }
        if (item.classList.contains('timer__five-minute')) {
            minutesCounter += 5;
            item.innerHTML = `<span class="minutes__content">${minutesCounter}</span>`;
        }
    });
}

const rotateReverse = (array) => {
    array.forEach((item) => {
        let rotateReverse = item.parentElement.style.transform;
        const tempArray = rotateReverse.split('');
        let degreeArray = [];
        tempArray.forEach((item,index,tempArr) => {
            let number = +item;
            if (!isNaN(number)) {
                if (item[index] !== tempArr.length - 1) {
                    item = +item;
                    degreeArray.push(item);
                }
            }
        });
        if (item.classList.contains('seconds__content')) {
            degreeArray.splice(degreeArray.length - 1, 0, '.');
            let rawDegree = degreeArray.join('');
            let degree = +rawDegree;
            item.style.transform = `rotate(${(-1) * degree}${unitOfMeasurement})`;
        }
        if (item.classList.contains('minutes__content')) {
            let rawDegree = degreeArray.join('');
            let degree = +rawDegree;
            item.style.transform = `rotate(${(-1) * degree}${unitOfMeasurement})`;
        }
    });
}

const rotatePointer = () => {
    rotateInterval++;
    console.log(rotateInterval);
    secondsPointer.style.transform = (`rotate(${innerStepForSecondsPointer}deg)`);
    innerStepForSecondsPointer += 1.2;
    if (rotateInterval % 600 === 0) {
        minutesPointer.style.transform = `rotate(${innerStepForMinutesPointer}deg)`;
        innerStepForMinutesPointer += intervalForHalfMinutes;
    }
}

rotateFunction(tenthOfSecond,rotateStepTenthOfSec,unitOfMeasurement, intervalForTenthOfSec);

tenthOfSecond.forEach((item,index) => {
    if (index % 10 === 0) {
        item.classList.add('timer__second');
    }
});

halfMinute.forEach((item,index) => {
    index = index + 1;
    if (index % 5 === 0) {
        item.classList.add('timer__five-minute');
    }
});

const seconds = [...document.querySelectorAll('.timer__second')];
const minutes = [...document.querySelectorAll('.timer__five-minute')];

addingDigits(seconds);
addingDigits(minutes);

const secondsContent = [...document.querySelectorAll('.seconds__content')];
const minutesContent = [...document.querySelectorAll('.minutes__content')];

rotateReverse(secondsContent);


rotateFunction(halfMinute, rotateStepHalfMinutes,unitOfMeasurement,intervalForHalfMinutes);
rotateReverse(minutesContent);


startButton.addEventListener('click', () => {
    buttonCounter++;
    if (!isCounting && buttonCounter === 1) {
        intervalID = setInterval(rotatePointer, 100);
        isCounting = true;
    } else if (buttonCounter === 2) {
        clearInterval(intervalID);
        console.log('CLEAR');
    } else if (buttonCounter === 3) {
        secondsPointer.style.transform = '';
        minutesPointer.style.transform = '';
        innerStepForSecondsPointer = 1.2;
        buttonCounter = 0;
        isCounting = false;
    }
});