import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const inputForTimeRef = document.querySelector('#datetime-picker');
const startBtnref = document.querySelector('button[data-start]');
const timerTextDaysRef = document.querySelector('[data-days]');
const timerTextHoursRef = document.querySelector('[data-hours]');
const timerTextMinutesRef = document.querySelector('[data-minutes]');
const timerTextSecondsRef = document.querySelector('[data-seconds]');


startBtnref.disabled = true;

let timer = null;
let currentTime = Date.now();

let selectedTime = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const timeInMSeconds =new Date(selectedDates[0]).getTime();
    if (timeInMSeconds <= currentTime) {
      Notiflix.Notify.failure('Please choose a date in the future',{timeout: 6000, width: '360px',
    svgSize: '120px',borderRadius: '8px',position: 'center-center',});
    } else {
      startBtnref.disabled = false;
      selectedTime = timeInMSeconds;
        }
    },
};

startBtnref.addEventListener('click', onStartBtn);

function onStartBtn() {
  timer = setInterval(() => {
    let currentTime = new Date();
    let timerTime = selectedTime - currentTime;
    if (timerTime < 0) {
      Notiflix.Notify.failure('Your time is up',{timeout: 6000, width: '460px',
    svgSize: '120px',borderRadius: '8px',position: 'center-center',});
      return clearInterval(timer);

    }

    const { days, hours, minutes, seconds } = convertMs(timerTime);
    timerTextDaysRef.textContent = addLeadingZero(days);
    timerTextHoursRef.textContent = addLeadingZero(hours);
    timerTextMinutesRef.textContent = addLeadingZero(minutes);
    timerTextSecondsRef.textContent = addLeadingZero(seconds);


  }, 1000)
};

flatpickr(inputForTimeRef, options);

function addLeadingZero(value) {
return  String(value).padStart(2, '0');
};

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
}