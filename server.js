const PORT = process.env.PORT || 3000;
const express = require("express");
const path = require("path");
const app = express();
var server = require('http').createServer(app); 
const io = require("socket.io")(server)
app.use(express.static(__dirname));
const users = {}

io.on("connection",socket=>{
    console.log("Connection made by socket id: "+socket.id);
    socket.on("send-msg",data=>{
        socket.broadcast.emit("chat-message",{msg:data,name:users[socket.id]});
    });
    socket.on("new-user",name=>{
        users[socket.id] = name;
        socket.broadcast.emit("user-joined",name);
    });
});

app.get("",(req, res)=>{
    // var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    // console.log(fullUrl)
    res.sendFile(path.join(__dirname,"index.html"));
});

server.listen(PORT,()=>{
    console.log("App running at "+PORT)
});