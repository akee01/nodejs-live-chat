const app = require("socket.io")(process.env.PORT || 3000)
const https = require("https");
const fs = require("fs");
const users = {}

https.createServer((req,res) => {
    fs.readFile("index.html",(err,content)=>{
        if(err) throw err;
        res.write(content);
        res.writeHead(200,{'Content-Type':"text/html"});
        res.end();
    });
});

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