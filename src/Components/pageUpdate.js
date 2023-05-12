import React, { Component } from "react";
import axios from "axios";

import "../CSS/boardContentStyle.css";

class PageUpdate extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: 0,
      title: "",
      content: "",
      author: "",
      source: ""
    }
    this.inputFormHandler = this.inputFormHandler.bind(this);
  }
  
  getBoard() {
    axios.post("http://localhost:8000/read", {id: this.props.no})
      .then(function(response){
        let [_board] = response.data;
        this.setState({
          id: _board.id,
          title: _board.title,
          content: _board.content,
          author: _board.author,
          source: _board.source
        });
      }.bind(this))
      .catch(function(error){
        console.error(error);
      });
  }

  updateBoard() {
    axios.post("http://localhost:8000/update", {
      id: this.state.id, 
      title: this.state.title,
      content: this.state.content,
      author: this.state.author,
      source: this.state.source
    })
      .then(function(response){

      }.bind(this))
      .catch(function(error){
        console.error(error);
      });
}

  componentDidMount() {
    this.getBoard();
  }

  inputFormHandler(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    return (
      <>
        <hr />
        <form action="#" method="post" onSubmit={function(e){
          e.preventDefault();
          this.updateBoard();
          this.props.onButtonClick("book");
        }.bind(this)}>
          <div className="boardUpdateHeader">
            <input className="left" value={this.state.author} onChange={this.inputFormHandler}/>
            <input className="right" value={this.state.source} onChange={this.inputFormHandler}/>
          </div>
          <div className="boardInput">
            <input className="txtTitle" type="text" name="title" placeholder="제목" 
              value={this.state.title} onChange={this.inputFormHandler} />
          </div>
          <div className="boardInput">
            <textarea name="content" value={this.state.content} onChange={this.inputFormHandler}
              ></textarea>
          </div>
          <div className="control">
            <div className="right">
              <button type="submit">수정</button>
            </div>
          </div>
        </form>
      </>
    );
  }
}

export default PageUpdate;