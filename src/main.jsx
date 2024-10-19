import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home.jsx';
import AuthLayout from './Components/AuthLayout.jsx';
import Login from './Pages/Login.jsx';
import SignUp from './Pages/SignUp.jsx';
import Allposts from './Pages/Allposts.jsx';
import Addpost from './Pages/Addpost.jsx';
import EditPost from './Pages/EditPost.jsx';
import Post from './Pages/Post.jsx';
import About from './Pages/About.jsx';
import Services from './Pages/Services.jsx';
import Contact from './Pages/Contact.jsx';
import Notfound from './Pages/Notfound.jsx';

// Define routes using `createBrowserRouter`
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      {
        path: '/login',
        element: (
          <AuthLayout Authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: '/signup',
        element: (
          <AuthLayout Authentication={false}>
            <SignUp />
          </AuthLayout>
        ),
      },{
        path: '/about',
        element: (
            <About />
        ),
      },
      {
        path: '/contact',
        element: (
            <Contact />
        ),
      },
      {
        path: '/services',
        element: (
            <Services />
        ),
      },
      {
        path: '/all-posts',
        element: (
          <AuthLayout authentication>
            <Allposts />
          </AuthLayout>
        ),
      },
      {
        path: '/add-post',
        element: (
          <AuthLayout authentication>
            <Addpost />
          </AuthLayout>
        ),
      },
      {
        path: '/edit-post/:slug',
        element: (
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        ),
      },
      { path: '/post/:slug', element: <Post /> },
      { path: '*', element: <Notfound /> },
    ],
  },
]);

// Render the App using `RouterProvider`
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
