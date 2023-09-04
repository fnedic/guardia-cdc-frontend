import React from "react";
import logo from "../public/images/logo-cdc-header.png";
import { Box, Container } from "@mui/material";

export const Header = () => {
  const headerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "8rem",
    width: "100%",
  };

  return (
    <Container style={headerStyle}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url(${logo})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "200%",
          height: "200%",
        }}
      ></Box>
    </Container>
  );
};
