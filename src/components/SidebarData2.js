import React from "react";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import './resizing.css'

// Sidebar.js and SidebarData.js are for Superadmin
// Sidebar2.js and SidebarData2.js are for Manager

export const SidebarData2 = [

    {
		title: "Parameters",
		icon: <RiIcons.RiArrowDownSFill />,
		iconClosed: <RiIcons.RiArrowDownSFill />,
		iconOpened: <RiIcons.RiArrowUpSFill />,
		subNav: [
		  {
			title: "OEE",
			path: "/oee",
			icon: <AiIcons.AiFillHome />,
		  },
		  {
			title: "Temperature",
			path: "/temperature",
			icon: <i className="fa-solid fa-temperature-three-quarters"></i>,
		  },
		  {
			title: "Pressure",
			path: "/Pressure",
			icon: <i className="fa-brands fa-wpressr"></i>,
		  },
		  {
			title: "Vibration",
			path: "/Vibration",
			icon: <i className="fa-solid fa-bolt"></i>,
		  },
		  {
			title: "Flow",
			path: "/flow",
			icon: <i className="fa-solid fa-water"></i>,
		  },
		  {
			title: "RPM",
			path: "/rpm",
			icon: <i className="fa-solid fa-wind"></i>,
		  },
		  {
			title: "Rework",
			path: "/rework",
			icon: <i className="fa-solid fa-temperature-three-quarters"></i>,
		  },
		  {
			title: "Rejection",
			path: "/rejection",
			icon: <i className="fa-solid fa-temperature-three-quarters"></i>,
		  },
		],
	  },

    ];
