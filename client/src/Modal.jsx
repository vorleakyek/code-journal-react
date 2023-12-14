export default function Modal({ isActive,editEntryId, handleCancel, handleConfirm}) {

  const modalClassName = isActive
    ? 'modal-container d-flex justify-center align-center'
    : 'modal-container d-flex justify-center align-center hidden';

  function handleDelete(editEntryId) {
    handleConfirm(editEntryId);
    handleCancel();

  }

    return (
      <>
        <article>
          <div id="modalContainer" className={modalClassName}>
            <div className="modal row">
              <div className="column-full d-flex justify-center">
                <p>Are you sure you want to delete this entry?</p>
              </div>
              <div className="column-full d-flex justify-between">
                <button
                  className="modal-button"
                  id="cancelButton"
                  onClick={handleCancel}>
                  Cancel
                </button>
                <button
                  className="modal-button red-background white-text"
                  id="confirmButton"
                  onClick={() => {handleDelete(editEntryId); }}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </article>
      </>
    );
}
