// (() => {
//   const script = document.querySelector('script');

//   const create = (parent, newElement, beforeElement, deepness) => {
//     console.log(deepness);
//     if (deepness === 0) {
//         console.log('basis');
//         return;
//     }
    
//     const createdElement = document.createElement(newElement);

//     parent.insertBefore(createdElement, beforeElement);
//     deepness--;
//     create(createdElement, 'div', null, deepness);
//   }

//   create(document.body, 'div', script, 2);
// })();

(() => {
  const script = document.querySelector('script');
  const outerDiv = document.createElement('div');
  const innerDiv = document.createElement('div');
  const iframe = document.createElement('iframe');
  document.body.style.margin = '0px';
  document.body.querySelector('p').style.margin = '0px';

  iframe.src = 'frame/index.html';
  iframe.frameborder = '0';

  document.body.insertBefore(outerDiv, script);
  outerDiv.appendChild(innerDiv);
  innerDiv.appendChild(iframe);

  outerDiv.style.width = '100%';
  outerDiv.style.height = '25%';
  outerDiv.style.position = 'fixed';
  outerDiv.style.bottom = '0px';
  outerDiv.style.left = '0px';

  innerDiv.style.width = '100%';
  innerDiv.style.height = '100%';

  iframe.style.width = '100%';
  iframe.style.height = '100%';
})();
  
  