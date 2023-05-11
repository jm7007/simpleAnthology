import React, { Component } from "react";

import "./CSS/style.css";

import Header from "./Components/Header";
import Article from "./Components/Article";

class App extends Component {
  render(){
    return (
      <>
        <Header />
        <Article />
      </>
    );
  }
}

export default App;