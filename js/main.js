/* global data */

// Storing the variable's in constant key's
const $imgSrcChange = document.querySelector('.changed');
const $photoId = document.querySelector('.photoURL');
const $form = document.querySelector('form');
const $entriesList = document.querySelector('.unordered');
const $anchorEntries = document.querySelector('.entriesBtn');
const $entryForm = document.querySelector('.query_one');
const $entriesBottom = document.querySelector('.query_two');
const $newBtn = document.querySelector('.new_js');
const $nullMsg = document.querySelector('.nullMsg');
const $findingTheDomCreatedLis = document.querySelector('li.row');

// event on the photoURL input which listen's for when the user type's

$photoId.addEventListener('input', (e) => {
  $imgSrcChange.setAttribute('src', e.target.value);
});

// submit event

// Listner method for the actual form submition

$form.addEventListener('submit', (e) => {
  e.preventDefault();

  // This conditional checks if the data.editing pencil is a value of null or not null

  const objStorageFormInputs = {
    entryId: data.nextEntryId,
    title: e.target.elements.title.value,
    photoID: e.target.elements.photoID.value,
    textarea: e.target.elements.textarea.value,
  };
  if (data.editing === null) {
    data.nextEntryId++;

    data.entries.unshift(objStorageFormInputs);

    $imgSrcChange.setAttribute('src', './images/placeholder-image-square.jpg');

    $form.reset();

    // render the renderEntry callback on the form if the form's submitted

    const $callRender = renderEntry(objStorageFormInputs);
    // Update for the editing view using a condition
    // Current step in code-journal

    $entriesList.prepend($callRender);
  } else if (data.editing !== null) {
    // Looping over the Data.entrie's array and finding which element's matche's the data.editing
    data.entries.forEach((dataEl) => {
      if (dataEl === data.editing) {
        // Replacing the object in the data.entries object/array with the data.editing object
        // data.entries = data.editing
        // Updating the objStorageFoemInputs.entryId with editing value inside the object's array in LS
        objStorageFormInputs.entryId = data.editing;
        // DOM tree callback call with the object arg.
        data.entries = data.editing;
        // })

        // Finding the existing LI element and changing/replacing it's value to
        // to match the editing array

        $findingTheDomCreatedLis.replaceWith(dataEl);

        // finding the LI and changing it's value end
      }
    });
    renderEntry(objStorageFormInputs);
  }
  // Invoking the viewSwap() and the toggleEnties() callback's
  viewSwap('entries');
  toggleEntries();
});

// renderEntriy function functionallity i's to create a DOM tree structure

// Creating the DOM tree function calle'd renderEntry
const renderEntry = (entry) => {
  // create the li element dom tree
  const $liCreation = document.createElement('li');
  $liCreation.className = 'row';
  $liCreation.setAttribute('data-entry-id', entry.entryId);

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
  createIcon.setAttribute('title', 'Edit Entry');

  // appending the element's to the DOM
  $liCreation.appendChild($div);
  $liCreation.appendChild($div2);
  $div.appendChild($imgDomTree);
  $div2.appendChild(createIcon);
  $div2.appendChild($h1);
  $div2.appendChild($p2);

  //  returrns the li element with all the dom nodes/creation

  return $liCreation;
};

// const $nullMsg = document.querySelector('.nullMsg');

// Calling the addEventListner on the Document's document

// documen't event handler
document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < data.entries.length; i += 1) {
    $entriesList.appendChild(renderEntry(data.entries[i]));
  }
  // calling the callback's of the viewSwap and toggleEntrie's function
  viewSwap(data.view);
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
// Clicking the top entries nav bar a tag will take you to the top entrie's form even't handler
$newBtn.addEventListener('click', () => {
  viewSwap('entry-form');
});

// working with the entries anchor tag on top and calling an event on it

$anchorEntries.addEventListener('click', () => {
  viewSwap('entries');
  toggleEntries();
});
const valOne = document.querySelector('.val');
const valTwo = document.querySelector('.emailInp');
const textArea = document.querySelector('.textInp');
$entriesList.addEventListener('click', (e) => {
  const liRow = e.target.closest('li');

  if (e.target.tagName === 'I') {
    viewSwap('entry-form');
    data.entries.forEach((dataEl) => {
      if (dataEl.entryId.toString() === liRow.getAttribute('data-entry-id')) {
        data.editing = dataEl;
        valOne.value = data.editing.title;
        valTwo.value = data.editing.photoID;
        textArea.value = data.editing.textarea;
        $imgSrcChange.setAttribute('src', data.editing.photoID);
      }
    });
  }
});
