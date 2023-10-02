export default function EntryForm({formTitle, formValue, onChange, onSubmit}) {
  return(
    <>
      <div className="container" data-view="entry-form">
        <div className="row">
          <div className="column-full d-flex justify-between">
            <h1 id="formH1">{formTitle}</h1>
          </div>
        </div>
        <form id="entryForm" onSubmit={onSubmit}>
          <div className="row margin-bottom-1">
            <div className="column-half">
              <img
                className="input-b-radius form-image"
                id="formImage"
                src={formValue[1].includes('https:') ? formValue[1] : "images/placeholder-image-square.jpg"}
                alt="image of entry image" />
            </div>
            <div className="column-half">
              <label className="margin-bottom-1 d-block" htmlFor="formTitle">Title</label>
              <input
                required
                className="input-b-color text-padding input-b-radius purple-outline input-height margin-bottom-2 d-block width-100"
                type="text"
                id="formTitle"
                name="formTitle"
                value={formValue[0]}
                onChange={onChange}/>
              <label className="margin-bottom-1 d-block" htmlFor="formURL">Photo URL</label>
              <input
                required
                className="input-b-color text-padding input-b-radius purple-outline input-height margin-bottom-2 d-block width-100"
                type="text"
                id="formURL"
                name="formURL"
                value={formValue[1]}
                onChange={onChange} />
            </div>
          </div>
          <div className="row margin-bottom-1">
            <div className="column-full">
              <label className="margin-bottom-1 d-block" htmlFor="formNotes">Notes</label>
              <textarea
                required
                className="input-b-color text-padding input-b-radius purple-outline d-block width-100"
                name="formNotes"
                id="formNotes"
                cols="30"
                rows="10"
                value={formValue[2]}
                onChange={onChange}></textarea>
            </div>
          </div>
          <div className="row">
            <div className="column-full d-flex justify-between">
              <button
                className="invisible delete-entry-button"
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
  )
}
