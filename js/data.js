/* exported data */

let data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
  entryId: 1,
};

// localStorage

const previousTodoJSON = window.localStorage.getItem(
  'javascript-local-storage'
);

console.log(previousTodoJSON);

if (previousTodoJSON !== null) {
  data = JSON.parse(previousTodoJSON);
}

window.addEventListener('beforeunload', (e) => {
  // data object into a string

  const todosJSON = JSON.stringify(data);

  localStorage.setItem('javascript-local-storage', todosJSON);
});
