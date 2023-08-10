import React, { useState } from "react"; 
import SideBar from "./components/SideBar";
import MainSection from "./components/MainSection";
import "./App.css";

function App() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const ToggleSidebar = () => {
    isSideBarOpen === true ? setIsSideBarOpen(false) : setIsSideBarOpen(true);
  };
  
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
