import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Redirect, useParams } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";
import Posts from "./components/Posts";
import PostWrapper from "./components/PostWrapper";
import NotFound from "./components/NotFound";

const App = (props) => {
  const [posts, setPosts] = useState([
    { 
      id: 1,
      slug: "hello-react",
      title: "Hello React",
      content: "Hello",
    },
    {
      id: 2,
      slug: "content-here",
      title: "Content here",
      content: "Hi",
    },
    {
      id: 3,
      slug: "hello-world",
      title: "Hello world",
      content: "Hey",
    }
  ]);

  return (
    <BrowserRouter> 
      <div className = "App"> 
        <Header/>
        <Routes>
          {/* check if we are on the main route of the site (locally http://localhost:3000/),
          if we are, call <Posts/> component */}
          <Route exact = { true } path = "/" element = {<Posts posts = { posts }/>} />;
          <Route 
            path = "/post/:id" 
            element = {<PostWrapper posts = { posts }/>}
          />;
          <Route path = "*" element = {<NotFound/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;