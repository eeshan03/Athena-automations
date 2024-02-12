import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./resizing.css";
import ImageResizer from "react-image-resizer";
import logo from "../images/logo.png";
import { AuthContext } from "./AuthContext"; // Adjust the import path accordingly

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px" }}>
      <div>
        <ImageResizer
          img
          src={logo}
          alt="logo"
          className="right"
          height={90}
          width={200}
        />
      </div>
      <div className="btn_logout" style={{ marginLeft: "10px", display: "flex", alignItems: "baseline" }}>
        <p style={{ fontSize: "18px", marginBottom: "0", color: "black", fontWeight: "light" }}>
          {user && user.username ? `Hello ${user.username}` : 'Hello User'}
        </p>
        <Link to="/Login">
          <button style={{ backgroundColor: "#C62828", fontSize: "16px", marginLeft: "10px" }} role="button">
            Log Out
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
