/* exported data */
let data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

// localStorage

const previousTodoJSON = localStorage.getItem(
  'javascript-local-storage'
);

if (previousTodoJSON !== null) {
  data = JSON.parse(previousTodoJSON);
}

window.addEventListener('beforeunload', (e) => {
  // data object into a string

  const todosJSON = JSON.stringify(data);

  localStorage.setItem('javascript-local-storage', todosJSON);
});
