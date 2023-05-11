import React, { Component } from "react";
import axios from "axios";

import "../CSS/boardContentStyle.css";

class BoardRead extends Component {
  constructor(props){
    super(props);
    this.state = {
      board: {}
    }
  }
  
  getBoard() {
    axios.post("http://localhost:8000/read", {no: this.props.no})
      .then(function(response){
        let [_board] = response.data;
        this.setState({board: _board});
      }.bind(this))
      .catch(function(error){
        console.error(error);
      });
  }

  componentDidMount() {
    this.getBoard();
  }

  render() {
    const board = this.state.board;
    let cre_date = "";
    if (board.cre_date != undefined) {
      cre_date = board.cre_date.substring(0,10);
    }

    return (
      <>
        <table className="borderHeader">
          <tbody>
            <tr>
              <td>작성자: {board.author}</td>
              <td>작성일: {cre_date}</td>
            </tr>
            <tr><td colSpan="2" className="txtTitle">{board.title}</td></tr>
          </tbody>
        </table>

        <pre className="boardContent">{board.content}</pre>
        
        <div className="control">
          <div className="left">
            <button type="button" onClick={function(){
              this.props.onButtonClick("list");
            }.bind(this)}>목록</button>
          </div>
          <div className="right">
            <button type="button" onClick={function(){
              this.props.onButtonClick("update", board.no);
            }.bind(this)}>수정</button>
            <button type="button" onClick={function(){
              this.props.onButtonClick("delete", board.no);
            }.bind(this)}>삭제</button>
          </div>
        </div>
      </>
    );
  }
}

export default BoardRead;