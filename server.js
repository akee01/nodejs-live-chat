const PORT = process.env.PORT || 3000;
const app = require("socket.io")(PORT)
// const http = require("http");
// const path = require("path");
// const fs = require("fs");
const users = {}

// http.createServer((req,res) => {
//     console.log(req.url);
//     contentType = "text/html";
//     file = path.join(__dirname,req.url === "/" ? "index.html" : req.url); 
//     ext = path.extname(req.url);
//     switch(ext){
//         case '.html': {
//             contentType = "text/html";
//             break;
//         }
//         case '.css': {
//             contentType = "text/css";
//             break;
//         }
//         case '.js': {
//             contentType = "text/javascript";
//             break;
//         }
//         case '.png': {
//             contentType = "image/png";
//             break;
//         }
//         case '.jpg': {
//             contentType = "image/jpg";
//             break;
//         }
//         case '.json': {
//             contentType = "application/json";
//             break;
//         }
//     }
//     fs.readFile(file,(err,content)=>{
//         if(err) throw err;
//         res.writeHead(200,{'Content-Type':contentType});
//         res.end(content,"utf8");
//     });
// }).listen(()=>{console.log("Server Running...")});
app.use("/");
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