import React from 'react';
import { useState, useEffect } from "react";
import { GET } from '../component/Api/Axios';
import { DELETE } from '../component/Api/Axios';
import ENDPOINTS from '../component/Api/Endpoints';
import '../component/Post/PostCreate'
import '../component/Post/PostFeed'

function Feed() {
  const [posts, setPosts] = useState([])
  const Token = localStorage.getItem("Token")
  const user = localStorage.getItem('user')
  const userId = JSON.parse(user).id

  async function loadPosts() {
    const resPost = GET(ENDPOINTS.GET_ALL_POSTS, {
      userId: userId,
      postId: postId,
      content: commentMessage,
    })
    if (resPost.status === 400) {
      setErrorData("Posts non trouvés!")
    }
    if (resPost.status === 200) {
      setErrorData("Posts trouvés!")
    }
  }

  useEffect(() => {
      loadPosts()
  }, [Token, setPosts, userId])
  const addnewpost = () => {
      window.location.reload()
  }

  function deletePost(id) {
    const data = posts.filter(post => post.id != id);
    const resDelete = DELETE(ENDPOINTS.DELETE_POST, {
      userId: data.userId,
      postId: data.postId,
      content: data.commentMessage,
    })
    if (resDelete.status === 500) {
      setErrorData("Post non trouvé!");
    }
    if (resDelete.status === 400) {
      setErrorData("Post non supprimé!");
    }
    if (resDelete.status === 200) {
      setErrorData("Post supprimé!");
      window.location.reload()
    }
  }

  return (
    <main className="main">
      <div className="feed">
        <div className='post'>
          <PostCard addPost={addnewpost}></PostCard>
        </div>
        <h1> Nouvelles publications:</h1>

        {posts.map(post => (
          <div className="allPost" key={post.id}>
            <PostFeed post={post}
            deletePost={() => deletePost(post.id)} />
          </div>
        ))}

      </div>
    </main>
  );
};


export default Feed;