const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('[name="email"]');
const messageInput = form.querySelector('[name="message"]');

const updateLocalStorage = () => {
  const currentState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(currentState));
};

const fillFormFields = () => {
  const savedState = JSON.parse(localStorage.getItem('feedback-form-state')) || {};
  emailInput.value = savedState.email || '';
  messageInput.value = savedState.message || '';
};

emailInput.addEventListener('input', updateLocalStorage);
messageInput.addEventListener('input', updateLocalStorage);

window.addEventListener('load', fillFormFields);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (emailInput.value && messageInput.value) {
    const currentState = {
      email: emailInput.value,
      message: messageInput.value,
    };
    console.log(currentState);
    emailInput.value = '';
    messageInput.value = '';
    localStorage.removeItem('feedback-form-state');
  } else {
    alert('Увага! Всі поля форми мають бути заповнені!');
  }
});
