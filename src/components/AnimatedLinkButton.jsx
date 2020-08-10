import React from "react";
import { Link } from "react-router-dom";
import Button from "./AnimatedButton";
import PropTypes from "prop-types";

const AnimatedLinkButton = ({ linkTo, buttonText, ...rest }) => {
  return (
    <Link to={linkTo} {...rest}>
      <Button {...rest}>{buttonText}</Button>
    </Link>
  );
};
export default AnimatedLinkButton;

AnimatedLinkButton.propTypes = {
  linkTo: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};
