import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";
import Posts from "./components/Posts";
import PostWrapper from "./components/PostWrapper";
import EditPostWrapper from "./components/EditPostWrapper";
import PostForm from "./components/PostForm";
import NotFound from "./components/NotFound";
import Message from "./components/Message";

const App = (props) => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState(null);

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

  const setFlashMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 1500);
  };

  return (
    <BrowserRouter> 
      <div className = "App"> 
        <Header/>
        {message && <Message type = { message } />}

        <Routes>
          {/* check if we are on the main route of the site (locally http://localhost:3000/),
          if we are, call <Posts/> component */}
          <Route exact = { true } path = "/" element = {<Posts posts = { posts }/>} />

          <Route 
            path = "/post/:postSlug" 
            element = {<PostWrapper posts = { posts }/>}
          />

          <Route
            exact = { true } path = "/new" 
            element = {<PostForm 
              addNewPost = { addNewPost } 
              post = {{ id: 0, slug: "", title: "", content: ""}}
            />}>
          </Route>

          <Route 
            path = "/edit/:postSlug"
            element = {<EditPostWrapper updatePost = { updatePost } posts = { posts }/>}> 
          </Route>

          <Route path = "*" element = { <NotFound/> }/>
        </Routes>

      </div>
    </BrowserRouter>
  );
};

export default App;