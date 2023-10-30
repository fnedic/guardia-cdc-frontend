import React from "react";
import logo from "../public/images/logo-cdc-header.png";
import { Box, Button } from "@mui/material";

export const Header = () => {
  const headerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "8rem",
    width: "100%",
  };

  return (
    <Button
      disableRipple
      sx={{ "&:hover": { backgroundColor: "inherit" }}}
      style={headerStyle}
      href="/home"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url(${logo})`,
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "30rem",
          height: "8rem",
        }}
      ></Box>
    </Button>
  );
};
