import { useState } from "react";
import { request, setAuthHeader } from "../helpers/axios_helper";

export const useLogin = (form) => {
  const onLogin = (e) => {
    e.preventDefault();
    request("POST", "/login", {
      email: form.email,
      password: form.password,
    })
      .then((response) => {
        setAuthHeader(response.data.token);
        window.location.href = "/admin";
      })
      .catch((error) => {
        setAuthHeader(null);
        if (error.response.status === 404) {
          setSnackbarMessage(error.response.data.message);
          setSeverity("error");
          setShowSnackbar(true);
        } else if (error.response.status === 403) {
          setSnackbarMessage(error.response.data.message);
          setSeverity("info");
          setShowSnackbar(true);
        } else if (error.response.status === 401) {
          setSnackbarMessage(error.response.data.message);
          setSeverity("info");
          setShowSnackbar(true);
        }
      });
  };

  // handle snackbar message ////////////////////////////////////////////////
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [ severity, setSeverity ] = useState("success");

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };
  ///////////////////////////////////////////////////////////////////////////////

  return {
    onLogin,
    showSnackbar,
    snackbarMessage,
    setSnackbarMessage,
    handleCloseSnackbar,
    setShowSnackbar,
    severity
  };
};
