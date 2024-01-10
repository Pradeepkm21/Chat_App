import React, { useEffect, useState } from 'react'
import { user } from '../Join/Join'
import socketIo from 'socket.io-client';
import './Chat.css';
import sendlogo from '../../images/send.png';
import Message from '../Message/Message';
import ReactScrollToBottom from 'react-scroll-to-bottom';
import closelogo from '../../images/close.png';

let socket;
const ENDPOINT = 'http://localhost:4500/';

const Chat = () => {
  const [id, setid] = useState("");
  const [messages, setMessages] = useState([]);
  const send = ()=>{
      const message = document.getElementById("chatInput").value;
      ///reserve event name : message//
      socket.emit('message',{message,id});
      document.getElementById('chatInput').value = "";
  }

  useEffect(() => {
      socket = socketIo(ENDPOINT, { transports : ['websocket']});
      ///Reserve event name: connect//
      socket.on('connect',()=>{
        setid(socket.id);
      })
      socket.emit('joined',{user});

      socket.on('welcome',(data)=>{
        setMessages([...messages,data]);
      })
      socket.on('userJoined',(data)=>{
        setMessages([...messages,data]);
      })
      socket.on('leave',(data)=>{
        setMessages([...messages,data]);
      })

    return () => {
      ///reserve event name: disconnect//
      socket.disconnect();
      socket.off();
    }
  }, []);
    
  useEffect(() => {
    socket.on('sendMessage',(data)=>{
      setMessages([...messages,data]);
    })
  
    return () => {
      socket.off();
    }
  }, [messages])
  

  return (
    <div className='chatPage'>
        <div className='chatContainer'>
            <div className='header'>
              <h2>Chit-Chat</h2>
              <a href="/"><img src={closelogo} alt="close" /></a>
            </div>
            <ReactScrollToBottom className='chatBox'>
                {messages.map((item,i) => <Message user={item.id === id ? '' : item.user} message={item.message} classes={item.id === id ? 'right' : 'left'}/>)}
            </ReactScrollToBottom>
            <div className='inputBox'>
                <input onKeyPress={(event)=>event.key === 'Enter' ? send() : null} type="text" id='chatInput' />
                <button onClick={send} className='sendBtn'><img src={sendlogo} alt="Send" /></button>
            </div>
        </div>
    </div>
  )
}

export default Chat
