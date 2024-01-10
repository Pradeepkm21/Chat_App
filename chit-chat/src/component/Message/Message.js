import React from 'react'
import './Message.css'

function Message({user,message,classes}) {
  if(user){
    return (
      <div className={`messageBox ${classes}`}>
          <div>{`${user} : ${message}`}</div>
      </div>
    )
  }
  else{
    return (
      <div className={`messageBox ${classes}`}>
          <div>{`You : ${message}`}</div>
      </div>
    )
  }
}

export default Message