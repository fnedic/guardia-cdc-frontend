import React from "react";
import img from "./images/not_found.svg";
import { Box } from "@mui/material";

function NotFound() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <img src={img} alt="not found" />
    </Box>
  );
}

export default NotFound;
