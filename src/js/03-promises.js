import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');

let obj = {};
formRef.addEventListener('change', onChangePromise);
function onChangePromise(e) { 
  const name = e.target.name;
  const value = e.target.value;
  obj[name] = value;
      console.log(obj);

};
let time;
let position;
formRef.addEventListener('submit', (e) => {
  e.preventDefault();
  for (let i = 1; i <= obj.amount; i += 1) {
        position = i;
        
        if (i > 1) {
          time = obj.step;
    };
        if (i === 1) {
          time = obj.delay;
    };
     
  createPromise(position, obj.delay).then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    })
  }
});

function createPromise(position, delay) {
  console.log(time);
     return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    const timerId = setInterval(() => {
      if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject({ position, delay })
      }
    }, time);
     })
  };
  

