import CommentInput from "../CommentInput/CommentInput";
import CommnetsList from "../CommentsList/CommentsList";
import "./CommentsSection.css";

function CommentsSection({ children }) {
  return <section className="comments">{children}</section>;
}

export default CommentsSection;
