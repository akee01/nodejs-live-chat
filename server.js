const PORT = process.env.PORT || 3000;
const app = require("socket.io")(PORT)
const https = require("https");
const path = require("path");
const fs = require("fs");
const users = {}
console.log("Using Port :"+ PORT);
https.createServer((req,res) => {
    console.log(req.url);
    contentType = "text/html";
    file = path.join(__dirname,req.url === "/" ? "index.html" : req.url); 
    ext = path.extname(req.url);
    switch(ext){
        case '.html': {
            contentType = "text/html";
            break;
        }
        case '.css': {
            contentType = "text/css";
            break;
        }
        case '.js': {
            contentType = "text/javascript";
            break;
        }
        case '.png': {
            contentType = "image/png";
            break;
        }
        case '.jpg': {
            contentType = "image/jpg";
            break;
        }
        case '.json': {
            contentType = "application/json";
            break;
        }
    }
    console.log("File"+file);
    fs.readFile(file,(err,content)=>{
        if(err){
            if(err.code == 'ENOENT'){
                res.writeHead(404,{'Content-Type':contentType});                    
                res.end("404 Not Found","utf8");
            }else{
                res.writeHead(500);
                res.end("Internal Server error "+err.code);
            }
        }else{
            res.writeHead(200,{'Content-Type':contentType});
            res.end(content,"utf8");
        }
    });
}).listen(PORT,()=>{console.log("Server Running...")});

app.on("connection",socket=>{
    console.log("Connection made by socket id: "+socket.id);
    socket.on("send-msg",data=>{
        socket.broadcast.emit("chat-message",{msg:data,name:users[socket.id]});
    });
    socket.on("new-user",name=>{
        users[socket.id] = name;
        socket.broadcast.emit("user-joined",name);
    });
});