import Post from './Post';
import classes from './PostList.module.css';
import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

// const [posts, setPosts] = useState([]);

//  fetch('http://localhost:3030/posts').then(response => response.json()).then(data=>{
//   setPosts(data.posts)
// })
// const [isFeatching, setIsFeatching] = useState(false);
// useEffect(() => {
//   async function fetchPost() {
//     const response = await fetch('http://localhost:3030/posts');
//     const resData = await response.json();
//     setPosts(resData.posts);
//   }
//   console.log(!isFeatching);
//   fetchPost();
//   setIsFeatching(false);
// }, [isFeatching]);
// function addPostHandler(params) {
//   setIsFeatching(true);
//   fetch('http://localhost:3030/posts', {
//     method: 'POST',
//     body: JSON.stringify(params),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   setPosts((existPost) => [params, ...existPost]);
// }
function PostList() {
  const posts = useLoaderData();
  
  return (
    <>
      {posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post, index) => (
            <Post key={index} author={post.author} body={post.body} />
          ))}
        </ul>
      )}
      {posts.length == 0 && (
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h2>Không có bài đăng nào</h2>
          <p>Đăng cái gì đó đi ~~</p>
        </div>
      )}
    </>
  );
}

export default PostList;
