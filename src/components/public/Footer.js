import React from "react";
import {
  Button,
  ButtonGroup,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import logo from "../public/images/new-logo-footer.svg";
import { Call, WhatsApp } from "@mui/icons-material";

const footerStyle = {
  backgroundColor: "#283583",
  alignItems: "center",
  height: "auto",
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

export const Footer = ({ userRole }) => {
  if (userRole === "ADMIN" || userRole === "USER") {
    return (
      <Grid container style={footerStyle}>
        <Grid
          item
          sx={{
            alignItems: "center",
            backgroundImage: `url(${logo})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            width: "150px",
            height: "150px",
            marginLeft: 5,
          }}
        />
        <Grid marginLeft={10} item>
          <Typography sx={{ color: "#ffffff" }}>
            Clínica de Cuyo
          </Typography>
          <Typography sx={{ color: "#c5c5c5", fontSize: "small" }}>
            Guardia (Interno 1405)
          </Typography>
          <Button sx={{ color: "#2b7cf4", width: "0px" }} href={`tel:4059000`}>
            <Call />
          </Button>
        </Grid>
        <Grid marginLeft={10} item>
          <Typography sx={{ color: "#ffffff" }}>Hector Lamacchia</Typography>
          <Typography sx={{ color: "#c5c5c5", fontSize: "small" }}>
            Jefe de Guardia
          </Typography>
          <ButtonGroup variant="filled">
            <Button
              sx={{ color: "#25d366", width: "0px" }}
              href="https://api.whatsapp.com/send?phone=2613366186"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsApp />
            </Button>
            <Button
              sx={{ color: "#2b7cf4", width: "0px" }}
              href={`tel:2613366186`}
            >
              <Call />
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid marginLeft={10} item>
          <Typography sx={{ color: "#ffffff" }}>Anabel Farachi</Typography>
          <Typography sx={{ color: "#c5c5c5", fontSize: "small" }}>
            Coordinación Médica General
          </Typography>
          <ButtonGroup variant="filled">
            <Button
              sx={{ color: "#25d366", width: "0px" }}
              href="https://api.whatsapp.com/send?phone=2615720705"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsApp />
            </Button>
            <Button
              sx={{ color: "#2b7cf4", width: "0px" }}
              href={`tel:2615720705`}
            >
              <Call />
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid marginLeft={10} item>
          <Typography sx={{ color: "#ffffff" }}>Vanina Solavallone</Typography>
          <Typography sx={{ color: "#c5c5c5", fontSize: "small" }}>
            Capacitación médica, Protocolización y Auditoría
          </Typography>
          <ButtonGroup variant="filled">
            <Button
              sx={{ color: "#25d366", width: "0px" }}
              href="https://api.whatsapp.com/send?phone=2616409172"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsApp />
            </Button>
            <Button
              sx={{ color: "#2b7cf4", width: "0px" }}
              href={`tel:2616409172`}
            >
              <Call />
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid
          item
          sx={{
            marginLeft: "auto",
            display: "flex",
            flexDirection: "column",
            textAlign: "right",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 5,
            width: "10rem",
            height: "10rem",
          }}
        >
          <Copyright />
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Grid container style={footerStyle}>
        <Grid
          item
          sx={{
            alignItems: "center",
            backgroundImage: `url(${logo})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            width: "120px",
            height: "120px",
            marginLeft: 5,
          }}
        ></Grid>
        <Grid
          item
          sx={{
            marginLeft: "auto",
            display: "flex",
            flexDirection: "row",
            textAlign: "right",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 5,
            width: "10rem",
            height: "10rem",
          }}
        >
          <Copyright />
        </Grid>
      </Grid>
    );
  }
};
