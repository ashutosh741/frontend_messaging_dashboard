import React from "react";
import PropTypes from "prop-types";

const FormBtn = ({ text, className }) => {
  return (
    <button className={className} type="submit">
      {text}
    </button>
  );
};
FormBtn.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
};

export default FormBtn;
