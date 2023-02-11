import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const delay = document.querySelector('input[name="delay"]');
const delayStep = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');
const createBtn = document.querySelector('button[type="submit"]');

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}
createBtn.addEventListener('click', e => {
  e.preventDefault();
  let delayOne = Number(delay.value);
  let delayStepOne = Number(delayStep.value);

  for (let i = 0; i < amount.value; i += 1) {
    createPromise(1 + i, delayOne + i * delayStepOne)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
  form.reset();
});
