import { useContext, useRef, useState } from "react";
import "./Comment.css";
import { UserContext } from "../../context/UserContext";
import CommentInput from "../CommentInput/CommentInput";
import { SCORE_TYPE_DOWN, SCORE_TYPE_UP } from "./constans";
import ScoreButton from "../ScoreButton/ScoreButton";
import {
  CommentContext,
  CommentDispatchContext,
} from "../../context/CommentsContext";
import {
  ADD_REPLY,
  EDIT_COMMENT,
  RATE_SCORE,
  REMOVE_COMMENT,
} from "../../constants/actionTypes";
import { getNextId } from "../../helpers/counterID";
import ActionButton from "../ActionButton/ActionButton";
import {
  DELETE_TYPE_BTN,
  EDIT_TYPE_BTN,
  REPLY_TYPE_BTN,
} from "../ActionButton/constans";
import Modal from "../Modal/Modal";
import getDateFormat from "../../helpers/getDateFormat";

function Comment({ item, onReplyClick, isReply, replyId }) {
  const [isEdit, setEdit] = useState(false);
  const currentUser = useContext(UserContext);
  const { ratedComments } = useContext(CommentContext);
  const dispatch = useContext(CommentDispatchContext);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const { username, image } = item.user;
  const { replies = [], createdAt, content, score } = item;
  const isEditable = currentUser.username === username;
  const closeInput = () => onReplyClick(null);
  const isRated = ratedComments.find(({ id }) => item.id === id);
  const renderReply = (text) => {
    const match = text.match(/^(@\w+),?\s*(.*)$/);

    if (!match) {
      return <>{text}</>;
    }

    const [, username, message] = match;

    return (
      <>
        <span className="comment__username-reply">{username}, </span>
        {message}
      </>
    );
  };

  return (
    <div className="comment">
      <div className="comment__wrap">
        <div className="comment__score">
          <ScoreButton
            Disabeld={isRated?.scoreType === SCORE_TYPE_UP}
            isActive={isRated?.scoreType === SCORE_TYPE_UP}
            onClick={() => {
              dispatch({
                type: RATE_SCORE,
                item,
                scoreType: SCORE_TYPE_UP,
                isRated,
              });
            }}
          >
            <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                fill="#C5C6EF"
              />
            </svg>
          </ScoreButton>
          <span className="comment__score-value">{score}</span>
          <ScoreButton
            Disabeld={isRated?.scoreType === SCORE_TYPE_DOWN || score <= 0}
            isActive={isRated?.scoreType === SCORE_TYPE_DOWN}
            onClick={() => {
              dispatch({
                type: RATE_SCORE,
                item,
                scoreType: SCORE_TYPE_DOWN,
                isRated,
              });
            }}
          >
            <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                fill="#C5C6EF"
              />
            </svg>
          </ScoreButton>
        </div>
        <div className="comment__content">
          <div className="comment__header">
            <div className="comment__user-info">
              <img className="comment__userimg" src={image.png} />
              <span className="comment__username">
                {username}{" "}
                {isEditable ? <span className="comment__badge">you</span> : ""}
              </span>
              <span className="comment__createAt">
                {getDateFormat(createdAt)}
              </span>
            </div>
            <div className="comment__controls">
              {isEditable && (
                <>
                  <ActionButton
                    className={"action-edit"}
                    type={EDIT_TYPE_BTN}
                    onClick={() => setEdit(true)}
                  >
                    Edit
                  </ActionButton>
                  <ActionButton
                    className={"action-delete"}
                    type={DELETE_TYPE_BTN}
                    onClick={() => setIsModalDeleteOpen(true)}
                  >
                    Delete
                  </ActionButton>
                </>
              )}
              <ActionButton
                className={"action-reply"}
                type={REPLY_TYPE_BTN}
                onClick={() => onReplyClick(item.id)}
              >
                Reply
              </ActionButton>
            </div>
          </div>
          <div className="comment__text">
            {isEdit ? (
              <>
                <CommentInput
                  onSend={(content) => {
                    setEdit(false);
                    dispatch({
                      type: EDIT_COMMENT,
                      item,
                      content,
                    });
                  }}
                  isEdit={isEdit}
                  commentText={content}
                  sendTitle={"Update"}
                  onClose={() => setEdit(false)}
                />
              </>
            ) : (
              renderReply(content)
            )}
          </div>
        </div>
      </div>
      {isReply && (
        <div className="comment__reply">
          <CommentInput
            onSend={(content) => {
              closeInput();
              dispatch({
                type: ADD_REPLY,
                id: getNextId(),
                item,
                content,
                currentUser,
              });
            }}
            sendTitle={"Reply"}
            commentText={`@${username}, `}
            onClose={closeInput}
          />
        </div>
      )}
      {replies.length > 0 && (
        <ul className="comment__replies">
          {replies.map((reply) => (
            <li key={reply.id}>
              <Comment
                replyId={replyId}
                isReply={replyId === reply.id}
                onReplyClick={onReplyClick}
                item={reply}
              />
            </li>
          ))}
        </ul>
      )}
      <Modal
        title={"Delete comment"}
        text={`Are you sure want to delete this comment? This will remove the comment and can't be undone`}
        onSubmit={() => {
          dispatch({
            type: REMOVE_COMMENT,
            item,
          });
        }}
        onClose={() => setIsModalDeleteOpen(false)}
        buttons={{
          submitText: "Yes, delete",
          closeText: "No, cancel",
          submitTypeClass: "delete",
        }}
        isOpen={isModalDeleteOpen}
      />
    </div>
  );
}

export default Comment;
