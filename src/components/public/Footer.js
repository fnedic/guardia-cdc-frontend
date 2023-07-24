import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Container, Link, Typography } from "@mui/material";

const StyledFooter = styled('footer')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2),
  backgroundColor: '#283583',
  width: '100%',
  height: '8rem',
  boxShadow: '0px -2px 6px rgba(0, 0, 0, 0.2)',
  position: 'sticky',
  bottom: 0,
}));

const imgStyle = {
  maxWidth: "100%",
  maxHeight: "100%",
  display: "block",
};

function Copyright() {
  return (
    <Typography color="white" variant="body2" align="center" >
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
          <img
            style={imgStyle}
            src="https://clinicadecuyosa.org/wp-content/uploads/2022/10/logo-cdc-footer.svg"
            alt="Logo"
          />
        </Box>
        <Container>
        </Container>
        <Box >
          <Copyright />
        </Box>
      </StyledFooter>
    </Box>
  );
}

