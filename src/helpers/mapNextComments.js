const mapNextComments = (comments, item, reply) => {
  return comments.map((comment) => {
    if (comment.id === item.id) {
      if (reply) {
        const { replies = [] } = item;

        return {
          ...item,
          replies: [...replies, reply],
        };
      } else {
        return item;
      }
    } else {
      if (comment.replies?.length > 0) {
        return {
          ...comment,
          replies: mapNextComments(comment.replies, item, reply),
        };
      } else {
        return comment;
      }
    }
  });
};

export default mapNextComments;
