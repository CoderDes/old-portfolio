// Main
const $main = document.querySelector('.main-content');
const $header = document.querySelector('.main-content__header');
// List of contacts 
const $contacts = document.querySelector('.contacts');
let contactCardCollection;
let $contactName;
let $contactDescrpt;
let contactCardMenuCollection;
let contactCardMenuBtnCollection;
let $contactCardMenuItem;
// для переменных, которые находятся в <template>, так как в момент загрузки они не видны
setTimeout(() => {
    contactCardCollection = $contacts.getElementsByClassName('contact-card');
    contactCardMenuBtnCollection = $contacts.getElementsByClassName('contact-card__menu-btn');
    contactCardMenuCollection = $contacts.getElementsByClassName('contact-card__menu');
    // дублируется
    Array.from(contactCardMenuCollection).forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target.textContent === 'Edit') {
                console.log('this is edit');
                let card = e.target.parentElement.parentElement
                contact.renderFromMenu(card.personLink, card);
            }
        });
    });
    Array.from(contactCardMenuBtnCollection).forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(e.target);
            if (e.target.tagName === 'svg' ||  e.target === item) {
                item.parentElement.querySelector('.contact-card__menu').classList.remove('hidden');
            }
        });
    });
},50);
// Add-edit contact form
const $contactForm = document.querySelector('.contact-form');
const $firstName = $contactForm.querySelector('[name="fistname"]');
const $lastName = $contactForm.querySelector('[name="surname"]');
const $description = $contactForm.querySelector('[name="description"]');
const $phone = $contactForm.querySelector('[name="phone"]');
const $email = $contactForm.querySelector('[name="email"]');
const $bDay = $contactForm.querySelector('[name="bday"]');
const $info = $contactForm.querySelector('[name="info"]');
const $instagram = $contactForm.querySelector('[name="instagram"]');
const $facebook = $contactForm.querySelector('[name="facebook"]');
const $saveButton = $contactForm.querySelector('.contact-form__button--main');
const $deleteButton = $contactForm.querySelector('.contact-form__button--second');
const $avatar = $contactForm.querySelector('[name="avatar"]');
const $closeFormBtn = $contactForm.querySelector('.contact-form__close-button');
// Sidebar
const $sidebar = document.querySelector('.sidebar');
const $userAvatar = $sidebar.querySelector('.user__avatar');
const $userName = $sidebar.querySelector('.user__name');
const $logOut = $sidebar.querySelector('.user__log-out');
const $userMenu = $sidebar.querySelector('.user__menu');
const $search = $sidebar.querySelector('.search__input');
const $sideMenu = $sidebar.querySelector('.side-menu');
const $categoryList = $sideMenu.querySelector('.groups-list');
const $createContact = $sidebar.querySelector('.create-contact__button');
const $birthdayList = $sidebar.querySelector('.side-menu__item--birthday');
// Contact full view
const $contactViewMenu = document.querySelector('.contact-view');
const $contactViewName = $contactViewMenu.querySelector('[name="firstname"]');
const $contactViewSurname = $contactViewMenu.querySelector('[name="surname"]');
const $contactViewDescrpt = $contactViewMenu.querySelector('[name="description"]');
const $contactViewPhone = $contactViewMenu.querySelector('[name="phone"]');
const $contactViewClose = $contactViewMenu.querySelector('.contact-view__close-button');
const $contactViewEdit = $contactViewMenu.querySelector('.contact-view__edit-button');
// Card template
const $template = document.getElementById('card-template');
// Select category
const $category = $contactForm.querySelector('[name="category"]');
const $categoryAll = $category.querySelector('[value="All Contacts"]');
const $categoryFamily = $category.querySelector('[value="Family"]');
const $categoryFriends = $category.querySelector('[value="Friends"]');
const $categoryWork = $category.querySelector('[value="Work"]');
let editFlag = false;

class GlobalCollection extends Array {
    constructor() {
        super();
    }

    load() {
        console.log('load works');
        if (localStorage.length === 1) {
            const contactsFromStorage = JSON.parse(localStorage.getItem('contacts'));
            contactsFromStorage.forEach(item => {
                globalCollection.push(item);
            });
        }
    }

