const form = document.querySelector('.feedback-form');

const KEY = 'feedback-form-state';

let formData = {
  email: '',
  message: '',
};

getStorage();

form.addEventListener('input', inputHandler);
form.addEventListener('submit', submitHandler);

function inputHandler(e) {
  if (e.target.name === 'email' || e.target.name === 'message') {
    formData[e.target.name] = e.target.value.trim();
    localStorage.setItem(KEY, JSON.stringify(formData));
  }
}

function getStorage() {
  const savedFormData = localStorage.getItem(KEY);

  if (!savedFormData) {
    return;
  }

  const { email, message } = form.elements;

  formData = JSON.parse(savedFormData);

  email.value = formData.email;
  message.value = formData.message;
}

function submitHandler(e) {
  e.preventDefault();

  const submittedData = new FormData(e.target);
  formData.email = submittedData.get('email').trim();
  formData.message = submittedData.get('message').trim();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  e.target.reset();
  localStorage.removeItem(KEY);
  formData.email = '';
  formData.message = '';
}
