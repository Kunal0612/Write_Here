const addButton = document.querySelector("#add");

const updateLSData = () => {
  const textAreaData = document.querySelectorAll("textarea");
  const notes = [];
  console.log(textAreaData.value);
  textAreaData.forEach((note) => {
    return notes.push(note.value);
  });

  localStorage.setItem('notes', JSON.stringify(notes));
};


const addNewNote = (text = '') => {
  const note = document.createElement('div');
  note.classList.add('note');
  const htmlData = `
    <div class="operation">
        <button class="edit">
            <i class="fas fa-edit"></i>
        </button>
        <button class="delete">
            <i class="fas fa-trash-alt" aria-hidden="true"></i>
        </button>
    </div>
    <div class="note-content ${text ? "" : "hidden"} "> </div>
<textarea class="${text ? "hidden" : ""}"> </textarea>`;
  note.insertAdjacentHTML('afterbegin', htmlData);
  const editButton = note.querySelector(".edit");
  const delButton = note.querySelector(".delete");
  const mainDiv = note.querySelector(".note-content");
  const textArea = note.querySelector("textarea");


  // console.log(editButton)

  delButton.addEventListener("click", () => {
    note.remove();
    updateLSData();
  });
  textArea.value = text;
  mainDiv.innerHTML = text;
  editButton.addEventListener("click", () => {
    mainDiv.classList.toggle('hidden');
    textArea.classList.toggle('hidden');
  });

  textArea.addEventListener("change", (event) => {
    const value = event.target.value;
    mainDiv.innerHTML = value;
    updateLSData();

  });
  document.body.appendChild(note);
};

const notes = JSON.parse(localStorage.getItem('notes'));

if (notes) {
  notes.forEach((note) => addNewNote(note));
};
// console.log(notes)
addButton.addEventListener("click", () => addNewNote());
