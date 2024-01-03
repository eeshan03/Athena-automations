import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import logo from '../images/logo.png';
import Image from 'react-image-resizer';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState("");

  const login = () => {
    Axios.post("http://localhost:3008/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        const userRole = response.data[0].role;
        if (userRole === 'operator') {
          navigate('../operator'); // Navigate to the operator route
        } else if (userRole === 'manager') {
          navigate('../manager'); // Navigate to the manager route
        } else if (userRole === 'maintenance') {
          navigate('../maintenance'); // Navigate to the superadmin route
        } else if (userRole === 'superadmin') {
          navigate('../home'); // Navigate to the superadmin route
        } else {
          setLoginStatus("Invalid Role"); // Set an error message
        }
      }
    });
  };

  return (
    <>
      <div className='page'>
        <div className='login'>
          <div class="left">
            <a href="https://www.google.com/" target="_blank">
              <Image
                src={logo}
                alt="logo"
                className="center"
                style={{ alignSelf: 'center', margin: "auto" }}
                height={90}
                width={200}
              />
            </a>
            <input type="text" required placeholder="USERNAME" onChange={(e) => {
              setUsername(e.target.value);
            }} /><br />
            <input type="password" placeholder="PASSWORD" onChange={(e) => {
              setPassword(e.target.value);
            }} /><br />
            <h5 style={{ color: '#FC2929', marginTop: '10px', textAlign: 'center' }}>{loginStatus}</h5>
            <button className="loginbtn" type="submit" onClick={login}>Login</button>
          </div>
          <div class="right">
            <div class="right-text">
            </div>
            <div class="right-inductor"><img src="src\images\mainbck.jpg" alt="" /></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
