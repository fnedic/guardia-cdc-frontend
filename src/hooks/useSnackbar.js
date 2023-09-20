import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";

export const useSnackBar = () => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };
  const SnackBar = (
    <Snackbar
      open={showSnackbar}
      autoHideDuration={4000}
      onClose={handleCloseSnackbar}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={handleCloseSnackbar}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );

  return {
    setSnackbarMessage,
    setShowSnackbar,
    setSeverity,
    SnackBar,
  };
};
