import './App.css';
import React, { useState, useEffect,useRef } from "react";
import io from "socket.io-client";
import SocketIOFileUpload from 'socketio-file-upload';
import Reactscrollablefeed from  'react-scrollable-feed'
const ENDPOINT = "http://localhost:5000";
const socket = io.connect(ENDPOINT);
function App() {
  const myRef = useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView();
  const [message, setmessage] = useState([]);
  const [wmessage, setwmessage] = useState([]);
  const [response, setResponse] = useState([]);
  const [file, setfile] = useState();
  const [name, setname] = useState();
  const [room, setroom] = useState();
  const sendmessage = () => {
    if(file){
      // const siofu = new SocketIOFileUpload(socket);
      // siofu.listenOnInput(file);
      socket.emit('fileupload',{name:name,room:room,file:file})

      setfile("");

    }else{
      socket.emit("chat message" , {name:name,room:room,msg:message} );
      setmessage('');
    }
  }
  
  useEffect(() => {
    
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const name = params.get('name');
    const room = params.get('room');
    setname(name);
    setroom(room);

    socket.emit('join',{name:name,room:room},(error)=> {
      
    });
    // socket.on('outmessage',(data)=>{
    //   setmessage(data);
    // });
    socket.on('new_msg',(data)=>{
      console.log(data);
      setResponse(data);
      
    })
    
    // console.log(JSON.stringify(message));
    // socket.on("outmessage", (data) => {
    //   // console.log(data);
    //   setResponse(data);
      
    // });
    
    
  },[socket]);
  useEffect(() =>{
    
  },[socket])
  // const selectfile = (event) => {
  //   setmessage(event.target.files[0].name);
  //   setfile(event.target.files[0]);
  // }

  const uploadFile = (e) => {
    // setfile(e.target.files[0]);
    // const siofu = new SocketIOFileUpload(socket);
    // siofu.listenOnInput(file);
  };
  
  
  return (
    <div>
      <div className='textcontainer'>
        <div className='receivedmesage' >
          {/* <h2>{JSON.stringify(wmessage)}</h2> */}
          {/* {wmessage.map((message,index)=>{
            <div key={message._id}>
            
            </div>
          })} */}
        
          {response.map((messages , index) => (
            <div key={messages._id}>
              {
                messages.message ? (
              <div>
            <div className={messages.user == name ? 'messagebox' : 'sendmessage'}  >
                
                <p><span>  {messages.message} </span></p>
                
                  {/* <h6>{messages.message}</h6>
                    <img src={messages.image} /> */}
                  {/* {JSON.stringify(messages)} */}
               
            </div>
              <p className={messages.user == name ? 'messageboxdate' : 'sendmessagedate'}  >{`${new Date(messages.createtime).toLocaleString()}`}</p>
            </div>
              
            ):(null)}
            {messages.image ? (
              <div>
            <div className={messages.user == name ? "sendimage" : "imagesectrion"} >
                <img width="200px" src={messages.image} />
            </div>
            <p className={messages.user == name ? 'imageboxdate' : 'sendimageboxdate'}  >{`${new Date(messages.createtime).toLocaleString()}`}</p>
            </div>
            ):(null)}
            </div>
          )) }
          
              
        </div>
        {/* <div className='chatbottom'>
        <input  onChange={(event)=>{
          setmessage(event.target.value);
        }} />
         <input type="file" onChange={(event)=>{
          const file =  event.target.files[0];
           const reader = new FileReader;
           reader.readAsDataURL(file);
           reader.onload = function (){
             setfile(reader.result);
           }


          }} />
        <button onClick={sendmessage}>Submit</button>
        </div> */}
        
      </div>
      {/* <button onClick={executeScroll}>Click to scroll </button> */}
      <form className="msger-inputarea">
      <input type="text" onChange={(event)=>{
          setmessage(event.target.value);
        }} className="msger-input" placeholder="Enter your message..."/>
      <input type="file" className='msger-input' onChange={(event)=>{
          const file =  event.target.files[0];
           const reader = new FileReader;
           reader.readAsDataURL(file);
           reader.onload = function (){
             setfile(reader.result);
           }


          }} />
      <button type="button" onClick={sendmessage} className="msger-send-btn">Send</button>
    </form>

    
    </div>
  );
}

export default App;