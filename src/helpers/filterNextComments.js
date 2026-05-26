const filterNextComment = (comments, item) => {
  const filteredArr = [];

  for (const comment of comments) {
    if (comment.id !== item.id) {
      if (comment.replies?.length > 0) {
        filteredArr.push({
          ...comment,
          replies: filterNextComment(comment.replies, item),
        });
      } else {
        filteredArr.push(comment);
      }
    }
  }

  return filteredArr;
};

export default filterNextComment;
