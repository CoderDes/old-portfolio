const input = document.querySelector('.field');
const add = document.querySelector('.button');
const showHide = document.querySelector('.radiobutton');
const ul = document.querySelector('.list');

//добавление в DOM из localStorage
if(localStorage.length > 0) {
    ul.classList.remove('hidden');
    for(let i = 0; i < localStorage.length; i++) {
        const li = document.createElement('li');
        ul.appendChild(li);
        const item = localStorage[`item-${i}`];
        let itemArray = item.split(',');
        //добавление текста в таску
        ul.children[i].textContent = itemArray[0];
        //добавление любого количества классов
        for(let z = 1; z < itemArray.length; z++) {
            li.classList.add(itemArray[z]);
        }
    }

    ulArray = [...ul.children];
    //навешиваем обработчик на каждый элемент списка
    ulArray.forEach((item) => {
        item.addEventListener('click', (e) => {
            item.classList.toggle('done');
            if(item.hasAttribute('hidden-mode')) {
                item.classList.add('hidden');
            }
            //делаем массив из коллекции dom элементов
            let collection = [...ul.children];
            let currentElem = e.target;
            let currentIndex;
            //достаю индекс элемента, по которому кликаем
            collection.forEach((item, index) => {
                if(item === currentElem) {
                    currentIndex = index;
                }
            });
            //записываю класс done в свойства объекта localStorage
            //проходимся по коллекции эл-в и обращаемся к текущему эл-ту
            for(let i = 0; i <= collection.length; i++) {
                if(i === currentIndex) {
                    //если у него есть класс done, то записываем его в localStorage
                    if(collection[i].classList.contains('done')) {
                        let content = localStorage[`item-${i}`];
                        content += ',done';
                        localStorage[`item-${i}`] = content;
                    } else {
                        //если нет done, то удаляем из localStorage
                        let content = localStorage[`item-${i}`];
                        content = content.slice(0,-5);
                        localStorage[`item-${i}`] = content;
                    }
                }
            }    
        });
    });   
}


class todoList {
    constructor() {
        
    }
    
    add() {
        console.log('add method is working');

        let li = document.createElement('li');
        ul.appendChild(li);
        li.textContent = input.value;
        li.classList.add('list-item');
        li.addEventListener('click', (e) => {
            li.classList.toggle('done');
            if(li.hasAttribute('hidden-mode')) {
                li.classList.add('hidden');
            }
            //добавить атрибут триггер на время события, по которому
            //цикл будет обращаться только к этому элементу
            //а на последней иттерации этот атрибут удалим
            let collection = [...ul.children];
            let currentElem = e.target;
            let currentIndex;
            //достаю индекс элемента, по которому кликаем
            collection.forEach((item, index) => {
                if(item === currentElem) {
                    currentIndex = index;
                }
            });
            //записываю класс done в свойства объекта localStorage
            //проходимся по коллекции эл-в и обращаемся к текущему эл-ту
            for(let i = 0; i <= collection.length; i++) {
                if(i === currentIndex) {
                    //если у него есть класс done, то записываем его в localStorage
                    if(collection[i].classList.contains('done')) {
                        let content = localStorage[`item-${i}`];
                        content += ',done';
                        localStorage[`item-${i}`] = content;
                    } else {
                        //если нет done, то удаляем из localStorage
                        let content = localStorage[`item-${i}`];
                        content = content.slice(0,-5);
                        localStorage[`item-${i}`] = content;
                    }
                }
            }    
        });
        //добавление в localStorage
        for(let i = 0; i < ul.children.length; i++) {
            if(i === ul.children.length - 1) {
                const text = ul.children[i].textContent;
                const {value} = ul.children[i].classList;
                let content = `${text},${value}`;
                localStorage[`item-${i}`] = content;
            }
        }
        //очистка инпута
        input.value = '';
    }

    switchMode() {
        const li = ul.querySelectorAll('li');
        
        li.forEach(item => {
            if(item.hasAttribute('hidden-mode')) {
                item.removeAttribute('hidden-mode');
            } else {
                item.setAttribute('hidden-mode','enable');
            }
            if(item.classList.contains('done') && item.hasAttribute('hidden-mode')) {
                item.classList.add('hidden');
            } else if(item.classList.contains('done') && !item.hasAttribute('hidden-mode')) {
                item.classList.remove('hidden');
            }
        });
    }
}

let list = new todoList;

//обработчик события на кнопку Add
add.addEventListener('click', (e) => {
    e.preventDefault();
    ul.classList.remove('hidden');
    list.add();
});

let isHidden = false;
//обработчик события на кнопку Show/Hide
showHide.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('show/hide is working');
    list.switchMode();
    isHidden = true;
    // console.log(localStorage);
    // localStorage.hiddenMode = 1;
});