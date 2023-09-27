/* global data */
const $formUrl = document.getElementById('formURL');
const $formImage = document.getElementById('formImage');
const $form = document.getElementById('entryForm');
const $ul = document.getElementById('entryUl');
const $views = document.querySelectorAll('[data-view]');
const $entriesLink = document.getElementById('entriesLink');
const $formLink = document.getElementById('formLink');
const $formH1 = document.getElementById('formH1');
const $deleteEntry = document.getElementById('deleteEntry');
const $modalContainer = document.getElementById('modalContainer');
const $cancelButton = document.getElementById('cancelButton');
const $confirmButton = document.getElementById('confirmButton');

$formUrl.addEventListener('input', function (event) {
  $formImage.setAttribute('src', event.target.value);
});

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  const formValues = {
    title: event.target.elements.formTitle.value,
    photoUrl: event.target.elements.formURL.value,
    notes: event.target.elements.formNotes.value,
  };
  if (data.editing === null) {
    formValues.entryId = data.nextEntryId++;
    data.entries.unshift(formValues);
    $ul.prepend(renderEntry(formValues));
  } else {
    formValues.entryId = data.editing.entryId;
    updateEntries(formValues);
    const updatedLi = renderEntry(formValues);
    const liToReplace = findLi(data.editing.entryId);
    liToReplace.replaceWith(updatedLi);
    updateFormTitle('New Entry');
    data.editing = null;
  }
  resetForm();
  viewSwap('entries');
});

document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    $ul.appendChild(renderEntry(data.entries[i]));
  }
  viewSwap(data.view);
});

$entriesLink.addEventListener('click', function (event) {
  viewSwap('entries');
});

$formLink.addEventListener('click', function (event) {
  resetForm();
  updateFormTitle('New Entry');
  viewSwap('entry-form');
  $deleteEntry.classList.add('invisible');
});

$ul.addEventListener('click', function (event) {
  if (!event.target.matches('i')) {
    return null;
  }
  viewSwap('entry-form');
  updateFormTitle('Edit Entry');
  const entryId = Number(
    event.target.closest('li').getAttribute('data-entry-id')
  );
  data.editing = findEntryObject(entryId);
  populateForm(data.editing);
  $deleteEntry.classList.remove('invisible');
});

$deleteEntry.addEventListener('click', function (event) {
  toggleModal();
});

$cancelButton.addEventListener('click', function (event) {
  toggleModal();
});

$confirmButton.addEventListener('click', function (event) {
  removeEntryObject(data.editing.entryId);
  findLi(data.editing.entryId).remove();
  toggleModal();
  viewSwap('entries');
});

function toggleModal() {
  $modalContainer.classList.toggle('hidden');
}

function findEntryObject(entryId) {
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === entryId) {
      return data.entries[i];
    }
  }
}

function findLi(entryId) {
  const $lis = document.querySelectorAll('li');
  for (const li of $lis) {
    if (Number(li.getAttribute('data-entry-id')) === entryId) {
      return li;
    }
  }
}

function removeEntryObject(entryId) {
  const updatedArray = data.entries.filter(
    (entry) => entry.entryId !== entryId
  );
  data.entries = updatedArray;
}

function populateForm(entry) {
  $form.elements.formTitle.value = entry.title;
  $form.elements.formNotes.value = entry.notes;
  $form.elements.formURL.value = entry.photoUrl;
  $formImage.setAttribute('src', entry.photoUrl);
}

function resetForm() {
  $form.reset();
  $formImage.setAttribute('src', 'images/placeholder-image-square.jpg');
}

function updateFormTitle(string) {
  $formH1.textContent = string;
}

function updateEntries(formValues) {
  const newEntries = data.entries.map((entry) => {
    if (entry.entryId === formValues.entryId) {
      return formValues;
    } else {
      return entry;
    }
  });
  data.entries = newEntries;
}

function renderEntry(entry) {
  // <li data-entry-id="">
  //   <div class="row">
  //     <div class="column-half">
  //       <img class="input-b-radius form-image" src="" alt="">
  //     </div>
  //     <div class="column-half">
  //        <div class="row">
  //          <div class="column-full d-flex justify-between">
  //            <h3>This is test Title</h3>
  //             <i class='fa-solid fa-pencil'></i>
  //           </div>
  //        </div>
  //       <p></p>
  //     </div>
  //   </div>
  // </li>

  const $li = document.createElement('li');
  $li.setAttribute('data-entry-id', entry.entryId);

  const $row = document.createElement('row');
  $row.classList.add('row');

  const $colHalfOne = document.createElement('div');
  $colHalfOne.classList.add('column-half');

  const $image = document.createElement('img');
  $image.setAttribute('src', entry.photoUrl);
  $image.className = 'input-b-radius form-image';

  const $colHalfTwo = document.createElement('div');
  $colHalfTwo.classList.add('column-half');

  const $titleRow = document.createElement('div');
  $titleRow.classList.add('row');

  const $colFull = document.createElement('div');
  $colFull.className = 'column-full d-flex justify-between align-center';

  const $icon = document.createElement('i');
  $icon.className = 'fa-solid fa-pencil';

  const $title = document.createElement('h3');
  $title.textContent = entry.title;

  const $notes = document.createElement('p');
  $notes.textContent = entry.notes;

  $li.appendChild($row);
  $row.append($colHalfOne, $colHalfTwo);
  $colHalfOne.appendChild($image);
  $titleRow.appendChild($colFull);
  $colFull.append($title, $icon);
  $colHalfTwo.append($titleRow, $notes);

  return $li;
}

function viewSwap(view) {
  data.view = view;
  for (let i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === view) {
      $views[i].classList.remove('hidden');
    } else {
      $views[i].classList.add('hidden');
    }
  }
}
