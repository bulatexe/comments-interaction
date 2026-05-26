import { SCORE_TYPE_UP } from "../components/Comment/constans";
import {
  ADD_COMMENT,
  ADD_REPLY,
  EDIT_COMMENT,
  RATE_SCORE,
  REMOVE_COMMENT,
} from "../constants/actionTypes";
import createComment from "../helpers/createComment";
import filterNextComment from "../helpers/filterNextComments";
import mapNextComments from "../helpers/mapNextComments";

function commentReducer(commentsState, action) {
  switch (action.type) {
    case ADD_REPLY: {
      const { id, currentUser, content, item } = action;

      const newReply = createComment(id, currentUser, content);
      const nextComments = mapNextComments(
        commentsState.comments,
        item,
        newReply,
      );

      const nextState = {
        ...commentsState,
        comments: nextComments,
      };

      localStorage.setItem("appData", JSON.stringify(nextState));

      return nextState;
    }
    case ADD_COMMENT: {
      const { id, content, currentUser } = action;
      const newComment = createComment(id, currentUser, content);
      const nextState = {
        ...commentsState,
        comments: [...commentsState.comments, newComment],
      };

      localStorage.setItem("appData", JSON.stringify(nextState));

      return nextState;
    }
    case EDIT_COMMENT: {
      const { item, content } = action;

      const editedItem = {
        ...item,
        content,
      };
      const nextComments = mapNextComments(commentsState.comments, editedItem);
      const nextState = {
        ...commentsState,
        comments: nextComments,
      };

      localStorage.setItem("appData", JSON.stringify(nextState));

      return nextState;
    }
    case REMOVE_COMMENT: {
      const { item } = action;
      const nextComments = filterNextComment(commentsState.comments, item);
      const nextState = {
        ...commentsState,
        comments: nextComments,
      };

      localStorage.setItem("appData", JSON.stringify(nextState));

      return nextState;
    }
    case RATE_SCORE: {
      const { item, scoreType, isRated } = action;
      const newScore =
        scoreType === SCORE_TYPE_UP ? item.score + 1 : item.score - 1;
      const editedItem = {
        ...item,
        score: newScore,
      };
      const nextComments = mapNextComments(commentsState.comments, editedItem);
      const nextRatedComments = isRated
        ? commentsState.ratedComments.filter(
            (ratedComment) => ratedComment.id !== item.id,
          )
        : [...commentsState.ratedComments, { id: item.id, scoreType }];

      const nextState = {
        comments: nextComments,
        ratedComments: nextRatedComments,
      };

      localStorage.setItem("appData", JSON.stringify(nextState));
      return nextState;
    }
  }
}

export default commentReducer;
