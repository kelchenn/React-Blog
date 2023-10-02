import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useStorageState } from "react-storage-hooks"
import firebase from "./firebase";

import "./App.css";

import UserContext from "./context/UserContext";

import Header from "./components/Header";
import Posts from "./components/Posts";
import PostWrapper from "./components/PostWrapper";
import EditPostWrapper from "./components/EditPostWrapper";
import PostForm from "./components/PostForm";
import NotFound from "./components/NotFound";
import Message from "./components/Message";
import Login from "./components/Login";

const App = (props) => {
  // save posts and user to local storage
  const [posts, setPosts] = useStorageState(localStorage, `state-posts`, []); 
  const [user, setUser] = useStorageState(localStorage, `state-user`, []); 

  const [message, setMessage] = useState(null);

  // create the slug using the title, but replace all spaces with hyphens (-)
  const getNewSlugFromTitle = (title) => encodeURIComponent(title.toLowerCase().split(" ").join("-"));

  const addNewPost = (post) => {
    post.id = posts.length + 1;
    post.slug = getNewSlugFromTitle(post.title);
    setPosts([...posts, post]);
    setFlashMessage(`saved`);
  };

  const updatePost = (post) => {
    //update post slug using title
    post.slug = getNewSlugFromTitle(post.title);
    const index = posts.findIndex((p) => p.id === post.id);

    // update the posts array
    const oldPosts = posts.slice(0, index).concat(posts.slice(index + 1));

    // sort by id so edited post is in same position as before
    const updatedPosts = [...oldPosts, post].sort((a, b) => a.id - b.id);

    setPosts(updatedPosts);
    setFlashMessage(`updated`);
  };

  const deletePost = (post) => {
    if (window.confirm("Delete this post?")) {
      const updatedPosts = posts.filter((p) => p.id !== post.id);
      setPosts(updatedPosts);
      setFlashMessage(`deleted`);
    }
  };

  const setFlashMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 1500);
  };

  const onLogin = (email, password) => {
    {/* authenticate login with firebase */}

    firebase  
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser({
          email: response.user["email"],
          isAuthenticated: true,
        });
      })
      .catch(error => console.error(error));
  };

  const onLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser({ isAuthenticated: false });
      })
      .catch((error) => console.error(error));
  };

  return (
    <BrowserRouter> 
      <UserContext.Provider value={{ user, onLogin, onLogout }}> 
        <div className = "App"> 
          <Header/>
          {message && <Message type = { message } />}

          <Routes>
            {/* check if we are on the main route of the site (locally http://localhost:3000/),
            if we are, call <Posts/> component */}
            <Route 
              exact = { true } 
              path = "/" 
              element = {<Posts posts = { posts } deletePost = { deletePost }/>} 
            />

            <Route 
              path = "/post/:postSlug" 
              element = {<PostWrapper posts = { posts }/>}
            />

            <Route
              exact = { true } 
              path = "/new" 
              element = { user.isAuthenticated ? (
                <PostForm 
                  addNewPost = { addNewPost } 
                  post = {{ id: 0, slug: "", title: "", content: ""}}
                />
              ) : (<Navigate to = "/login"/>)}
            />

            <Route 
              path = "/edit/:postSlug"
              element = {<EditPostWrapper updatePost = { updatePost } posts = { posts }/>}
            /> 

            <Route
              exact = { true } 
              path = "/login" 
              element = { !user.isAuthenticated ? <Login/> : <Navigate to = "/"/>}
            />

            <Route path = "*" element = { <NotFound/> }/>
          </Routes>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;