/* global data */
const $imgSrcChange = document.querySelector('.changed');
const $photoId = document.querySelector('.photoURL');
const $form = document.querySelector('form');
const $entriesList = document.querySelector('.unordered');
const $anchorEntries = document.querySelector('.entriesBtn');
const $entryForm = document.querySelector('.query_one');
const $entriesBottom = document.querySelector('.query_two');
const $newBtn = document.querySelector('.new_js');
// const allLiAttributes = document.querySelector('li.row[data-entry-id]="\2\"');
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

  // render the renderEntry callback on the form if the form's submitted

  const $callRender = renderEntry(objStorageFormInputs);

  $entriesList.prepend($callRender);
  viewSwap('entries');
  toggleEntries();
});

// renderEntriy function create DOM tree structure

const renderEntry = (entry) => {
  // create the li element dom tree

  const $liCreation = document.createElement('li');
  $liCreation.className = 'row';
  $liCreation.setAttribute('data-entry-id', data.entryId);

  // console.log($liCreation)

  // div element creation

  const $div = document.createElement('div');
  $div.className = 'column-half';
  // div 2 creation

  const $div2 = document.createElement('div');
  $div2.className = 'column-half';

  // img element creation

  const $imgDomTree = document.createElement('img');
  $imgDomTree.setAttribute('src', entry.photoID);
  $imgDomTree.setAttribute('alt', 'img_from_Dom');

  // p one element creation
  const $h1 = document.createElement('p');
  $h1.className = 'bold appnedHtwo';
  $h1.textContent = entry.title;

  // p two element creation
  const $p2 = document.createElement('p');
  $p2.className = 'appendChildFromJs';
  $p2.textContent = entry.textarea;
  // appending to the DOM with appendChild

  // adding the pencil icon from font awesome

  const createIcon = document.createElement('i');
  createIcon.className =
    'fa-pencil fa-solid mt fontAwesomeIcons fontAwesomeIcons_sizes';

  $liCreation.appendChild($div);
  $liCreation.appendChild($div2);
  $div.appendChild($imgDomTree);
  $div2.appendChild(createIcon);
  $div2.appendChild($h1);
  $div2.appendChild($p2);

  //  returrns the li element with all the dom nodes/creation

  return $liCreation;
};

// Calling the addEventListner on the DOM'S document
const $nullMsg = document.querySelector('.nullMsg');

document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < data.entries.length; i += 1) {
    $entriesList.appendChild(renderEntry(data.entries[i]));
  }
  viewSwap(data.view);
  //  Creating a coditional inside a function named toggleNoEntries checking if the ul's
  //  text content is not null
  toggleEntries();
});

function toggleEntries() {
  if (data.entries.length === 0) {
    $nullMsg.classList.add('block');
  } else if (data.entries.length !== 0) {
    $nullMsg.classList.add('hidden');
  }
}
// Creating the viewSwap function
// entries is the form on bottom
function viewSwap(entries) {
  if (entries === 'entries') {
    $entriesBottom.classList.remove('hidden');
    $entryForm.classList.add('hidden');

    // entry-form is the entry on top
  } else if (entries === 'entry-form') {
    $entryForm.classList.remove('hidden');
    $entriesBottom.classList.add('hidden');
  }
}

// working with the form's new button

$newBtn.addEventListener('click', () => {
  viewSwap('entry-form');
});

// working with the entries anchor tag on top and calling an event on it

$anchorEntries.addEventListener('click', () => {
  viewSwap('entries');
  toggleEntries();
});

$entriesList.addEventListener('click', (e) => {
  // console.log(e.target)

  // const liRow = e.target.closest('li').getAttribute(allLiAttributes)

  if (e.target.tagName === 'I') {
    viewSwap('entry-form');

    //  data.entries.forEach(dataEl => {
    // //   if(dataEl.dataset.e){
    // //     console.log(12)
    // //   }else{
    // //     console.log(12111)
    // //   }
    // //  })
    // }

    // }
  }
});
