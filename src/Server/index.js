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
    let no = post.no;

    let sql = "SELECT * FROM freeboard WHERE no=?";
    db.query(sql, [no], function(error, board){
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
    let cre_date = post.cre_date;

    let sql = "INSERT INTO freeboard(title, content, author, cre_date) VALUES(?, ?, ?, ?)";
    db.query(sql, [title, content, author, cre_date], function(error, result){
      response.send({id: result.insertId});
    })
  });
})

app.post("/update", function(request, response){
  alert("update post started");
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
      if(error){
        console.log("update error is occured");
      }
      else{
        console.log("anthology is updated id: "+id);
      }
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
    
    let no = post.no;
    
    let sql = "DELETE FROM freeboard WHERE no=?";
    db.query(sql, [no], function(error, result){
      //비워둠
    })
  });
})

app.listen(PORT, ()=>{
    console.log(`running on port ${PORT}`);
});