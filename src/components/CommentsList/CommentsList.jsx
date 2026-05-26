import { useContext, useState } from "react";
import Comment from "../Comment/Comment";
import { CommentContext } from "../../context/CommentsContext";
import "./CommentsList.css";

function CommentsList() {
  const [replyId, setReplyId] = useState(null);
  const { comments } = useContext(CommentContext);

  return (
    <ul className="comments__list">
      {comments.map((item) => (
        <li key={item.id}>
          <Comment
            replyId={replyId}
            isReply={replyId === item.id}
            onReplyClick={(id) => setReplyId(id)}
            item={item}
          />
        </li>
      ))}
    </ul>
  );
}

export default CommentsList;
