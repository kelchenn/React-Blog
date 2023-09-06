import React, {useState} from "react";
import "./App.css";
import Header from "./components/Header";
import Posts from "./components/Posts";
import {BrowserRouter as Router, Routes, Route, Redirect} from "react-router-dom";

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
    <Router> 
      <div className = "App"> 
        <Header/>
        <Routes>
          {/* check if we are on the main route of the site (locally http://localhost:3000/),
          if we are, call <Posts/> component */}
          <Route path = "/" element = {<Posts posts = {posts}/>} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;