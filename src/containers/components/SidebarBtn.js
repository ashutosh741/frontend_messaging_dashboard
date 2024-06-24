import React from "react";
import PropTypes from "prop-types";

const SidebarBtn = ({ text, src, active }) => {
  // const active = true;
  return (
      // <div className="flex">
        
        <div
          className={`border-b border-gray-300 p-6 flex flex-col justify-center items-center h-[5rem] ${
            active ? "text-[#d2292e] " : ""
          }  ${active ? "bg-[#F5F6FA] " : ""}`}
        >
          <img src={src} alt="Logo" />
          <p className="text-sm text-center">{text}</p>
        </div>
      // </div>
  );
};

SidebarBtn.propTypes = {
  text: PropTypes.string,
  src: PropTypes.string,
  active: PropTypes.bool,
};

export default SidebarBtn;
