const express = require('express');
const cors = require("cors");

const app = express();
const mysql = require("mysql2");
const PORT = process.env.port || 8000;

let corsOption = {
  origin: "*", //출처 허용 옵션
  credential: true //사용자 인증이 필요한 리소스 접근
}
app.use(cors(corsOption));

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "reactboard"
});

app.get("/book", function(request, response){
  let sql = "SELECT * FROM anthology";
  db.query(sql, function(error, pages){
    response.send(pages);
  })
})

app.post("/read", function(request, response){
  let body = "";
  request.on("data", function(data){
    body += data;
  });
  request.on("end", function(){
    let post = JSON.parse(body);
    let id = post.id;

    let sql = "SELECT * FROM anthology WHERE id=?";
    db.query(sql, [id], function(error, board){
      response.send(board);
    })
  });
})

app.post("/create", function(request, response){
  let body = "";
  request.on("data", function(data){
    body += data;
  });
  request.on("end", function(){
    let post = JSON.parse(body);
    
    let author = post.author;
    let title = post.title;
    let content = post.content;
    let source = post.source;

    let sql = "INSERT INTO anthology (title, content, author, source) VALUES(?, ?, ?, ?)";
    db.query(sql, [title, content, author, source], function(error, result){
    })
  });
})

app.post("/update", function(request, response){
  let body = "";
  request.on("data", function(data){
    body += data;
  });
  request.on("end", function(){
    let post = JSON.parse(body);
    let id = post.id;
    let title = post.title;
    let content = post.content;
    let author = post.author;
    let source = post.source;

    let sql = "UPDATE anthology SET title=?, content=?, author=?, source=? WHERE id=?";
    db.query(sql, [title, content, author, source, id], function(error, result){

    })
  });
})

app.post("/delete", function(request, response){
  let body = "";
  request.on("data", function(data){
    body += data;
  });
  request.on("end", function(){
    let post = JSON.parse(body);
    
    let id = post.id;
    
    let sql = "DELETE FROM anthology WHERE id=?";
    db.query(sql, [id], function(error, result){
      //비워둠
    })
  });
})

app.listen(PORT, ()=>{
    console.log(`running on port ${PORT}`);
});