import { useState } from 'react';
import PostList from '../components/PostList';
import { Outlet } from 'react-router-dom';

function Posts() {
  return (
    <>
      <Outlet />
      <main>
        <PostList />
      </main>
    </>
  );
}

export default Posts;

export async function loader() {
  const response = await fetch('http://localhost:3030/posts');
  const resData = await response.json();
  console.log(resData);
  return resData.posts;
}
