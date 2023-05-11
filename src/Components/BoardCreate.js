import React, { Component } from "react";
import axios from "axios";

import "../CSS/boardContentStyle.css";

class BoardCreate extends Component {
  state= {id: 0};

  setBoard(_author, _title, _content) {
    let _cre_date = new Date().toISOString().substring(0, 10);
    axios.post("http://localhost:8000/create", {
      author: _author,
      title: _title, 
      content: _content,
      cre_date: _cre_date
    }).then(function(response){
        let _id = response.data.id;
        this.setState({id: _id});
      }.bind(this))
      .catch(function(error){
        console.error(error);
      });
  }

  componentDidUpdate(){
    this.props.onCreate("read", this.state.id);
  }

  render() {
    return (
      <>
        <hr />
        <form action="#" method="post" onSubmit={function(e){
          e.preventDefault();
          this.setBoard(
            e.target.author.value, 
            e.target.title.value, 
            e.target.content.value
          );
        }.bind(this)}>
          <div className="boardInput">
            <input type="text" name="author" placeholder="작성자" required />
          </div>
          <div className="boardInput">
            <input className="txtTitle" type="text" name="title" placeholder="제목" required />
          </div>
          <div className="boardInput">
            <textarea name="content"></textarea>
          </div>
          <div className="control">
            <div className="right">
              <button type="submit">등록</button>
            </div>
          </div>
        </form>
      </>
    );
  }
}

export default BoardCreate;