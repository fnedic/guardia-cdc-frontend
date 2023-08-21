import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Container, Link, Typography } from "@mui/material";
import logo from "../public/images/logo-cdc-footer.svg";

const StyledFooter = styled("footer")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(2),
  backgroundColor: "#283583",
  width: "100%",
  height: "8rem",
  position: "sticky",
  bottom: 0,
}));

const imgStyle = {
  maxWidth: "100%",
  maxHeight: "100%",
  display: "block",
};

function Copyright() {
  return (
    <Typography color="white" variant="body2" align="center">
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
    <Box sx={{ flexGrow: 0 }}>
      <StyledFooter>
        <Box>
          <img alt="" style={imgStyle} src={logo} />
        </Box>
        <Container></Container>
        <Box>
          <Copyright />
        </Box>
      </StyledFooter>
    </Box>
  );
}
