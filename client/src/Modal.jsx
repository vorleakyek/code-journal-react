export default function Modal() {
  return(
    <>
      <article>
      <div
        id="modalContainer"
        className="modal-container d-flex justify-center align-center hidden">
        <div className="modal row">
          <div className="column-full d-flex justify-center">
            <p>Are you sure you want to delete this entry?</p>
          </div>
          <div className="column-full d-flex justify-between">
            <button className="modal-button" id="cancelButton">Cancel</button>
            <button
              className="modal-button red-background white-text"
              id="confirmButton">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </article>
    </>
  )
}
