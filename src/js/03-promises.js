import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');

let obj = {};
formRef.addEventListener('change', onChangePromise);
function onChangePromise(e) { 
  const name = e.target.name;
  const value = e.target.value;
  obj[name] = value;
  console.log(obj)
};

formRef.addEventListener('submit', createPromise());

function createPromise (position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    const timerId = setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject({ position, delay })
      }
    }, obj.delay);
  })
  
};

createPromise(obj)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });
