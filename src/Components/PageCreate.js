import React, { Component } from "react";
import axios from "axios";

import "../CSS/boardContentStyle.css";

class PageCreate extends Component {
  state= {id: 0};

  setBoard(_author, _title, _content, _source) {
    axios.post("http://localhost:8000/create", {
      author: _author,
      title: _title, 
      content: _content,
      source: _source
    }).then(function(response){
        let _id = response.data.id;
        this.setState({id: _id});
      }.bind(this))
      .catch(function(error){
        console.error(error);
      });
  }

  componentDidUpdate(){
    this.props.onCreate("intro");
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
            e.target.content.value,
            e.target.source.value
          );
          this.componentDidUpdate();
        }.bind(this)}>
          <div className="boardInput">
            <input type="text" name="author" placeholder="작성자" required />
          </div>
          <div className="boardInput">
            <input className="txtTitle" type="text" name="title" placeholder="제목" required />
          </div>
          <div className="boardInput">
            <textarea name="content" placeholder="내용을 적어주세요"></textarea>
          </div>
          <div className="sourceInput">
            <input type="text" name="source" placeholder="출처를 적어주세요" />
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

export default PageCreate;