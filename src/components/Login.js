// Import AuthContext
import React, { useState, useContext } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "./AuthContext"  // Import AuthContext as a named export
import "./Login.css";
import logo from '../images/logo.png';
import Image from 'react-image-resizer';

function Login() {
  // Get setUser from AuthContext
  const { setUser } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState("");

  const login = () => {
    Axios.post("http://localhost:3008/login", {
      username: username,
      password: password,
    }).then((response) => {
      console.log('Login response:', response);

      const user = response.data.user;

      if (user) {
        // Update the user context here
        setUser({ username: user.username, role: user.role });  // Replace with actual user properties

        const userRole = user.role;
        if (userRole === 'operator') {
          navigate('../operator');
        } else if (userRole === 'manager') {
          navigate('../manager');
        } else if (userRole === 'maintenance') {
          navigate('../maintenance');
        } else if (userRole === 'superadmin') {
          navigate('../home');
        } else {
          setLoginStatus("Invalid Role");
        }
      } else {
        setLoginStatus("Invalid Response Data");
      }
    });
  };

  return (
    <>
      <div className='page'>
        <div className='login'>
          <div className="left">
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
          <div className="right">
            <div className="right-text">
            </div>
            <div className="right-inductor"><img src="src\images\mainbck.jpg" alt="" /></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
