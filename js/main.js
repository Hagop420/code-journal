/* global data */
// Storing the variable's in constant key's
const $imgSrcChange = document.querySelector('.changed');
const $photoId = document.querySelector('.photoURL');
const $form = document.querySelector('form');
const $entriesList = document.querySelector('.unordered');
const $all_list_items = document.querySelectorAll('li');
const $anchorEntries = document.querySelector('.entriesBtn');
const $entryForm = document.querySelector('.query_one');
const $entriesBottom = document.querySelector('.query_two');
const $newBtn = document.querySelector('.new_js');
const $nullMsg = document.querySelector('.nullMsg');
const $eHeader = document.querySelector('.entryHeader');
const $delete_entry_btn = document.querySelector('.delEntry');
const $modal_font = document.querySelector('.modal-font');
const $modal_open = document.querySelector('.modal-container');
const $modal_content = document.querySelector('.modal-content');
const $modal_button_yes = document.querySelector('.modal-button-confirm');
const $modal_button_no = document.querySelector('.modal-deny');
// const $modal_open_overlay = document.querySelector('.overlay');
// event on the photoURL input which listen's for when the user type's
$photoId.addEventListener('input', (e) => {
  $imgSrcChange.setAttribute('src', e.target.value);
});
// submit event
// form subit event's
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
        objStorageFormInputs.entryId = dataEl;
        // DOM tree callback call with the object arg.
        dataEl = data.editing;
        // })
        // Finding the existing LI element and changing/replacing it's value to
        // to match the editing array
        // Calling the renderEntry() function and replacing the DOM tree and the object's with the edited content
        renderEntry(objStorageFormInputs).replaceWith(dataEl);
        // finding the LI and changing it's value end
        // nulling out the form once it's a wrap
        data.editing = null;
        $form.reset();
      }
    });
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
// document.addEventListener('DOMContentLoaded', () => {
//   for (let i = 0; i < data.entries.length; i++) {
//     $entriesList.appendChild(renderEntry(data.entries[i]));
//   }
//   // calling the callback's of the viewSwap and toggleEntrie's function
//   viewSwap(data.view);
//   toggleEntries();
// });

document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    const entry = renderEntry(data.entries[i]);
    $entriesList.appendChild(entry);
  }
  viewSwap(data.view);
  toggleEntries();
});


function toggleEntries() {
  if (data.entries.length === 0) {
    // $nullMsg.classList.add('block');
    $nullMsg.classList.remove('hidden');
  } else{
    // $nullMsg.classList.add('hidden');
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
  $form.reset()
  // $imgSrcChange.src = 'images/placeholder-image-square.jpg'

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
        $eHeader.textContent = 'edit-entry';
        $delete_entry_btn.className = 'block delEntry'
      }
    });
  }
});







// Branch 4 Modal's functionallity

// Modal header/content styling
$modal_font.classList.add('modal-js-content-styling')
const audioPlayWhenButtonIsClicked = new Audio()



$delete_entry_btn.addEventListener('click', () => {
  document.body.classList.add('overflow_hide')
  $modal_open.className = 'block confirmation overlay'
  $modal_content.className = 'modal-content-inner-center'
  // audio when modal's opene'd
  elevatorMusic()
})
// Event handler's on the button's in the modal
// calling/Giving the  button's in the modal a class of cursor and more preetie'r styling
// giving them a font size of 16px
$modal_button_yes.classList.add('btn-sized')
$modal_button_no.classList.add('btn-sized')
$modal_button_yes.addEventListener('mouseover', () => {
  $modal_button_yes.classList.add('scaled')
  $modal_button_yes.classList.add('white-modal-button')
  $modal_button_yes.classList.add('opacity-smaller')
})
$modal_button_yes.addEventListener('mouseout', () => {
  $modal_button_yes.classList.remove('scaled')
  $modal_button_yes.classList.remove('white-modal-button')
  $modal_button_yes.classList.remove('opacity-smaller')
})
//  Button custimization's for no in moodal
$modal_button_no.addEventListener('mouseover', () => {
  $modal_button_no.classList.add('scaled')
  $modal_button_no.classList.add('white-modal-button')
})
$modal_button_no.addEventListener('mouseout', () => {
  $modal_button_no.classList.remove('scaled')
  $modal_button_no.classList.remove('white-modal-button')
})
// click event's for the modal's button's
$modal_button_yes.addEventListener('click', () => {
  document.body.classList.remove('overflow_hide')
  $modal_open.className = 'hidden'
  $nullMsg.className = 'block'

  // // Audio's here
  audioPlayWhenButtonIsClicked.pause()
  coolAudtioInplementation()


  //   Looping and L.S deletion’s
  for (let i = 0; i < $all_list_items.length; i++) {
    const getAttrLis = $all_list_items[i].getAttribute('data-entry-id');
    if (data.editing.entryId === Number(getAttrLis)) {
      console.log(data.editing.entryId === Number(getAttrLis))
      const lis = $all_list_items[i]
      lis.remove()

    }
  }


  for (let i = 0; i < data.entries.length; i++) {
    if (data.editing.entryId === data.entries[i].entryId) {
      data.entries.splice(i, 1);
      // console.log(data.entries)
    }

  }

  $imgSrcChange.src = 'images/placeholder-image-square.jpg'
  $form.reset()
  data.editing = null;
  viewSwap('entries')
  toggleEntries();




})

$modal_button_no.addEventListener('click', () => {
  document.body.classList.remove('overflow_hide')
  $modal_open.className = 'hidden'



  // Setting a cool clicking sound when clicke'd
  coolAudtioInplementation()
  audioPlayWhenButtonIsClicked.pause()

})





// Audio function's



function coolAudtioInplementation() {
  const audioPlayWhenButtonIsClicked = new Audio()

  audioPlayWhenButtonIsClicked.src = 'https://www.fesliyanstudios.com/play-mp3/387'

  audioPlayWhenButtonIsClicked.play()
}



// when modal is opnene'd play the elevator music function inplement
function elevatorMusic() {

  audioPlayWhenButtonIsClicked.src = 'https://dl.vgmdownloads.com/soundtracks/club-penguin-online-unofficial-soundtrack-online-windows-gamerip-2018/tltdklykwt/2-12.%20Pizza%20Parlor.mp3'
  audioPlayWhenButtonIsClicked.loop = true

  audioPlayWhenButtonIsClicked.play()
}












// /* global data */
// // Storing the variable's in constant key's
// const $imgSrcChange = document.querySelector('.changed');
// const $photoId = document.querySelector('.photoURL');
// const $form = document.querySelector('form');
// const $entriesList = document.querySelector('.unordered');
// const $all_list_items = document.querySelectorAll('li');
// const $anchorEntries = document.querySelector('.entriesBtn');
// const $entryForm = document.querySelector('.query_one');
// const $entriesBottom = document.querySelector('.query_two');
// const $newBtn = document.querySelector('.new_js');
// const $nullMsg = document.querySelector('.nullMsg');
// const $eHeader = document.querySelector('.entryHeader');
// const $delete_entry_btn = document.querySelector('.delEntry');
// const $modal_font = document.querySelector('.modal-font');
// const $modal_open = document.querySelector('.modal-container');
// const $modal_content = document.querySelector('.modal-content');
// const $modal_button_yes = document.querySelector('.modal-button-confirm');
// const $modal_button_no = document.querySelector('.modal-deny');
// // const $modal_open_overlay = document.querySelector('.overlay');
// // event on the photoURL input which listen's for when the user type's
// $photoId.addEventListener('input', (e) => {
//   $imgSrcChange.setAttribute('src', e.target.value);
// });
// // submit event
// // form subit event's
// // Listner method for the actual form submition
// function submitHandler(event) {
//   event.preventDefault();
//    const objStorageFormInputs = {
//     entryId: data.nextEntryId,
//     title: e.target.elements.title.value,
//     photoID: e.target.elements.photoID.value,
//     textarea: e.target.elements.textarea.value,
//   };

