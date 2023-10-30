import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import './resizing.css'
import Image from 'react-image-resizer';
import logo from '../images/logo.png'

const Nav = styled.div`
background: #C62828;;
height: 50px;
display: flex;
justify-content: flex-start;
align-items: center;
`;

const NavIcon = styled(Link)`
margin-left: 2rem;
font-size: 2rem;
height: 20px;
display: flex;
justify-content: flex-start;
align-items: center;
`;

const SidebarNav = styled.nav`
background: #C62828;
width: 182px;
height: 100vh;
display: flex;
justify-content: center;
position: fixed;
top: 0;
left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
transition: 350ms;
z-index: 10;
`;

const SidebarWrap = styled.div`
width: 100%;
`;
	
const Sidebar = () => {
const [sidebar, setSidebar] = useState(false);

const showSidebar = () => setSidebar(!sidebar);


return (
	<>
	<Image
          img src={logo} alt="logo" class="right"
           height={90}
           width={200}
      /> 
	  <div className = "btn_logout" style = {{width: "200", textAlign: "right"}}>
      <Link to="/Login"><button class="button-62" role="button">Log Out</button></Link>  
        </div>
		

		
	<IconContext.Provider value={{ color: "#fff" }}>
		<Nav>
		<NavIcon to="#">
			<FaIcons.FaBars onClick={showSidebar} />
		</NavIcon>
		<h1
			style={{ textAlign: "center",width: "100%",
					color: "white" }}
		>
			Welcome to Athena Dashboard
		</h1>		

		</Nav>
		<SidebarNav sidebar={sidebar}>
		<SidebarWrap>			
			
			{SidebarData.map((item, index) => { 
			return <SubMenu item={item} key={index} marginTop= {150}/>;
			
			
			}
			)}
			<button class = "close_btn" onClick={showSidebar}>Close</button>

		</SidebarWrap>
		</SidebarNav>
	</IconContext.Provider>
	</>
);
};

export default Sidebar;
