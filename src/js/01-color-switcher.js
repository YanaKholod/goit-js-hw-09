const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

stopBtn.disabled = true;
let backgroundColor = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  backgroundColor = setInterval(() => {
    document.body.style.background = getRandomHexColor();
  }, 500);
});

stopBtn.addEventListener('click', () => {
  clearInterval(backgroundColor);
  startBtn.disabled = false;
  stopBtn.disabled = true;
});
