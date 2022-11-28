const refs = {
    bodyRef: document.querySelector('body'),
    btnStartRef: document.querySelector('[data-start]'),
    btnStopRef: document.querySelector('[data-stop]'),

};
refs.btnStartRef.addEventListener('click', onStartBtn);
refs.btnStopRef.addEventListener('click', onStopBtn);
let timerId = null;

function onStartBtn() {
    timerId = setInterval(changeBodyColor, 1000);
    refs.btnStartRef.disabled = true;
};
 
function onStopBtn() { 
    refs.btnStartRef.disabled = false;
    clearInterval(timerId);

};

function changeBodyColor() {
   let color = getRandomHexColor();
   return refs.bodyRef.style.backgroundColor = `${color}`;
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
