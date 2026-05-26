import { createContext, useReducer } from "react";
import APIData from "../../data.json";
import { ADD_COMMENT } from "../constants/actionTypes";
import { UserContext } from "./UserContext";
import { getNextId } from "../helpers/counterID";
import CommentInput from "../components/CommentInput/CommentInput";
import commentReducer from "../reducers/commentReducers";

export const CommentContext = createContext(null);
export const CommentDispatchContext = createContext(null);

const storage = localStorage.getItem("appData");

let initialComments = {
  comments: APIData.comments,
  ratedComments: [],
};

if (storage) {
  initialComments = JSON.parse(storage);
}

const { currentUser } = APIData;

export function CommentProvider({ children }) {
  const [commentsState, dispatch] = useReducer(commentReducer, initialComments);
  const addComment = (content) => {
    dispatch({
      type: ADD_COMMENT,
      id: getNextId(),
      content,
      currentUser,
    });
  };

  return (
    <UserContext value={currentUser}>
      <CommentContext value={commentsState}>
        <CommentDispatchContext value={dispatch}>
          {children}
        </CommentDispatchContext>
      </CommentContext>
    </UserContext>
  );
}
