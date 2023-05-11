import React, { Component } from "react";
import axios from "axios";

import "../CSS/book.css";

class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNo: 0,
            title: "",
            content: "",
            author: "",
            source: "",
            pages: []
        }
        this.inputFormHandler = this.inputFormHandler.bind(this);
    }

    getList() {
        axios.get("http://localhost:8000/book", {})
            .then(function (response) {
                this.setState({ pages: response.data });
            }.bind(this))
            .catch(function (error) {
                console.error(error);
            });
    }

    componentDidMount() {
        this.getList();
    }

    inputFormHandler(e) {
        this.setState({[e.target.name]: e.target.value});
      }

    updateBoard() {
        alert("업데이트보드메서드");
        axios.post("http://localhost:8000/update", {
          id: this.state.pageNo, 
          title: this.state.title,
          content: this.state.content,
          author: this.state.author,
          source: this.state.source
        })
          .then(function(response){
            //비워둠
          }.bind(this))
          .catch(function(error){
            console.error(error);
          });
    }

    pageSlide(direction) {
        return () => {
            let pages = this.state.pages;
            switch (direction) {
                case "forward": {
                    if (this.state.pageNo == pages.length) { break; }
                    document.getElementById("list-page-" + this.state.pageNo).classList.remove("page-from-left");
                    document.getElementById("list-page-" + this.state.pageNo).classList.remove("page-from-right");
                    document.getElementById("list-page-" + this.state.pageNo).classList.add("page-to-left");

                    document.getElementById("list-page-" + (++this.state.pageNo)).classList.remove("page-to-left");
                    document.getElementById("list-page-" + this.state.pageNo).classList.remove("page-to-right");
                    document.getElementById("list-page-" + this.state.pageNo).classList.add("page-from-right");
                    this.setInputState();
                    break;
                }
                case "back": {
                    if (0 == this.state.pageNo) { break; }
                    document.getElementById("list-page-" + this.state.pageNo).classList.remove("page-from-left");
                    document.getElementById("list-page-" + this.state.pageNo).classList.remove("page-from-right");
                    document.getElementById("list-page-" + this.state.pageNo).classList.add("page-to-right");

                    document.getElementById("list-page-" + (--this.state.pageNo)).classList.remove("page-to-left");
                    document.getElementById("list-page-" + this.state.pageNo).classList.remove("page-to-right");
                    document.getElementById("list-page-" + this.state.pageNo).classList.add("page-from-left");
                    this.setInputState();
                    break;
                }
                default: break;
            }
        };
    }
    setInputState(){
        let pageId = this.state.pageNo;
        if(pageId == 0){return;}
        let targetPage = document.getElementById("list-page-"+pageId);
        let pageTitle = targetPage.querySelector(".page-title").value;
        let pageContent = targetPage.querySelector(".page-content").value;
        let pageAuthor = targetPage.querySelector(".page-author").value;
        let pageSource = targetPage.querySelector(".page-source").value;
        this.setState({
            title: pageTitle,
            content: pageContent,
            author: pageAuthor,
            source: pageSource
        });
    }

    render() {
        let pages = this.state.pages;

        let list = [];
        let index = [];
        for (let i = 0; i < pages.length; i++) {
            let indexTitlePage = pages[i];
            index.push(
                <li key={"index-" + i}>
                    <h3>{indexTitlePage.id} . {indexTitlePage.title}</h3>
                </li>);
        }
        list.push(
            <li id={"list-page-0"} className="list-page" key={0}>
                <div className="page-no">목차</div>
                <ul>
                    {index}
                </ul>
            </li>
        );
        for (let i = 0; i < pages.length; i++) {
            let page = pages[i];
            list.push(
                <li id={"list-page-" + page.id} key={page.id} className="list-page">
                    <form action="#" method="post" onSubmit={function (e) {
                        e.preventDefault();
                        this.updateBoard();
                        this.props.onButtonClick("book");
                    }.bind(this)}>
                        <div className="page-no">{page.id}</div>
                        <input name="title" className="page-title" defaultValue={page.title} onChange={this.inputFormHandler}/>
                        <input name="author" className="page-author" defaultValue={page.author} onChange={this.inputFormHandler}/>
                        <textarea name="content" className="page-content" defaultValue={page.content} onChange={this.inputFormHandler}></textarea>
                        <input name="source" className="page-source" defaultValue={page.source} onChange={this.inputFormHandler}/>
                    <div className="controlbar">
                        <button>새 글</button>
                        <button type="submit">수정</button>
                        <button>삭제</button>
                    </div>
                    </form>
                </li>
            );
        }

        return (
            <>
                <ul className="ul-book">
                    <div className="slide-left" onClick={this.pageSlide("back")}>《</div>
                    <div className="slide-right" onClick={this.pageSlide("forward")}>》</div>
                    {list}
                </ul>
                <div className="control">
                    <div className="right">
                        <button type="button" onClick={function () {
                            this.props.onSelectItem("create");
                        }.bind(this)}>글쓰기</button>
                    </div>
                </div>
            </>
        );
    }
}

export default Book;