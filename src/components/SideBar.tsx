import React from "react";
import style from "../styles/sidebar.module.css";
import SideBarProps from "../interfaces/SideBarProps"

export default function SideBar(props: SideBarProps) {
  const sideBarWidth = props.isSideBarOpen
    ? style.sideBar_Width_Opened
    : style.sideBar_Width_Closed;

  return (
    <div className={`${style.sideBarMain} ${sideBarWidth}`}>
      <span className={style.sideBar_Options} onClick={props.onPressed}>
        &#9776;&nbsp;
      </span>
    </div>
  );
}
