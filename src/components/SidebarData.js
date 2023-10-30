import React from "react";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import './resizing.css'


export const SidebarData = [
	{
		title: "Home",
		path: "/home",
		icon: <AiIcons.AiFillHome />,
		iconClosed: <RiIcons.RiArrowDownSFill />,
		iconOpened: <RiIcons.RiArrowUpSFill />,

	},
	{
		title: "OEE",
		path: "/oee",
		icon: <AiIcons.AiFillHome />,
		icon: <i class="fa-solid fa-bullseye"></i>,

	},
	
	{
		title: "Temperature",
		path: "/temperature",
		icon: <i class="fa-solid fa-temperature-three-quarters"></i>,
	},

	{
		title: "Pressure",
		path: "/Pressure",
		icon: <i class="fa-brands fa-wpressr"></i>,
	},

	{
		title: "Vibration",
		path: "/Vibration",
		icon: <i class="fa-solid fa-bolt"></i>,
	},

	{
		title: "Flow",
		path: "/flow",
		icon: <i class="fa-solid fa-water"></i>,
	},

	{
		title: "RPM",
		path: "/rpm",
		icon: <i class="fa-solid fa-wind"></i>,
	},

	{
		title: "Rework",
		path: "/rework",
		icon: <i class="fa-solid fa-temperature-three-quarters"></i>,
	},

	{
		title: "Rejection",
		path: "/rejection",
		icon: <i class="fa-solid fa-temperature-three-quarters"></i>,
	},
	{
		title: "Maintenance",
		path: "/maintenance",
		icon: <i class="fa-regular fa-screwdriver-wrench fa-lg"></i>,
	},

	{
		title: "Manager",
		path: "/manager",
		icon: <i class="fa-solid fa-chalkboard-user"></i>,
	},
	{
		title: "Operator",
		path: "/operator",
		icon: <span class="material-symbols-outlined">
		engineering
		</span>,
	},
	];
	