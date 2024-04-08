import React from 'react';
import ReactDOM from 'react-dom/client';
import Posts, {loader as postsLoaders} from './routes/Posts';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import RootLayout from './routes/RootLayout';
import NewPost,{action as newPostAction} from './routes/NewPost';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Posts />,
        loader: postsLoaders,
        children: [{ path: '/create-post', element: <NewPost />, action: newPostAction },],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
