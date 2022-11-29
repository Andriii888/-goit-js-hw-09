import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const inputForTimeRef = document.querySelector('#datetime-picker');
const startBtnref = document.querySelector('button[data-start]');
const timerTextDaysRef = document.querySelector('[data-days]');
const timerTextHoursRef = document.querySelector('[data-hours]');
const timerTextMinutesRef = document.querySelector('[data-minutes]');
const timerTextSecondsRef = document.querySelector('[data-seconds]');


startBtnref.disabled = true;

let timer = null;
let currentTime = Date.now();

// setInterval(() => { console.log(currentTime) }, 1000);
let selectedTime = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const timeInMSeconds =new Date(selectedDates[0]).getTime();
    if (timeInMSeconds <= currentTime) {
      window.alert("Please choose a date in the future");
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
      return clearInterval(timer);
    }
    
    const { days, hours, minutes, seconds } = convertMs(timerTime);
    timerTextDaysRef.textContent= `${days}`;
    timerTextHoursRef.textContent= `${hours}`;
    timerTextMinutesRef.textContent= `${minutes}`;
    timerTextSecondsRef.textContent= `${seconds}`;


  }, 1000)
};

flatpickr(inputForTimeRef, options);

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