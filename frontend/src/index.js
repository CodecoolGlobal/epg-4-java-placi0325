import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LandingPage from './Pages/LandingPage';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from './Pages/ErrorPage';
import ProductList from './Pages/ProductList';
import SignUpForm from './Pages/SignUpForm';
import LoginForm from './Pages/LoginForm';
import ProductPage from './Pages/ProductPage';
import NewProductCreator from './Pages/NewProductCreator';
import { ClientContextProvider } from './Context/ClientContext';


const router = createBrowserRouter([
{
  path: "/",
  errorElement: <ErrorPage />,
  children: [
    {
      path: "/",
      element: <ProductList />
    },
    {
      path: "/landing",
      element: <LandingPage />
    },
    {
      path: "/signup",
      element: <SignUpForm />
    },
    {
      path: "/login",
      element: <LoginForm />
    },
    {
      path:"/products/:id",
      element:<ProductPage/>
    },
    {
      path: "/newproduct",
      element: <NewProductCreator />
    }
  ]
}
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ClientContextProvider>
      <RouterProvider router={router} />
    </ClientContextProvider>
  </React.StrictMode>
);

reportWebVitals();
