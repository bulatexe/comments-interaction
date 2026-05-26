import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import "./CommentInput.css";

function CommentInput({
  commentText = "",
  onSend,
  onClose = null,
  sendTitle = "Send",
  isEdit,
}) {
  const [text, setText] = useState(commentText);
  const [validateText, setValidateText] = useState("");
  const currentUser = useContext(UserContext);
  const handleKeyDownSubmit = (evt) => {
    if (evt.key === "Enter" && !evt.shiftKey) {
      handleSubmit(evt);
    }
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (text.replace(/^@\w+,?\s*/, "").trim().length <= 0) {
      setValidateText("Comment is empty");
      return;
    }

    onSend(text);
    setText("");
    setValidateText("");
  };

  return (
    <div className="comment-input">
      <div className={`comment-input__wrap ${isEdit ? "edit" : ""}`}>
        {!isEdit && (
          <img
            className="comment-input__user-img"
            src={currentUser.image.png}
          />
        )}
        <form onSubmit={handleSubmit}>
          <textarea
            name="comment"
            placeholder="Add a comment..."
            value={text}
            onKeyDown={handleKeyDownSubmit}
            onChange={(evt) => setText(evt.target.value)}
          />
          <div className="comment-input__controls">
            <button type="submit">{sendTitle}</button>
            {onClose && (
              <button type="button" onClick={onClose}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
      {setValidateText.length > 0 && (
        <p className="comment-input__validate_error">{validateText}</p>
      )}
    </div>
  );
}

export default CommentInput;
