import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const dateInput = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const daysField = document.querySelector('span[data-days]');
const hoursField = document.querySelector('span[data-hours]');
const minutesField = document.querySelector('span[data-minutes]');
const secondsField = document.querySelector('span[data-seconds]');
let timerId = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0] <= new Date()) {
        btnStart.setAttribute('disabled', '');
        Notiflix.Notify.failure("Please choose a date in the future");
      } else {
        btnStart.removeAttribute('disabled');
      }
    },
  };

flatpickr(dateInput, options);

btnStart.addEventListener(`click`, startHandleClick);

function startHandleClick(){

  timerId = setInterval(() => makeTimer(), 1000);

  function makeTimer() {
    // текущая дата
    const currentDate = new Date();
    
    // введеная дата
    const inputDate = Date.parse(dateInput.value);

    // разница между текущей и введеной датой
    const diffDate = inputDate - currentDate; 
    
    if (diffDate > 0) { 
      // добавляем в код HTML
      addDateToHtml (convertMs(diffDate));
    } else {
      // cнимаем интервал
      clearInterval(timerId);
    }
  }
}

// функция конвертации времени - возвращает объект 
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

// функция добавления времени в код HTML
function addDateToHtml ({ days, hours, minutes, seconds }) {
  daysField.textContent = addLeadingZero(days);
  hoursField.textContent = addLeadingZero(hours);
  minutesField.textContent = addLeadingZero(minutes);
  secondsField.textContent = addLeadingZero(seconds);
}; 

// добавляем ноль спереди цифры
function addLeadingZero(number){
  return String(number).padStart(2, 0);
};