    save(globalCollection) {
        localStorage.setItem('contacts', JSON.stringify(globalCollection));
    }

    render() {
        globalCollection.forEach(item => {
            contact.appendNew(item);
        });
    }

    clearAllCardInDOM() {
        Array.from(contactCardCollection).forEach(item => {
            item.parentElement.removeChild(item);
        });
    }

    appendCertainCategoryCards(array) {
        array.forEach(item => {
            contact.appendNew(item);
        });
    }

    birthday() {
        const currentDate = new Date();   // текущая дата
        // функция переформатирования даты для поиска и сравнения с данными персоны
        const convertingCurrentDate = (inputDate) => {
            let outputDate = JSON.stringify(inputDate).slice(1,11).replace('-','/').replace('-','/');
            let month = outputDate.slice(5,7);
            let day = outputDate.slice(8);
            outputDate = `${month}.${day}`;
            return outputDate;
        } 
        // приводит строку currentDate в удобный форма месяц.число (string)
        const currentDateNumber = +convertingCurrentDate(currentDate);    // текущая дата в формате месяц.число (number)
        console.log(currentDateNumber);
        // проходим по globalCollection и сверяем дни рождения персон с текущей
        globalCollection.forEach(item => {
            const month = item.birthday.slice(0,2); // вытягиваем месяц (string)
            const day = item.birthday.slice(3,5);   // вытягиваем день (string)
            const personsBirthdayDate = +`${month}.${day}`;   // преобразуем в число в формат месяц.число
            // проверяем у кого день рождения завтра
            if (currentDateNumber === +(personsBirthdayDate - 0.01).toFixed(2)) {
                console.log('if is working');
                console.log(item);
                let listItem = document.createElement('LI');
                listItem.classList.add('side-menu__item');
                listItem.textContent = `tomorrow ${item.name}'s ${item.surname} birthday!`;
                $birthdayList.appendChild(listItem);
            }
            if (currentDateNumber === +personsBirthdayDate.toFixed(2)) {
                let listItem = document.createElement('LI');
                listItem.classList.add('side-menu__item');
                listItem.textContent = `today ${item.name}'s ${item.surname} birthday!`;
                $birthdayList.appendChild(listItem);
            }
        });
    }

    initialize() {
        document.addEventListener('DOMContentLoaded', this.load());
        document.addEventListener('DOMContentLoaded', this.render());
        $createContact.addEventListener('click', (e) => {
            $contacts.classList.add('hidden');
            $contactForm.classList.remove('hidden');
        });

        $saveButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (editFlag === false) {
                contact.create();
            } else {
                contact.removeOld(temporaryEditPerson);
                contact.edit(temporaryEditPerson);
                globalCollection.save(globalCollection);
                editFlag === false;
                $contactViewMenu.classList.add('hidden');
                $contactForm.classList.add('hidden');
                $contacts.classList.remove('hidden');
                contact.appendNew(temporaryEditPerson);
            }
        });

        $deleteButton.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('this is delete');
            contact.delete(temporaryEditPerson);
            editFlag = false;
            $contacts.classList.remove('hidden');
            $contactForm.classList.add('hidden');
        });

        $contactViewClose.addEventListener('click', (e) => {
            e.preventDefault();
            $contactViewMenu.classList.add('hidden');
            $contacts.classList.remove('hidden');
        });

        $closeFormBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('close is working');
            $contactForm.classList.add('hidden');
            $contacts.classList.remove('hidden');
        });

        $main.addEventListener('click', (e) => {
            if (e.target === $contacts) {
                Array.from(contactCardMenuCollection).forEach(item => {
                    if (item.classList.contains('hidden') === false) {
                        item.classList.add('hidden');
                    }
                });
            }
        });

        $categoryList.addEventListener('click', (e) => {
            console.log('this is category list');
            let targetCategoryCollection;
            // очистка всех контактов в ДОМ, чтобы добавить только нужные категории
            globalCollection.clearAllCardInDOM();
            if (e.target.textContent === 'All Contacts') {
                console.log('this is All contacts');
                globalCollection.forEach(item => {
                    contact.appendNew(item);
                });
            }
            if (e.target.textContent === 'Family') {
                console.log('this is Family');
                targetCategoryCollection = globalCollection.filter((elem) => {
                    return elem.category === 'Family';
                });
                this.appendCertainCategoryCards(targetCategoryCollection);
            }
            if (e.target.textContent === 'Friends') {
                console.log('this is Friends');
                targetCategoryCollection = globalCollection.filter((elem) => {
                    return elem.category === 'Friends';
                });
                this.appendCertainCategoryCards(targetCategoryCollection);
            }
            if (e.target.textContent === 'Work') {
                console.log('this is Work');
                targetCategoryCollection = globalCollection.filter((elem) => {
                    return elem.category === 'Work';
                });
                this.appendCertainCategoryCards(targetCategoryCollection);
            }
        });

        $search.addEventListener('keyup', (e) => {
            console.log($search.value);
            globalCollection.forEach(item => {
                if ($search.value === item.name) {
                    globalCollection.clearAllCardInDOM();
                    globalCollection.forEach(item => {
                        if ($search.value === item.name) {
                            contact.appendNew(item);
                        }
                    });
                }
                if ($search.value === item.surname) {
                    globalCollection.clearAllCardInDOM();
                    globalCollection.forEach(item => {
                        if ($search.value === item.surname) {
                            contact.appendNew(item);
                        }
                    });
                }
                if ($search.value === `${item.name} ${item.surname}`) {
                    globalCollection.clearAllCardInDOM();
                    contact.appendNew(item);
                }
                if ($search.value === '') {
                    globalCollection.clearAllCardInDOM();
                    globalCollection.forEach(item => {
                        contact.appendNew(item);
                    });
                }
            });
        });
    }
}

