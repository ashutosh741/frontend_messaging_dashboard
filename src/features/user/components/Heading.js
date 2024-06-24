import React from "react";
import PropTypes from "prop-types";

const Heading = ({ text, className }) => {
  return <h1 className={className}>{text}</h1>;
};

Heading.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
};
export default Heading;
