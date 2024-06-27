import React from "react";
import SidebarBtn from "./SidebarBtn";
// import PropTypes from "prop-types";

const Sidebar = () => {
  return (
    <div className="sidebar flex flex-col items-center w-24">
      <SidebarBtn src={"/dashboard/sidebar/side_logo.svg"} />
      <SidebarBtn src={"/dashboard/sidebar/side_dash.svg"} text={"Dashboard"} active={true}/>
      <SidebarBtn
        src={"/dashboard/sidebar/side_report.svg"}
        text={"Report Summary"}
      />
    </div>
  );
};

// Sidebar.propTypes = {};

export default Sidebar;
