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
        src="https://www.clinicadecuyosa.org/wp-content/uploads/2022/10/logo-cdc-header.svg"
        alt="Imagen centrada"
      />
    </header>
  );
};