//   if (data.editing === null) {
//     data.entries.unshift(entry);
//     data.nextEntryId++;
//     $photoPreview.src = 'images/placeholder-image-square.jpg';
//     $entriesList.prepend(renderEntry(entry));
//     $entryForm.reset();
//     viewSwap('entries');
//     toggleNoEntries();
//   } else {
//     entry.entryId = data.editing.entryId;
//     const $listItems = document.querySelectorAll('li');
//     for (let i = 0; i < $listItems.length; i++) {
//       const dataEntryId = $listItems[i].getAttribute('data-entry-id');
//       if (Number(dataEntryId) === data.editing.entryId) {
//         data.entries[i] = entry;
//         $listItems[i].replaceWith(renderEntry(entry));
//       }
//     }
//     data.editing = null;
//     $eHeader.textContent = 'New Entry';
//     $imgSrcChange.src = 'images/placeholder-image-square.jpg';
//     $form.reset();
//     // viewSwap('entries');
//     toggleEntries();
//   }
// }
// // renderEntriy function functionallity i's to create a DOM tree structure
// // Creating the DOM tree function calle'd renderEntry
// const renderEntry = (entry) => {
//   // create the li element dom tree
//   const $liCreation = document.createElement('li');
//   $liCreation.className = 'row';
//   $liCreation.setAttribute('data-entry-id', entry.entryId);
//   // div element creation
//   const $div = document.createElement('div');
//   $div.className = 'column-half';
//   // div 2 creation
//   const $div2 = document.createElement('div');
//   $div2.className = 'column-half';
//   // img element creation
//   const $imgDomTree = document.createElement('img');
//   $imgDomTree.setAttribute('src', entry.photoID);
//   $imgDomTree.setAttribute('alt', 'img_from_Dom');
//   // p one element creation
//   const $h1 = document.createElement('p');
//   $h1.className = 'bold appnedHtwo';
//   $h1.textContent = entry.title;
//   // p two element creation
//   const $p2 = document.createElement('p');
//   $p2.className = 'appendChildFromJs';
//   $p2.textContent = entry.textarea;
//   // appending to the DOM with appendChild
//   // adding the pencil icon from font awesome
//   const createIcon = document.createElement('i');
//   createIcon.className =
//     'fa-pencil fa-solid mt fontAwesomeIcons fontAwesomeIcons_sizes';
//   createIcon.setAttribute('title', 'Edit Entry');
//   // appending the element's to the DOM
//   $liCreation.appendChild($div);
//   $liCreation.appendChild($div2);
//   $div.appendChild($imgDomTree);
//   $div2.appendChild(createIcon);
//   $div2.appendChild($h1);
//   $div2.appendChild($p2);
//   //  returrns the li element with all the dom nodes/creation
//   return $liCreation;
// };
// // const $nullMsg = document.querySelector('.nullMsg');
// // Calling the addEventListner on the Document's document
// // documen't event handler
// // document.addEventListener('DOMContentLoaded', () => {
// //   for (let i = 0; i < data.entries.length; i++) {
// //     $entriesList.appendChild(renderEntry(data.entries[i]));
// //   }
// //   // calling the callback's of the viewSwap and toggleEntrie's function
// //   viewSwap(data.view);
// //   toggleEntries();
// // });

// document.addEventListener('DOMContentLoaded', function (event) {
//   for (let i = 0; i < data.entries.length; i++) {
//     const entry = renderEntry(data.entries[i]);
//     $entriesList.appendChild(entry);
//   }
//   viewSwap(data.view);
//   toggleEntries();
// });


// function toggleEntries() {
//   if (data.entries.length === 0) {
//     // $nullMsg.classList.add('block');
//     $nullMsg.classList.remmove('hidden');
//   } else {
//     // $nullMsg.classList.add('hidden');
//     $nullMsg.classList.add('hidden');
//   }
// }
// // Creating the viewSwap function
// // entries is the form on bottom
// function viewSwap(entries) {
//   if (entries === 'entries') {
//     $entriesBottom.classList.remove('hidden');
//     $entryForm.classList.add('hidden');
//     // entry-form is the entry on top
//   } else if (entries === 'entry-form') {
//     $entryForm.classList.remove('hidden');
//     $entriesBottom.classList.add('hidden');
//   }
// }
// // working with the form's new button
// // Clicking the top entries nav bar a tag will take you to the top entrie's form even't handler
// $newBtn.addEventListener('click', () => {
//   viewSwap('entry-form');
//   $form.reset()
//   // $imgSrcChange.src = 'images/placeholder-image-square.jpg'

