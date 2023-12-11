import React from "react";
import logo from "../public/images/new-logo-header.svg";
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
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "100%",
          height: "100%",
        }}
      ></Box>
    </Button>
  );
};
