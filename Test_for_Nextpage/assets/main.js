const $slider = document.querySelector('.slider');
const $sliderButtons = $slider.querySelectorAll('.slider__button');
const $sliderFirstCard = $slider.querySelector('.slider__card');
const cardHeight = window.getComputedStyle($sliderFirstCard).height.replace('px','');
let currentMarginTop = window.getComputedStyle($sliderFirstCard).marginTop.replace('px','');
const $cardButtonPrev = document.querySelectorAll('.card__button--prev');
const $cardButtonNext = document.querySelectorAll('.card__button--next');
const cards = $slider.getElementsByClassName('slider__card');
let slideIndex = 1;
let specialFlag = false;

Array.from(cards).forEach((item,index) => {
    item.id = `0${index+1}`;
});

const specialCase = () => {
    currentMarginTop -= +cardHeight * (slideIndex-1);
    specialFlag = false;
}

const showNextSlide = () => {
    if (slideIndex >= cards.length) {
        return
    }
    if (specialFlag) {
        specialCase();
    }
    slideIndex++;
    currentMarginTop = +currentMarginTop;
    currentMarginTop -= +cardHeight;
    $sliderFirstCard.style.marginTop = `${currentMarginTop}px`;
}

const showPrevSlide = () => {
    if (slideIndex <= 1) {
        return
    }
    if (specialFlag) {
        specialCase();
    }
    slideIndex--;
    currentMarginTop = +currentMarginTop;
    currentMarginTop += +cardHeight;
    $sliderFirstCard.style.marginTop = `${currentMarginTop}px`;
}

const recoverAllCards = () => {
    Array.from(cards).forEach(item => {
        item.classList.remove('hidden');
    });
}

$sliderButtons.forEach((item,index) => {
    if (item.classList.contains('slider__button--arrow-prev')) {
        item.addEventListener('click',recoverAllCards);
        item.addEventListener('click', showPrevSlide);
    }
    if (item.classList.contains('slider__button--arrow-next')) {
        item.addEventListener('click',recoverAllCards);
        item.addEventListener('click', showNextSlide);
    }
    if (item.classList.contains('btn-clean')) {
        item.addEventListener('click', (e) => {
            let btn = item;
            Array.from(cards).forEach(item => {
                if (item.id !== btn.textContent) {
                    item.classList.add('hidden');
                } else {
                    specialFlag = true;
                    slideIndex = +item.id.replace('0','');
                    item.classList.remove('hidden');
                }
            });
        });
    }
});

$cardButtonPrev.forEach((item,index) => {
    item.addEventListener('click', showPrevSlide);
});

$cardButtonNext.forEach((item,index) => {
    item.addEventListener('click', showNextSlide);
});

