import React from "react";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import "./resizing.css";

export const SidebarData = [
  {
    title: "Home",
    path: "/home",
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
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
        style: {
          backgroundColor: "#C62828",
          color: "#your-text-color",
        },
        hoverStyle: {
          backgroundColor: "#your-hover-background-color",
          color: "#your-hover-text-color",
        },
      },
      {
        title: "Temperature",
        path: "/temperature",
        icon: <i className="fa-solid fa-temperature-three-quarters"></i>,
        style: {
          backgroundColor: "#C62828",
          color: "#your-text-color",
        },
        hoverStyle: {
          backgroundColor: "#your-hover-background-color",
          color: "#your-hover-text-color",
        },
      },
      {
        title: "Pressure",
        path: "/Pressure",
        icon: <i className="fa-brands fa-wpressr"></i>,
        style: {
          backgroundColor: "#C62828",
          color: "#your-text-color",
        },
        hoverStyle: {
          backgroundColor: "#your-hover-background-color",
          color: "#your-hover-text-color",
        },
      },
      {
        title: "Vibration",
        path: "/Vibration",
        icon: <i className="fa-solid fa-bolt"></i>,
        style: {
          backgroundColor: "#C62828",
          color: "#your-text-color",
        },
        hoverStyle: {
          backgroundColor: "#your-hover-background-color",
          color: "#your-hover-text-color",
        },
      },
      {
        title: "Flow",
        path: "/flow",
        icon: <i className="fa-solid fa-water"></i>,
        style: {
          backgroundColor: "#C62828",
          color: "#your-text-color",
        },
        hoverStyle: {
          backgroundColor: "#your-hover-background-color",
          color: "#your-hover-text-color",
        },
      },
      {
        title: "RPM",
        path: "/rpm",
        icon: <i className="fa-solid fa-wind"></i>,
        style: {
          backgroundColor: "#C62828",
          color: "#your-text-color",
        },
        hoverStyle: {
          backgroundColor: "#your-hover-background-color",
          color: "#your-hover-text-color",
        },
      },
      {
        title: "Rework",
        path: "/rework",
        icon: <i className="fa-solid fa-temperature-three-quarters"></i>,
        style: {
          backgroundColor: "#C62828",
          color: "#your-text-color",
        },
        hoverStyle: {
          backgroundColor: "#your-hover-background-color",
          color: "#your-hover-text-color",
        },
      },
      {
        title: "Rejection",
        path: "/rejection",
        icon: <i className="fa-solid fa-temperature-three-quarters"></i>,
        style: {
          backgroundColor: "#C62828",
          color: "#your-text-color",
        },
        hoverStyle: {
          backgroundColor: "#your-hover-background-color",
          color: "#your-hover-text-color",
        },
      },
    ],
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
    icon: <span class="material-symbols-outlined">engineering</span>,
  },
  {
    title: "Create User",
    path: "/createuser",
    icon: <i class="fa-solid fa-user"></i>,
  },
  {
    title: "Add Machine",
    path: "/addmachine",
    icon: <i class="fa-solid fa-gear"></i>,
  },
];
