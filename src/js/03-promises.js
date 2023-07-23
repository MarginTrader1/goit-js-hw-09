import Notiflix from 'notiflix';

const formElem = document.querySelector('.form');

formElem.addEventListener(`submit`, clickBtnCreatePromise);

function clickBtnCreatePromise(event) {
  event.preventDefault();

  const delay = Number(event.target.elements.delay.value);
  const step = Number(event.target.elements.step.value);
  const amount = Number(event.target.elements.amount.value);

  // функции для успешного выполнения промиса
  function onSuccess({ position, delay }) {
    Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  }

  // функция для неуспешного выполнения промиса
  function onFailure({ position, delay }) {
    Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  }

  // функция создания промиса
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

  for (let i = 0; i < amount; i++) {
    createPromise(i + 1, delay + step * i)
      .then(({ position, delay }) => onFailure({ position, delay }))
      .catch(({ position, delay }) => onFailure({ position, delay }));
  }
}

// for (const i of Array(amount).keys()) - тот же метод, только создаем массив и перебивраем его
