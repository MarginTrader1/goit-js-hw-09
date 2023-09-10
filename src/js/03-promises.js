import Notiflix from 'notiflix';

const formElem = document.querySelector('form');

formElem.addEventListener(`submit`, clickBtnCreatePromise);

function clickBtnCreatePromise(event) {
  event.preventDefault();

  /* получаем массив инпутов и сразу делаем деструктуризацию массива */
  const [delayElem, stepElem, amountElem] =
    document.getElementsByTagName('input');

  // присваиваем значение переменным
  const delay = Number(delayElem.value);
  const step = Number(stepElem.value);
  const amount = Number(amountElem.value);

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
    const shouldResolve = Math.random() > 0.5;

    console.log(`Creating promise ${position} with delay ${delay}ms`);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldResolve) {
          return resolve({ position, delay });
        }
        return reject({ position, delay });
      }, delay);
    });
  }

  for (let i = 0; i < amount; i++) {
    createPromise(i + 1, delay + step * i)
      .then(({ position, delay }) => onSuccess({ position, delay }))
      .catch(({ position, delay }) => onFailure({ position, delay }));
  }
}

// for (const i of Array(amount).keys()) - тот же метод, только создаем массив и перебивраем его
