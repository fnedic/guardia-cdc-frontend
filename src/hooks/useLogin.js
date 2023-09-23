import { useState } from "react";
import { request, setAuthHeader } from "../helpers/axios_helper";
import { useSnackBar } from "./useSnackbar";

export const useLogin = (form) => {
  const { setSnackbarMessage, setShowSnackbar, setSeverity, SnackBar } =
    useSnackBar();
  const SnackBar2 = SnackBar;
  const onLogin = (e) => {
    e.preventDefault();
    if (form.email.trim() === "" || form.password.trim() === "") {
      setSnackbarMessage("Algunos campos se encuentran vacíos!");
      setSeverity("warning");
      setShowSnackbar(true);
      return;
    }
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
        if (error.response !== undefined) {
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
        } else {
          setSnackbarMessage(error.toString());
          setSeverity("warning");
          setShowSnackbar(true);
        }
      });
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return {
    onLogin,
    SnackBar2,
    showPassword,
    handleClickShowPassword,
    handleMouseDownPassword
  };
};
