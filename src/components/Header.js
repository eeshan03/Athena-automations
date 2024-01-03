import React from "react";
import { Link } from "react-router-dom";
import './resizing.css'
import ImageResizer from 'react-image-resizer';
import logo from '../images/logo.png'
const Header = ()=>{
return(
	<div>
<ImageResizer
          img src={logo} alt="logo" class="right"
           height={90}
           width={200}
      /> 
	  <div className = "btn_logout" style = {{width: "200", textAlign: "right"}}>
      <Link to="/Login"><button class="button-62" role="button">Log Out</button></Link>  
        </div>
		</div>
);}
export default Header;