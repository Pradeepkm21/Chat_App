import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import './Join.css';
import logo from '../../images/logo.jpeg';

let user;
let sendUser = ()=>{
  user = document.getElementById("JoinInput").value;
  document.getElementById("JoinInput").value = "";
}

const Join = () => {
  
  const[name,setname] = useState("");

  return (
    <div className='JoinPage'>
        <div className='JoinContainer'>
          <img src={logo} alt="logo" />
            <h1>CHIT-CHAT</h1>
          <input onChange={(e)=> setname(e.target.value) } type="text" placeholder='Enter Your Name' id='JoinInput' />
          <Link onClick={(event)=> !name ? event.preventDefault() : null } to="/chat"><button onClick={sendUser} className='Joinbtn'>Login</button></Link>
        </div>  
    </div>
  )
}
export default Join
export {user}
