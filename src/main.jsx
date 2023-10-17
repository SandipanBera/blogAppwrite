import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import store from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Protected from "./components/Authlayout.jsx";
import Home from "./components/pages/Home.jsx";
import AllPost from "./components/pages/AllPost.jsx";
import AddPost from "./components/pages/Addpost.jsx";
import Signup from "./components/pages/Signup.jsx";
import Login from "./components/pages/Login.jsx";
import Editpost from "./components/pages/Editpost.jsx";
import Post from "./components/pages/Post.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element:<Home /> ,
      },
      {
        path: "/all-posts",
        element: (
          <Protected authentication={true}>
            <AllPost />
          </Protected>
        )
      },
      {
        path: "/add-post",
        element: (
          <Protected authentication={true}>
            <AddPost />
          </Protected>
    
        ), 
      },
      {
        path: "/signup",
        element: (
        <Protected authentication={false}>
            <Signup />
        </Protected>
        
        ), 
      },
      {
        path: "/login",
        element: (
         <Protected authentication={false}>
            <Login />
          </Protected>
      
        ), 
      },
      {
        path: "/edit-post/:slug",
        element: (
            <Editpost />        
        ), 
      },
      {
        path: '/post/:slug',
        element:<Post/>
      }
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);
