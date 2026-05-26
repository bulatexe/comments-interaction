import { DELETE_TYPE_BTN, EDIT_TYPE_BTN, REPLY_TYPE_BTN } from "./constans";
import replyIcon from "../../assets/icon-reply.svg";
import editIcon from "../../assets/icon-edit.svg";
import deleteIcon from "../../assets/icon-delete.svg";
import "./ActionButton.css";

function ActionButton({ type, onClick, className, children }) {
  let icon = null;

  switch (type) {
    case REPLY_TYPE_BTN:
      icon = replyIcon;
      break;
    case EDIT_TYPE_BTN:
      icon = editIcon;
      break;
    case DELETE_TYPE_BTN:
      icon = deleteIcon;
      break;
  }

  return (
    <button
      type="button"
      className={`action-btn ${className}`}
      onClick={onClick}
    >
      {icon && <img src={icon} />}
      {children}
    </button>
  );
}

export default ActionButton;
