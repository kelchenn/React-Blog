import React, {useState} from "react";
import "./App.css";
import Header from "./components/Header";
import Posts from "./components/Posts";

const App = (props) => {
  const [posts, setPosts] = useState([
    { 
      id: 1,
      title: "Hello React",
      content: "Hello",
    },
    {
      id: 2,
      title: "Content here",
      content: "Hi",
    },
    {
      id: 3,
      title: "Hello world",
      content: "Hey",
    }
  ]);

  return (
    <div className = "App"> 
    <Header/>
    <Posts posts = {posts}/>
    </div>
  );
};

export default App;