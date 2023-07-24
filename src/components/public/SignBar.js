import { CssBaseline, Typography } from "@mui/material";
import React from "react";

export const SignBar = () => {

  const headerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "5rem",
    width: "100%",
    backgroundColor: "#283583",
    boxShadow: '0px 4px 4px -3px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
  };

  return (
    <header style={headerStyle}>
      <CssBaseline/>
      <Typography color={"white"} variant="h4" letterSpacing={3}>
        Servicio de Guardia
      </Typography>
    </header>
  );
};