/* global data */

const imgSrcChange = document.querySelector('.changed');
const photoId = document.querySelector('.photoURL');
const form = document.querySelector('form');

photoId.addEventListener('input', (e) => {
  if (e.target.value === imgSrcChange.setAttribute('src', e.target.value)) {
    imgSrcChange.setAttribute('src', e.target.value);
  } else if (e.target.value === '') {
    imgSrcChange.src =
      'https://i0.wp.com/tnpta.org/wp-content/themes/learnpro/framework/img/us-placeholder-square.jpg?resize=600%2C600&ssl=1';
  }
});
// submit event

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const objStorageFormInputs = {
    entryId: data.nextEntryId,
    title: e.target.elements.title.value,
    photoID: e.target.elements.photoID.value,
    textarea: e.target.elements.textarea.value,
  };

  data.entries.unshift(objStorageFormInputs);

  imgSrcChange.setAttribute('src', './images/placeholder-image-square.jpg');

  form.reset();
});
