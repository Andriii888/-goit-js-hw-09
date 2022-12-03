import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');


formRef.addEventListener('submit', (e) => {
  e.preventDefault();
  
  let  delay = Number(e.target.delay.value);
  for (let i = 1; i <= e.target.amount.value; i += 1) {
   let position = i;
    delay += Number(e.target.step.value);
 
  createPromise(position, delay).then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    })
  }
});

function createPromise(position, delay) {
     return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    const timerId = setInterval(() => {
      if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject({ position, delay })
      }
    }, delay);
     })
  };
  

