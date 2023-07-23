const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyElem = document.querySelector('body');
let timerId = null;

// рандомайзер для цветов
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

// функция добавления цветов в HTML
function addColor() {
  const randomColor = getRandomHexColor();
  bodyElem.style.backgroundColor = randomColor;
}

// вешаем слушателей на кнопки
startBtn.addEventListener(`click`, startHandleClick);
stopBtn.addEventListener(`click`, stopHandleClick);

// функция кнопки start
function startHandleClick() {
  timerId = setInterval(() => addColor(), 1000);
  startBtn.setAttribute('disabled', '');
}

// функция кнопки stop
function stopHandleClick() {
  clearInterval(timerId);
  startBtn.removeAttribute('disabled');
}
