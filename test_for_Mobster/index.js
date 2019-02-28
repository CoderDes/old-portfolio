(() => {
  const script = document.querySelector('script');
  const outerDiv = document.createElement('div');
  const innerDiv = document.createElement('div');
  const iframe = document.createElement('iframe');
  const iframeStyles = `opacity: 1 !important; 
                        width: 100% !important;
                        height: 100% !important`;
  const outerDivStyles = `position: fixed !important; 
                          bottom: 0px;
                          width: 100%;
                          height: 25%;
                          margin: 0px !important`;
  const innerDivStyles = `width: 100%;
                          height: 100%;
                          margin: 0px !important;`

  iframe.src = 'frame/index.html';
  iframe.frameborder = '0';

  document.body.insertBefore(outerDiv, script);
  outerDiv.appendChild(innerDiv);
  innerDiv.appendChild(iframe);

  outerDiv.setAttribute('style', outerDivStyles);
  innerDiv.setAttribute('style', innerDivStyles);

  iframe.setAttribute('style', iframeStyles);
})();
  
  