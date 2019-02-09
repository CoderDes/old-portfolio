const input = document.querySelector('.field');
const calc = document.querySelector('.button');
const list = document.querySelector('.list');
const currencySelect = document.querySelector('.currency');
const sellButton = document.getElementById('sell');
const buyButton = document.getElementById('buy');
const buyСoefficient = 0.8;
let functionCounter = 0;        // defines a behaviour of append()
let temporaryOption;

// function, that adds dom-elements
const append = (value, currencyValue, currencyType) => {
    if (functionCounter > 0) {
        const removeElem = list.querySelector('li');
        const li = document.createElement('li');
        li.classList.add('list-item');
        li.textContent = `${currencyValue} ${currencyType} = ${value} UAH`;
        list.replaceChild(li, removeElem);
        functionCounter++;
    } else {
        const li = document.createElement('li');
        li.classList.add('list-item');
        li.textContent = `${currencyValue} ${currencyType} = ${value} UAH`;
        list.appendChild(li);
        functionCounter++;
    }    
}

const output = (calcResult, value, typeOfCurrency) => {
    if (!isNaN(calcResult)) {
        append(calcResult,value,typeOfCurrency);
    }
}

const calculator = function(currencyType,currencyRate) {

    if (sellButton.checked === true && buyButton.checked === false) {
        let inputVal = +input.value; 
        let result = inputVal * currencyRate; 
        output(result, inputVal, currencyType);
    } else if (buyButton.checked === true && sellButton.checked === false) {
        let inputVal = +input.value;
        const result = ((inputVal * currencyRate) * buyСoefficient).toFixed(2);
        output(result, inputVal, currencyType);
    }
}

currencySelect.addEventListener('click', e => {
    const arr = [...currencySelect.children]
    const option = arr.find(item => {
        return item.currencyType === e.target.value;
    });
    temporaryOption = option; // global variable for other functions
    const currencyType = option.currencyType;
    const currencyRate = option.currencyRate;
    calculator(currencyType,currencyRate);
});


input.addEventListener('keyup', e => {
    e.preventDefault();
    const currencyType = temporaryOption.currencyType;
    const currencyRate = temporaryOption.currencyRate;
    calculator(currencyType,currencyRate);
});

sellButton.addEventListener('click', () => {
    buyButton.checked = false;
    const currencyType = temporaryOption.currencyType;
    const currencyRate = temporaryOption.currencyRate;
    calculator(currencyType,currencyRate);
});

buyButton.addEventListener('click', () => {
    sellButton.checked = false;
    const currencyType = temporaryOption.currencyType;
    const currencyRate = temporaryOption.currencyRate;
    calculator(currencyType,currencyRate);
});

const promise = fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
                .then(resultOfPromise => resultOfPromise.json())
                .then(array => {
                    array.forEach(item => {
                        let optionElem = document.createElement('option');
                        optionElem.value = item.cc;
                        optionElem.textContent = item.txt;
                        optionElem.currencyRate = item.rate;
                        optionElem.currencyType = item.cc;
                        currencySelect.appendChild(optionElem);
                    });
                });