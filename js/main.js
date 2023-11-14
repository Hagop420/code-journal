/* global data */

const $imgSrcChange = document.querySelector('.changed');
const $photoId = document.querySelector('.photoURL');
const $form = document.querySelector('form');

$photoId.addEventListener('input', (e) => {
  $imgSrcChange.setAttribute('src', e.target.value);
});
// submit event

$form.addEventListener('submit', (e) => {
  e.preventDefault();

  const objStorageFormInputs = {
    entryId: data.nextEntryId,
    title: e.target.elements.title.value,
    photoID: e.target.elements.photoID.value,
    textarea: e.target.elements.textarea.value,
  };

  data.nextEntryId++;

  data.entries.unshift(objStorageFormInputs);

  $imgSrcChange.setAttribute('src', './images/placeholder-image-square.jpg');

  $form.reset();
});
