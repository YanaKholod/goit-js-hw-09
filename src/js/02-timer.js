import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const pickerText = document.querySelector('#datetime-picker');
const timerForm = document.querySelector('.timer');
const startBtn = document.querySelector('button[data-start]');
const dataSeconds = document.querySelector('span[data-seconds]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataHours = document.querySelector('span[data-hours]');
const dataDays = document.querySelector('span[data-days]');

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(pickerText, options);

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

function zeroAhead(value) {
  return value.toString().padStart(2, '0');
}

startBtn.addEventListener('click', () => {
  let timer = setInterval(() => {
    let dataValue = new Date(pickerText.value) - new Date();
    startBtn.disabled = true;

    if (dataValue >= 0) {
      let convertedValue = convertMs(dataValue);
      dataDays.textContent = zeroAhead(convertedValue.days);
      dataHours.textContent = zeroAhead(convertedValue.hours);
      dataMinutes.textContent = zeroAhead(convertedValue.minutes);
      dataSeconds.textContent = zeroAhead(convertedValue.seconds);

      if (dataValue <= 10000) {
        timerForm.style.color = 'red';
      }
    } else {
      Notiflix.Notify.success('Countdown finished');
      timerForm.style.color = 'black';
      clearInterval(timer);
    }
  }, 500);
});
