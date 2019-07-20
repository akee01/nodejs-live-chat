const socket = io();
messageContainer = document.getElementById("messages-container");
sendMessageBtn = document.getElementById("send-message");
message = document.getElementById("message");
name = "";
while(name == ""){
    name = prompt("Please enter your name?");
}
appendMessage("You Joined Chat!");
socket.emit("new-user",name);
socket.on("chat-message",(resp)=>{
    appendMessage(resp.name+" :"+resp.msg);
});

socket.on("user-joined",(name)=>{
    appendMessage(name + " Joined the chat!");
});

sendMessageBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    let msg = message.value;
    if(msg == ""){
        alert("Please enter a message");
        message.focus();
        return false;
    }
    message.value="";
    appendMessage("You: "+msg);
    socket.emit("send-msg",msg);
});

function appendMessage(msg){
    messageContainer.innerHTML = messageContainer.innerHTML + "<li>"+msg+"</li>";
}