// });
// // working with the entries anchor tag on top and calling an event on it
// $anchorEntries.addEventListener('click', () => {
//   viewSwap('entries');
//   toggleEntries();
// });
// const valOne = document.querySelector('.val');
// const valTwo = document.querySelector('.emailInp');
// const textArea = document.querySelector('.textInp');
// $entriesList.addEventListener('click', (e) => {
//   const liRow = e.target.closest('li');
//   if (e.target.tagName === 'I') {
//     viewSwap('entry-form');
//     data.entries.forEach((dataEl) => {
//       if (dataEl.entryId.toString() === liRow.getAttribute('data-entry-id')) {
//         data.editing = dataEl;
//         valOne.value = data.editing.title;
//         valTwo.value = data.editing.photoID;
//         textArea.value = data.editing.textarea;
//         $imgSrcChange.setAttribute('src', data.editing.photoID);
//         $eHeader.textContent = 'edit-entry';
//         $delete_entry_btn.className = 'block delEntry'
//       }
//     });
//   }
// });







// // Branch 4 Modal's functionallity

// // Modal header/content styling
// $modal_font.classList.add('modal-js-content-styling')
// const audioPlayWhenButtonIsClicked = new Audio()



// $delete_entry_btn.addEventListener('click', () => {
//   document.body.classList.add('overflow_hide')
//   $modal_open.className = 'block confirmation overlay'
//   $modal_content.className = 'modal-content-inner-center'
//   // audio when modal's opene'd
//   elevatorMusic()
// })
// // Event handler's on the button's in the modal
// // calling/Giving the  button's in the modal a class of cursor and more preetie'r styling
// // giving them a font size of 16px
// $modal_button_yes.classList.add('btn-sized')
// $modal_button_no.classList.add('btn-sized')
// $modal_button_yes.addEventListener('mouseover', () => {
//   $modal_button_yes.classList.add('scaled')
//   $modal_button_yes.classList.add('white-modal-button')
//   $modal_button_yes.classList.add('opacity-smaller')
// })
// $modal_button_yes.addEventListener('mouseout', () => {
//   $modal_button_yes.classList.remove('scaled')
//   $modal_button_yes.classList.remove('white-modal-button')
//   $modal_button_yes.classList.remove('opacity-smaller')
// })
// //  Button custimization's for no in moodal
// $modal_button_no.addEventListener('mouseover', () => {
//   $modal_button_no.classList.add('scaled')
//   $modal_button_no.classList.add('white-modal-button')
// })
// $modal_button_no.addEventListener('mouseout', () => {
//   $modal_button_no.classList.remove('scaled')
//   $modal_button_no.classList.remove('white-modal-button')
// })
// // click event's for the modal's button's
// $modal_button_yes.addEventListener('click', () => {
//   document.body.classList.remove('overflow_hide')
//   $modal_open.className = 'hidden'

//   $nullMsg.className = 'block'


//   // // Audio's here
//   audioPlayWhenButtonIsClicked.pause()
//   coolAudtioInplementation()


//   //   Looping and L.S deletion’s
//   for (let i = 0; i < $all_list_items.length; i++) {
//     const getAttrLis = $all_list_items[i].getAttribute('data-entry-id');
//     if (data.editing.entryId === Number(getAttrLis)) {
//       const lis = $all_list_items[i]
//       lis.remove()
//       console.log(lis)
//     }
//   }


//   for (let i = 0; i < data.entries.length; i++) {
//     if (data.editing.entryId === data.entries[i].entryId) {
//       data.entries.splice(i, 1);
//       // console.log(data.entries)
//     }

//   }

//   $imgSrcChange.src = 'images/placeholder-image-square.jpg'
//   $form.reset()
//   data.editing = null;
//   viewSwap('entries')
//   toggleEntries();




// })

// $modal_button_no.addEventListener('click', () => {
//   document.body.classList.remove('overflow_hide')
//   $modal_open.className = 'hidden'



//   // Setting a cool clicking sound when clicke'd
//   coolAudtioInplementation()
//   audioPlayWhenButtonIsClicked.pause()

// })





// // Audio function's



// function coolAudtioInplementation() {
//   const audioPlayWhenButtonIsClicked = new Audio()

//   audioPlayWhenButtonIsClicked.src = 'https://www.fesliyanstudios.com/play-mp3/387'

//   audioPlayWhenButtonIsClicked.play()
// }



// // when modal is opnene'd play the elevator music function inplement
// function elevatorMusic() {

//   audioPlayWhenButtonIsClicked.src = 'https://dl.vgmdownloads.com/soundtracks/club-penguin-online-unofficial-soundtrack-online-windows-gamerip-2018/tltdklykwt/2-12.%20Pizza%20Parlor.mp3'
//   audioPlayWhenButtonIsClicked.loop = true

//   audioPlayWhenButtonIsClicked.play()
// }
