import React, { useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
// import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import MainSection from "./components/MainSection";

function App() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const ToggleSidebar = () => {
    isSideBarOpen === true ? setIsSideBarOpen(false) : setIsSideBarOpen(true);
  };
  console.log("App");
  return (
    <>
      <MainSection isSideBarOpen={isSideBarOpen} />
      <SideBar
        isSideBarOpen={isSideBarOpen}
        onPressed={() => {
          ToggleSidebar();
        }}
      />
    </>
  );
}

export default App;