class Contact extends Object {
    constructor() {
        super();
    }
    
    // каждый контакт может хранить в своём свойстве ссылку на ДОМ элемент
    create() {
        console.log('create works');
        const contact = new Contact; //для использования методов Contact внутри слушателя события
        contact.name = $firstName.value;
        contact.surname = $lastName.value;
        contact.description = $description.value;
        contact.phone = $phone.value;
        contact.category = $category.value;
        contact.email = $email.value;
        contact.birthday = $bDay.value;
        contact.info = $info.value;
        contact.instagram = $instagram.value;
        contact.facebook = $facebook.value;
        contact.forSearch = `${contact.name} ${contact.surname}`;
        globalCollection.push(contact); //добавление в глобальную коллекцию
        globalCollection.save(globalCollection); 
        $contactForm.classList.add('hidden');
        contact.clearForm() // очищение формы 
        contact.appendNew(contact);
        // const contact = this; //для использования методов Contact внутри слушателя события
    }

    delete(person) {
        // удаление в globalCollection и localStorage
        globalCollection.forEach((item,index) => {
            if (item === person) {
                globalCollection.splice(index,1);
                globalCollection.save(globalCollection);
            }
        });
        // удаление в ДОМ
        console.log(contactCardCollection);
        Array.from(contactCardCollection).forEach(item => {
            if (item.personLink.name === person.name &&
                item.personLink.surname === person.surname) {
                item.parentElement.removeChild(item);
            }
        });
    }

    // заменить temporaryEditPerson на card.personLink ?
    renderFromMenu(person, card) {
        $contactViewMenu.classList.add('hidden');
        $contactForm.classList.remove('hidden');
        $contacts.classList.add('hidden');
        $firstName.value =  person.name;
        $lastName.value = person.surname;
        $description.value = person.description;
        $phone.value = person.phone;
        $category.value = person.category;
        $email.value = person.email;
        $bDay.value = person.birthday;
        $info.value = person.info;
        $instagram.value = person.instagram;
        $facebook.value = person.facebook;
        temporaryEditPerson = person;
        editFlag = true;
    }

    removeOld(target) {
        Array.from(contactCardCollection).forEach(item => {
            if (item.personLink.name === target.name &&
                item.personLink.surname === target.surname) {
                $contacts.removeChild(item);
            }
        });
    }

