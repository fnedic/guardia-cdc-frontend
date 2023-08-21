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