import throttle from 'lodash.throttle';

const formRef = document.querySelector('form');

let data = {};
const parsedData = JSON.parse(localStorage.getItem('feedback-form-state'));

if (parsedData) {
  const keys = Object.keys(parsedData);
  keys.forEach(key => {
    const input = formRef.elements[key];
    input.value = parsedData[key];
  });
}

const inputHandler = e => {
  const { name, value } = e.target;
  data = {
    ...data,
    [name]: value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(data));
};

const submitHandler = e => {
  e.preventDefault();

  const form = e.currentTarget;
  const formData = new FormData(form);
  const finalData = {};
  const entries = formData.entries();

  for (const [name, value] of entries) {
    if (!value) {
      console.log('Fill in all fields!');
      return;
    }
    finalData[name] = value;
  }
  console.log(finalData);

  localStorage.removeItem('feedback-form-state');
  form.reset();
  data = {};
};

formRef.addEventListener('input', throttle(inputHandler, 500));
formRef.addEventListener('submit', submitHandler);
