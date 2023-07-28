import React from "react";

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
      <img style={imgStyle}
        src="logo-cdc-header.svg"
        alt="Imagen centrada"
      />
    </header>
  );
};
