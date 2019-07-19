const app = require("socket.io")(process.env.PORT || 3000)
const users = {}
app.use(__dirname);


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