import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';

import Layout from './components/Layout';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import PostDetails from './pages/PostDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Authors from './pages/Authors';
import UserProfile from './pages/secure-route/UserProfile';
import CreatePost from './pages/secure-route/CreatePost';
import CategoryPosts from './pages/CategoryPosts';
import Dashboard from './pages/Dashboard';
import EditPost from './pages/secure-route/EditPost';
import DeletePost from './pages/secure-route/DeletePost';
import Logout from './pages/secure-route/Logout';
import { Toaster } from 'react-hot-toast';
import SecureRoute from './pages/secure-route/SecureRoute';
import UserProvider from './Context/UserProvider';
import PublicUserProfile from './components/PublicUserProfile';


const router = createBrowserRouter([{
  path: "/",
  
  element: <Layout/>,
  errorElement: <ErrorPage/>,
  children: [
    {index: true, element: <Home/>},
    {path: "register", element: <Register/>},
    {path: "login", element: <Login/>},    
    {path: "authors", element: <Authors/>},
    {path: "posts/:postId", element: <PostDetails/>},
    {path: "post/user/:userId", element: <PublicUserProfile/>},
    // {path: "post/current-user/:userid", element: <AuthorPost/>},
    {path: "posts/categories/:categoryId", element: <CategoryPosts/>},
    {path: "posts/categories", element: <CategoryPosts/>},
    /* Secure route */
    {path: "user", element: <SecureRoute />,
      children: [
        {path: "myposts/:userId", element: <Dashboard/>},
        {path: "profile/:userId", element: <UserProfile/>},
        {path: "create-post", element: <CreatePost/>},
        {path: ":userId/posts/:postId/edit", element: <EditPost/>},
        {path: ":userId/posts/:postId/delete", element: <DeletePost />},
        {path: "logout", element: <Logout/>}
      ]
    }
  ]
}])


const root = ReactDOM.createRoot(document.getElementById('root'));

<UserProvider>
  {router}
</UserProvider>

root.render(
  <React.StrictMode>
      <Toaster />
      <RouterProvider router={router}/>
  </React.StrictMode>
);