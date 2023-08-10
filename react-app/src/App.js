import React from "react";
import Welcome from './Welcome';
import Divider from './Divider';
import Footer from './Footer';
import './App.css';

function App() {
  return React.createElement(
    "article",
    { className: "post" },
    Welcome(),
    Divider(),
    React.createElement(
      "div",
      { className: "entry-content" },
      React.createElement("p", {}, "Main content")
    ),
    Footer()
  );
};

export default App;
