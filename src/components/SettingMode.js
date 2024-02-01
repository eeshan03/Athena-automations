import Sidebar from "./SideBar";
import React from "react";
import "./Operator.css";
import { motion } from "framer-motion/dist/framer-motion";
import { Link } from "react-router-dom";

const SettingMode = () => {
  return (
    <>
      <Sidebar />
      <div>
        <Link to="/operator">
          <div className="settingtable-wrapper">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`shifttable-button `}
            >
              setting mode
            </motion.button>
          </div>
        </Link>
      </div>
    </>
  );
};

export default SettingMode;
