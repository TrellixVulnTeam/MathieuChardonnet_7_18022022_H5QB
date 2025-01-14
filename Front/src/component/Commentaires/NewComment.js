import React from "react"
import { useState } from "react"
import { POST } from '../Api/Axios';
import ENDPOINTS from "../Api/Endpoints";
import SendIcon from '@mui/icons-material/Send';

function NewComment({ postId, newComment }) {
  const [commentMessage, setCommentMessage] = useState("");
  const [, setSendButton] = useState(false);
  const [, setErrorData] = useState("")
  const userId = JSON.parse(localStorage.getItem("user")).userId
  const userPseudo = JSON.parse(localStorage.getItem("user")).pseudo

  const onSubmit = data => {

    POST(ENDPOINTS.CREATE_COMMENT, {
      pseudo: userPseudo,
      userId: userId,
      postId: postId,
      content: commentMessage,
    })
    .then (response =>{
      if (response.status === 400) {
        setErrorData("Vous n'êtes pas inscrit!");
      }
      if (response.status === 201) {
        newComment(response.data.comment)
        window.location.reload()
      }
    })
    .catch (error => {
    });
  }

  return (
    <div>
      <form onSubmit={(onSubmit)} className="comment-form">
        <input className="new-comment"
          type="text"
          placeholder="Écrivez un commentaire..."
          onChange={e => setCommentMessage(e.target.value)}
          value={commentMessage}
          id="input-comment"
        />
        {setSendButton && (
          <SendIcon className="send-icon" onClick={onSubmit} />
        )}
      </form>
    </div>
  )
}

export default NewComment;