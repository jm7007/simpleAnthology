import React, { Component } from "react";
import axios from "axios";

import "../CSS/boardContentStyle.css";

class BoardUpdate extends Component {
  constructor(props){
    super(props);
    this.state = {
      no: 0,
      title: "",
      content: "",
      author: "",
      cre_date: ""
    }
    this.inputFormHandler = this.inputFormHandler.bind(this);
  }
  
  getBoard() {
    axios.post("http://localhost:8000/read", {no: this.props.no})
      .then(function(response){
        let [_board] = response.data;
        this.setState({
          no: _board.no,
          title: _board.title,
          content: _board.content,
          author: _board.author,
          cre_date: _board.cre_date.substring(0, 10)
        });
      }.bind(this))
      .catch(function(error){
        console.error(error);
      });
  }

  updateBoard() {
    axios.post("http://localhost:8000/update", {
      no: this.state.no, 
      title: this.state.title, 
      content: this.state.content
    })
      .then(function(response){
        //비워둠
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
          this.props.onButtonClick("read", this.state.no);
        }.bind(this)}>
          <div className="boardUpdateHeader">
            <div className="left">작성자: {this.state.author}</div>
            <div className="right">작성일: {this.state.cre_date}</div>
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

export default BoardUpdate;