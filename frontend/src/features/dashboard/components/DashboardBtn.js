import React from "react";
import ProtoType from "prop-types";
import { useNavigate } from "react-router-dom";

const DashboardBtn = ({ text, className, link }) => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(link)} className={className}>
      {text}
    </button>
  );
};

DashboardBtn.propTypes = {
  text: ProtoType.string,
  className: ProtoType.string,
};

export default DashboardBtn;
