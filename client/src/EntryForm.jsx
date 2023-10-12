import { useState } from 'react';

export default function EntryForm({
  handleFormSubmit,
  deleteBtnClassName,
  formTitle,
  data,
  view,
  editEntryId,
}) {
  const previousEntryObject = findEntryObject(data, editEntryId) || null;
  const initialTitle = previousEntryObject ? previousEntryObject.title : '';
  const initialImgUrl = previousEntryObject ? previousEntryObject.imgUrl : '';
  const initialNotes = previousEntryObject ? previousEntryObject.notes : '';
  const [entryTitle, setEntryTitle] = useState(initialTitle);
  const [imgUrl, setImgUrl] = useState(initialImgUrl);
  const [notes, setNotes] = useState(initialNotes);

  const handleSubmit =
    view === 'edit-form' ? handleEditFormSubmit : handleNewFormSubmit;

  function handleFormChange(e) {
    if (e.target.id === 'formTitle') {
      setEntryTitle(e.target.value);
    } else if (e.target.id === 'formURL') {
      setImgUrl(e.target.value);
    } else if (e.target.id === 'formNotes') {
      setNotes(e.target.value);
    }
  }

  function resetForm() {
    setEntryTitle('');
    setImgUrl('');
    setNotes('');
  }

  function handleNewFormSubmit(event, savedData) {
    event.preventDefault();

    const newEntryObj = {
      entryId: savedData.nextEntryId,
      title: entryTitle,
      imgUrl: imgUrl,
      notes: notes,
    };

    handleFormSubmit(newEntryObj);
    resetForm();
  }

  function handleEditFormSubmit(event, savedData) {
    event.preventDefault();

    const UpdatedEditEntryObj = {
      entryId: previousEntryObject.entryId,
      title: entryTitle,
      imgUrl: imgUrl,
      notes: notes,
    };

    handleFormSubmit(UpdatedEditEntryObj, savedData);
    resetForm();
  }

  function findEntryObject(data, entryIdNumber) {
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === entryIdNumber) {
        return data.entries[i];
      }
    }
    return null;
  }

  return (
    <>
      <div className="container" data-view="entry-form">
        <div className="row">
          <div className="column-full d-flex justify-between">
            <h1 id="formH1">{formTitle}</h1>
          </div>
        </div>
        <form id="entryForm" onSubmit={() => handleSubmit(event, data)}>
          <div className="row margin-bottom-1">
            <div className="column-half">
              <img
                className="input-b-radius form-image"
                id="formImage"
                src={imgUrl || 'images/placeholder-image-square.jpg'}
                alt="image of entry image"
              />
            </div>
            <div className="column-half">
              <label className="margin-bottom-1 d-block" htmlFor="formTitle">
                Title
              </label>
              <input
                required
                className="input-b-color text-padding input-b-radius purple-outline input-height margin-bottom-2 d-block width-100"
                type="text"
                id="formTitle"
                name="formTitle"
                value={entryTitle}
                onChange={() => handleFormChange(event)}
              />
              <label className="margin-bottom-1 d-block" htmlFor="formURL">
                Photo URL
              </label>
              <input
                required
                className="input-b-color text-padding input-b-radius purple-outline input-height margin-bottom-2 d-block width-100"
                type="text"
                id="formURL"
                name="formURL"
                value={imgUrl}
                onChange={() => handleFormChange(event)}
              />
            </div>
          </div>
          <div className="row margin-bottom-1">
            <div className="column-full">
              <label className="margin-bottom-1 d-block" htmlFor="formNotes">
                Notes
              </label>
              <textarea
                required
                className="input-b-color text-padding input-b-radius purple-outline d-block width-100"
                name="formNotes"
                id="formNotes"
                cols="30"
                rows="10"
                value={notes}
                onChange={() => handleFormChange(event)}></textarea>
            </div>
          </div>
          <div className="row">
            <div className="column-full d-flex justify-between">
              <button
                className={deleteBtnClassName}
                type="button"
                id="deleteEntry">
                Delete Entry
              </button>
              <button
                type="submit"
                className="input-b-radius text-padding purple-background white-text">
                SAVE
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
