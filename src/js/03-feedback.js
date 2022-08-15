import throttle from 'lodash.throttle';
const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';
const formData = new FormData();

form.addEventListener('input', throttle(onFeedbackInput, 500));
form.addEventListener('submit', onFeedbackSubmit);

// 1. При загрузке/перезагрузке страницы, считываем наличие записи в localStorage по ключу STORAGE_KEY
onReadStorage();

// 2. Функция чтения данных из LocalStorage
function onReadStorage() {
  const savedForm = localStorage.getItem(STORAGE_KEY);
  //   console.log('savedForm :>> ', localStorage.getItem(STORAGE_KEY));
  if (savedForm) {
    const target = onCheckData(savedForm);

    formData.set('email', target.email);
    formData.set('message', target.message);
    // 2. Если в хранилище есть данные, вызываем функцию для перезаписи данных в поля формы
    onReWriteFormField();
  }
}

// 3. Функция проверки данных, если это строка то парсит данные в форму,
//если объект, то переводит в строку для записи в LocalStorage
function onCheckData(subject) {
  if (typeof subject === 'string') {
    return JSON.parse(subject);
  } else {
    return JSON.stringify(Object.fromEntries(formData.entries()));
  }
}

// 4. Вызываем функцию записи в поля формы из ключей FormData
function onReWriteFormField() {
  if (formData.get('email') === 'undefined') {
    //  console.log('formData.email :>> ', formData.get('email'));
    form.email.value = '';
  } else {
    form.email.value = formData.get('email');
  }

  if (formData.get('message') === 'undefined') {
    //  console.log('formData.message :>> ', formData.get('message'));
    form.message.value = '';
  } else {
    form.message.value = formData.get('message');
  }
}

// 5. Функция записи данных формы в LocalStorage
function onWriteStorage() {
  localStorage.setItem(STORAGE_KEY, onCheckData(formData));
}

// 6. Колбек-функция для получения данных из формы
function onFeedbackInput(event) {
  const evt = event.target;
  //   console.log('evt.name :>> ', evt.name);
  //   console.log('evt.value :>> ', evt.value);
  formData.set(evt.name, evt.value);
  onWriteStorage();

  return formData;
}

// 7. Колбек-функция для отправки данных формы и очистка полей формы, ключей localStorage и FormData
function onFeedbackSubmit(event) {
  event.preventDefault();

  if (formData.get('email') === null || formData.get('message') === null) {
    window.alert('Please fill in all the fields!');
    return;
  }

  console.log('email: ', formData.get('email'));
  console.log('message: ', formData.get('message'));
  formData.delete('email');
  formData.delete('message');
  event.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}
