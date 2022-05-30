import "./sidebar.css";

// import React from "react";
import SideBarItems from "./SideBarItems";

const SideBar = () => {
  return (
    <div className=" border-0 position-fixed sidebar col-md-2  d-none d-md-block  ">
      <SideBarItems />
    </div>
  );
};
export default SideBar;
