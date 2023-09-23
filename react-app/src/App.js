import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";
import Posts from "./components/Posts";
import PostWrapper from "./components/PostWrapper";
import PostForm from "./components/PostForm";
import NotFound from "./components/NotFound";
import Message from "./components/Message";

const App = (props) => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState(null);

  const addNewPost = (post) => {
    post.id = posts.length + 1;
    post.slug = encodeURIComponent(
      post.title.toLowerCase().split(" ").join("-")
    );
    setPosts([...posts, post]);
    setFlashMessage(`saved`);
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
            path = "/post/:id" 
            element = {<PostWrapper posts = { posts }/>}
          />
          <Route
            exact = { true } path = "/new" element = {<PostForm addNewPost = { addNewPost }/>}>
          </Route>
          <Route path = "*" element = { <NotFound/> }/>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;