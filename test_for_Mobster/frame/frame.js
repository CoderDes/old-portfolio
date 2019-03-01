const $content = document.querySelector('.image-block');
const initialScreenWidth = screen.width;

$content.style.backgroundImage = 'url("./pics/landscape.png")';

if (initialScreenWidth <= 768) {
  $content.style.backgroundImage = 'url("./pics/portrait.png")';
}

window.addEventListener('resize', () => {
  const width = screen.width;
  $content.style.backgroundImage = 'url("./pics/landscape.png")';

  if (width <= 768) {
    $content.style.backgroundImage = 'url("./pics/portrait.png")'; 
  }
});