const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();
const port = 4500 ;

app.use(cors());
app.get("/",(req,res)=>{
    res.send("Happy New Year!");
})

const server = http.createServer(app);
const io = socketIO(server);

const users = [{}];
io.on("connection",(socket)=>{
    console.log("New Connection");
    socket.on('joined',(data)=>{
        if(data){
            users[socket.id]=data.user;
            console.log(`${data.user} has joined`);
        }
        socket.emit('welcome',{user: 'Admin',message:`Welcome to the chat! ${users[socket.id]}`});
        socket.broadcast.emit('userJoined',{user: 'Admin',message:`${users[socket.id]} has joined`});
    })

    socket.on('message',({message,id})=>{
        io.emit('sendMessage',{user:users[id],message,id});
    });

    socket.on('disconnect',()=>{
        socket.broadcast.emit('leave',{user: 'Admin', message : `${users[socket.id]} has left`});
        delete users[socket.id];
    })
})

server.listen(port,()=>{
    console.log(`server is working on ${port}`);
})