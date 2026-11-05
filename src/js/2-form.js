const form = document.querySelector('.feedback-form');

const LS_KEY = 'feedback-form-state';

let formState = {
  email: '',
  message: '',
};

getStorage();

form.addEventListener('input', inputHandler);
form.addEventListener('submit', submitHandler);

function inputHandler(e) {
  formState[e.target.name] = e.target.value.trim();

  localStorage.setItem(LS_KEY, JSON.stringify(formState));
}

function getStorage() {
  const savedFormData = localStorage.getItem(LS_KEY);

  if (!savedFormData) {
    return;
  }

  const { email, message } = form.elements;

  formState = JSON.parse(savedFormData);

  email.value = formState.email;
  message.value = formState.message;
}

function submitHandler(e) {
  e.preventDefault();

  const submittedData = new FormData(e.target);
  formState.email = submittedData.get('email').trim();
  formState.message = submittedData.get('message').trim();

  if (!formState.email || !formState.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formState);

  e.target.reset();
  localStorage.removeItem(LS_KEY);
  formState.email = '';
  formState.message = '';
}