    edit(person) {
        console.log('edit is working');
        console.log('this in edit', person);
        // редактирование существующих данных
        const initialName = `${person.name} ${person.surname}`;
        person.name = $firstName.value;
        person.surname = $lastName.value;
        person.description = $description.value;
        person.phone = $phone.value;
        person.category = $category.value;
        person.email = $email.value;
        person.birthday = $bDay.value;
        person.info = $info.value;
        person.instagram = $instagram.value;
        person.facebook = $facebook.value;
        globalCollection.forEach(item => {
            if (item.forSearch === initialName) {
                console.log('this is search item',item);
                console.log('this is new person', person);
                item.name = person.name;
                item.surname = person.surname;
                item.description = person.description ;
                item.phone = person.phone;
                item.category = person.category;
                item.email =  person.email;
                item.birthday = person.birthday;
                item.info = person.info;
                item.instagram = person.instagram;
                item.facebook = person.facebook;
            }
        });
    }

    clearForm() {
        $firstName.value = '';
        $lastName.value = '';
        $description.value = '';
        $phone.value = '';
        $category.value = '';
        $email.value = '';
        $bDay.value = '';
        $info.value = '';
        $instagram.value = '';
        $facebook.value = '';
    }


    // добавление карточки в ДОМ
    appendNew(person) {
        $contacts.classList.remove('hidden');
        const templateContentClone = document.getElementById('card-template').content.cloneNode(true);
        templateContentClone.querySelector('.contact-card__name').textContent = `${person.name} ${person.surname}`;
        templateContentClone.querySelector('.contact-card__description').textContent = person.description;
        const card = templateContentClone.querySelector('.contact-card__btn');
        card.addEventListener('click', (e) => {
            $contactViewMenu.classList.remove('hidden');
            $contacts.classList.add('hidden');
            this.renderProfile(person);
        });
        // в ДОМ элементе ссылка на персону
        templateContentClone.querySelector('.contact-card').personLink = person;
        $contacts.appendChild(templateContentClone);
        //
        contactCardCollection = $contacts.getElementsByClassName('contact-card');
        contactCardMenuBtnCollection = $contacts.getElementsByClassName('contact-card__menu-btn');
        contactCardMenuCollection = $contacts.getElementsByClassName('contact-card__menu');
        Array.from(contactCardMenuBtnCollection).forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                console.log(e.target);
                if (e.target.tagName === 'svg' ||  e.target === item) {
                    item.parentElement.querySelector('.contact-card__menu').classList.remove('hidden');
                }
            });
        });
        // 
        Array.from(contactCardMenuCollection).forEach(item => {
            item.addEventListener('click', (e) => {
                let card = e.target.parentElement.parentElement;
                if (e.target.textContent === 'Edit') {
                    console.log('this is edit');
                    contact.renderFromMenu(card.personLink, card);
                }
                if (e.target.textContent === 'Delete') {
                    console.log('this is delete');
                    contact.delete(card.personLink, card);
                }
            });
        });
    }

    renderProfile(person) {
        console.log('render is working');
        console.log('this is this in render', person);
        $contactViewName.textContent = person.name;
        $contactViewSurname.textContent = person.surname;
        $contactViewDescrpt.textContent = person.description;
        $contactViewPhone.textContent = person.phone;
        $contactViewEdit.addEventListener('click', (e) => {
            e.preventDefault();
            editFlag = true;
            // заполнение формы уже существующими данными
            $contactViewMenu.classList.add('hidden');
            $contactForm.classList.remove('hidden');
            $firstName.value =  person.name;
            $lastName.value = person.surname;
            $description.value = person.description;
            $phone.value = person.phone;
            $category.value = person.category;
            $email.value = person.email;
            $bDay.value = person.birthday;
            $info.value = person.info;
            $instagram.value = person.instagram;
            $facebook.value = person.facebook;
            temporaryEditPerson = person;
        });
        // возвращает ДОМ элемент конкретно этого контакта и добавляет его в общий список
        // создаётся ДОМ элемент и навешиваются обработчики событий
    }
}

const contact = new Contact;
const globalCollection = new GlobalCollection;
let temporaryEditPerson;
globalCollection.initialize();
globalCollection.birthday();