import React, { Component } from "react";
import axios from "axios";

import "../CSS/boardListStyle.css";

class BoardList extends Component {
  constructor(props){
    super(props);
    this.state = {
      boards: []
    }
  }
  
  getList() {
    axios.get("http://localhost:8000/list", {})
      .then(function(response){
        this.setState({boards: response.data});
      }.bind(this))
      .catch(function(error){
        console.error(error);
      });
  }

  componentDidMount() {
    this.getList();
  }

  render(){
    let boards = this.state.boards;
    
    let rows = [];
    for(let i=0; i<boards.length; i++){
      let board = boards[i];
      let cre_date = board.cre_date.substring(0, 10);
      rows.push(
        <tr key={board.no}>
          <td>{board.no}</td>
          <td><a href="#" onClick={function(e){
            e.preventDefault();
            this.props.onSelectItem("read", board.no);
          }.bind(this)}>{board.title}</a></td>
          <td>{board.author}</td>
          <td>{cre_date}</td>
        </tr>
      );
    }
    
    return (
      <>
        <table className="boardList">
          <thead>
            <tr>
              <th></th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
        <div className="control">
          <div className="right">
            <button type="button" onClick={function(){
              this.props.onSelectItem("create");
            }.bind(this)}>글쓰기</button>
          </div>
        </div>
      </>
    );
  }
}

export default BoardList;