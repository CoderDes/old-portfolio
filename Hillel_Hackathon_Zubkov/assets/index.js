const randomJokeButton = document.querySelector('.button');
const jokeArea = document.querySelector('.joke');
const categoryList = document.querySelector('.menu');
const categoriesJokesCaller = (e) => {
    const categoryName = e.target.textContent.trim();

    fetch(`https://api.chucknorris.io/jokes/random?category=${categoryName}`)
        .then(response => response.json())
        .then(result => {
            jokeArea.textContent = result.value;
        });
}

randomJokeButton.addEventListener('click', () => {
    fetch('https://api.chucknorris.io/jokes/random')
    .then(response => response.json())
    .then(result => {
        jokeArea.textContent = result.value;
    });
});

categoryList.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.tagName === 'A') {
        categoriesJokesCaller(e);
    }
});

window.addEventListener('keyup', (e) => {
    if (e.key === 'r') {
        categoriesJokesCaller(e);
    }
});