import getDateFormat from "./getDateFormat";

const createComment = (id, user, content) => {
  return {
    id,
    content,
    createdAt: Date.now(),
    score: 0,
    user,
    replies: [],
  };
};

export default createComment;
