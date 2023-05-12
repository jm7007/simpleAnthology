import React, { Component } from "react";
import axios from "axios";

import "../CSS/book.css";

class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNo: 0,
            pages: []
        }
        
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

    pageSlide(direction) {
        return () => {
            let pages = this.state.pages;
            switch (direction) {
                case "forward": {
                    if (this.state.pageNo == pages[pages.length-1].id) { break; }
                    try{
                        document.getElementById("list-page-" + this.state.pageNo).classList.remove("page-from-left");
                    }catch(e){
                        this.state.pageNo++;
                        return;
                    }
                    document.getElementById("list-page-" + this.state.pageNo).classList.remove("page-from-right");
                    document.getElementById("list-page-" + this.state.pageNo).classList.add("page-to-left");
                    this.state.pageNo++;
                    try{
                    document.getElementById("list-page-" + this.state.pageNo).classList.remove("page-to-left");
                    }catch(e){
                        this.state.pageNo++;
                        return;
                    }
                    document.getElementById("list-page-" + this.state.pageNo).classList.remove("page-to-right");
                    document.getElementById("list-page-" + this.state.pageNo).classList.add("page-from-right");
                    break;
                }
                case "back": {
                    if (0 == this.state.pageNo) { break; }
                    try{
                    document.getElementById("list-page-" + this.state.pageNo).classList.remove("page-from-left");
                    }catch(e){
                        this.state.pageNo--;
                        return;
                    }
                    document.getElementById("list-page-" + this.state.pageNo).classList.remove("page-from-right");
                    document.getElementById("list-page-" + this.state.pageNo).classList.add("page-to-right");
                    this.state.pageNo--;
                    try{
                    document.getElementById("list-page-" + this.state.pageNo).classList.remove("page-to-left");
                    }catch{
                        this.state.pageNo--;
                        return;
                    }
                    document.getElementById("list-page-" + this.state.pageNo).classList.remove("page-to-left");
                    document.getElementById("list-page-" + this.state.pageNo).classList.remove("page-to-right");
                    document.getElementById("list-page-" + this.state.pageNo).classList.add("page-from-left");
                    break;
                }
                default: break;
            }
        };
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
            <li id={"list-page-0"} className="list-page" key={0} style={{opacity:1, left:0}}>
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
                        <div className="page-title">{page.title}</div>
                        <div className="page-author">{page.author}</div>
                        <pre className="page-content">{page.content}</pre>
                        <div className="page-source">{page.source}</div>
                        <div className="controlbar">
                            <button type="button" onClick={function () {
                                this.props.onSelectItem("create");
                            }.bind(this)}>글쓰기</button>
                            <button type="button" onClick={function () {
                                this.props.onButtonClick("update", this.state.pageNo);
                            }.bind(this)}>수정</button>
                            <button type="button" onClick={function () {
                                this.props.onButtonClick("delete", this.state.pageNo);
                            }.bind(this)}>삭제</button>
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