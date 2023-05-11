import React, { Component } from "react";
import axios from "axios";

import "../CSS/intro.css";

class Intro extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  getIntro() {
    axios.get("http://localhost:8000/intro", {})
      .then(function (response) {

      }.bind(this))
      .catch(function (error) {
        console.error(error);
      });
  }

  render() {

    return (
      <>
        <a href="#" onClick={function (e) {
          e.preventDefault();
          this.props.onSelectItem("book");
        }.bind(this)}>
          <div className="intro-page">
            <h2 className="open">open</h2>
          </div>
        </a>
      </>
    );
  }
}

export default Intro;