import React, { Component } from "react";
import axios from "axios";

import PageCreate from "./PageCreate";
import PageUpdate from "./PageUpdate";
import Intro from "./Intro";
import Book from "./Book";

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "intro",
      selectBoardNo: 0,
    };
    this.setModeAndNo = this.setModeAndNo.bind(this);
  }

  deleteBoard(_id) {
    axios.post("http://localhost:8000/delete", {
      id: _id
    })
      .then(function(response){
        //비워둠
      }.bind(this))
      .catch(function(error){
        console.error(error);
      });
  }

  setModeAndNo(_mode, no=0){
    if(_mode === "delete") {
      if(confirm("정말로 삭제하겠습니까?")) {
        this.deleteBoard(no);
        this.setState({
          mode: "intro"
        });
        alert("삭제 되었습니다.");
      }
    } else {
      this.setState({
        mode: _mode,
        selectBoardNo: no
      });
    }
  }

  getContent() {
    let mode = this.state.mode;
    let section = null;

    if(mode === "intro") {
      section = <Intro onSelectItem={this.setModeAndNo} />;
    } else if(mode == "create") {
      section = <PageCreate onCreate={this.setModeAndNo}/>
    } else if(mode === "update") {
      section = <PageUpdate no={this.state.selectBoardNo} onButtonClick={this.setModeAndNo}/>
    } else if(mode === "book"){
      section = <Book pageNo={this.state.selectBoardNo} onSelectItem={this.setModeAndNo} onButtonClick={this.setModeAndNo}/>;
    }

    return section;
  }

  render() {
    return (
      <article>
        {this.getContent()}
      </article>
    );
  }
}

export default Article;