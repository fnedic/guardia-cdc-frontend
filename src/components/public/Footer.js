import React from "react";
import Box from "@mui/material/Box";
import { Link, Typography } from "@mui/material";
import logo from "../public/images/logo-cdc-footer.png";

const footerStyle = {
  backgroundColor: "#283583",
  display: "flex",
  alignItems: "center",
  height: "10rem",
  width: "100%",
};

function Copyright() {
  return (
    <Typography color="white" variant="body2">
      {"© "}
      <Link href="#" color={"#FFFFFF"}>
        Servicio de Guardia CDC
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box style={footerStyle}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundImage: `url(${logo})`,
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left",
          width: "10rem",
          height: "10rem",
        }}
      ></Box>
      <Box
        sx={{
          marginLeft: "auto",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          width: "10rem",
          height: "10rem%",
        }}
      >
        <Copyright />
      </Box>
    </Box>
  );
}