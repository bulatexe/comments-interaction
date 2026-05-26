import { useContext } from "react";
import { ADD_COMMENT } from "../../constants/actionTypes";
import { CommentDispatchContext } from "../../context/CommentsContext";
import { UserContext } from "../../context/UserContext";
import CommentInput from "../CommentInput/CommentInput";
import { getNextId } from "../../helpers/counterID";

function CommentCreate() {
  const currentUser = useContext(UserContext);
  const dispatch = useContext(CommentDispatchContext);

  return (
    <CommentInput
      onSend={(content) => {
        dispatch({
          type: ADD_COMMENT,
          id: getNextId(),
          content,
          currentUser,
        });
      }}
    />
  );
}

export default CommentCreate;
