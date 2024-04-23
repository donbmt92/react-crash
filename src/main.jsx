import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Posts from './routes/Taxes';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import RootLayout from './routes/RootLayout';
import NewTaxes from './routes/NewTaxes';
import Taxes from './routes/Taxes';
import EditTaxe from './routes/EditTaxe';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Taxes />,
        children: [
          { path: '/search', element: <NewTaxes /> },
          { path: '/edit/:id', element: <EditTaxe /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
