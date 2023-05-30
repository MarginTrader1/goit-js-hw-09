import Notiflix from 'notiflix';

const formElem = document.querySelector('.form');

formElem.addEventListener(`submit`, clickBtnCreatePromise);

function clickBtnCreatePromise(event) {
  event.preventDefault();

  const delay = Number(event.target.elements.delay.value);
  const step = Number(event.target.elements.step.value);
  const amount = Number(event.target.elements.amount.value);

// функции для успешного выполнения промиса
const onSuccess = ({ position, delay }) => {
  Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
  console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
};

// функция для неуспешного выполнения промиса
const onFailure = ({ position, delay }) => {
  Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
  console.log(`❌ Rejected promise ${position} in ${delay}ms`);
};

// цикл создания промисов
for (const i of Array(amount).keys()) {
  createPromise(i + 1, delay + step * i)
    .then(({ position, delay }) => onSuccess({ position, delay }))
    .catch(({ position, delay }) => onFailure({ position, delay }));
}}


// функция createPromise, принимает position - позиция промиса та delay - задержка перед исполнением промиса.
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  console.log(`Creating promise ${position} with delay ${delay}ms`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}