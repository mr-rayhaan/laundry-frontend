import React, { useEffect, useState, createContext } from "react";
import NavBar from "./NavBar";
import style from "../styles/main_section.module.css";
import SideBarProps from "../interfaces/SideBarProps";
import ItemsSection from "./ItemsSection";
import CartSection from "./CartSection";
import ItemsModel from "../interfaces/Cloth";
import Service from "../interfaces/Service";
import { CartProvider } from "../contexts/CartContext";

export default function MainSection(props: SideBarProps) {
  const [item, setItem] = useState<ItemsModel>();
  const [service, setService] = useState<Service>();

  const mainSectionWidth = props.isSideBarOpen
    ? style.wrapperCollapsed
    : style.wrapperExpanded;
  console.log("MainSection");
  // useEffect(() => {});
  return (
    <div className={`${style.wrapper} ${mainSectionWidth} `}>
      <NavBar />
      <div style={{ display: `flex`, margin: 20 }}>
        <CartProvider>
          <ItemsSection />
          <CartSection />
        </CartProvider>
      </div>
    </div>
  );
}
