import "./Modal.css";

function Modal({
  title,
  text,
  onClose = () => {},
  onSubmit = () => {},
  buttons = {},
  isOpen = false,
}) {
  const {
    submitText = "Submit",
    closeText = "Close",
    submitTypeClass = "default",
  } = buttons;

  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{title}</h2>
            <p className="modal__text">{text}</p>
            <div className="modal__controls">
              <button type="button" className="modal__close" onClick={onClose}>
                {closeText}
              </button>
              <button
                type="button"
                className={`modal__submit ${submitTypeClass}`}
                onClick={onSubmit}
              >
                {submitText}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
