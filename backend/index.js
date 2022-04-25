var SocketIOFileUpload = require("socketio-file-upload")
const fs = require('fs')
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{cors:{ origin: '*'}});
const message = require('./chatmessage');
const { json } = require('express');
const siofu = require('socketio-file-upload')

app.use(express.static(__dirname + "/uploads"));
app.get('/', (req, res) => {
    var deletedata =  message.deleteMany().then(e =>{
        res.json({message:"successfully Deleted"})

    })
});
let interval;
io.on('connection', async (socket) => {
    socket.on('join',async ({name,room},callback) => {
        const user = name;
        const roomno = room;
        socket.join(user+room);
        
        const messagesout = await message.find();
        
        socket.emit('new_msg',messagesout)
        

        // io.sockets.in(user+room).emit('new_msg', {user:"admin",msg:"You are in room no. "+roomno});
        // socket.broadcast.to(user+room).emit("new_msg" , { user: user ,msg :" user Joined"});
        // socket.emit('new_msg', { user:user,msg: 'hello'});
    })

   

    socket.on('send_message',(data) => {
        console.log(data);
    });
    
    
    
    
    const response = new Date();
    
    // socket.emit("outmessage", response);
    socket.on('fileupload', async ({name,room,file}) => {
        if(file){
        const user = name;
            const roomno = room;
            const messages = new message(
                {
                Room:roomno,
                user:user,
                image:file,
                },
            );
            await messages.save();
        }
        const messagesout = await message.find();
        socket.broadcast.emit('new_msg', messagesout);
        socket.emit('new_msg', messagesout); 
    })
    socket.on('chat message', async ({name,room,msg}) => {
        if(msg != ''){
            const user = name;
            const roomno = room;
            const messages = new message(
                {
                Room:roomno,
                user:user,
                message:msg,
                
                },
            );
            await messages.save();
        }

        const messagesout = await message.find();
        socket.broadcast.emit('new_msg', messagesout);
        socket.emit('new_msg', messagesout);
    });
    const messagesout = await message.find();
    var jsonData = messagesout
    socket.emit('outmessage',  jsonData);
    // socket.emit("outmessage", );

  });




server.listen(5000, () => {
  console.log('listening on *:5000');
});

mongoose.connect("mongodb://localhost/chat-app",(res)=>{
    console.log('db connected');
});