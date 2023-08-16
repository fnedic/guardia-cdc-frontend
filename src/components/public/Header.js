import React from "react";
import logo from "../public/images/logo-cdc-header.svg";

export const Header = () => {
  const headerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "9rem",
    width: "100%",
  };

  const imgStyle = {
    maxWidth: "100%",
  };

  return (
    <header style={headerStyle}>
      <img alt="" style={imgStyle} src={logo} />
    </header>
  );
};
