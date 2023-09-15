import { useNavigate } from "react-router-dom";
import { request, setAuthHeader } from "../helpers/axios_helper";
import { useEffect, useState } from "react";

export const useRegister = (form) => {
  const navigate = useNavigate();

  const onRegister = (event) => {
    event.preventDefault();
    if (
      form.name.trim() === "" ||
      form.lastname.trim() === "" ||
      form.email.trim() === "" ||
      form.password.trim() === "" ||
      form.dni.trim() === "" ||
      form.medicalRegistration.trim() === ""
    ) {
      setSnackbarMessage("Algunos campos se encuentran vacíos!");
      setShowSnackbar(true);
      return;
    }

    request("POST", "/register", {
      name: form.name,
      lastname: form.lastname,
      email: form.email,
      password: form.password,
      dni: form.dni,
      medicalRegistration: form.medicalRegistration,
    })
      .then((response) => {
        if (response.status === 201) {
          navigate("/login?status=registered");
        }
      })
      .catch((error) => {
        if (error.response) {
          setSnackbarMessage(error.response.data);
        } else {
          setSnackbarMessage("Error al registrarse, intente nuevamente en unos instantes!");
        }
        setAuthHeader(null);
        setShowSnackbar(true);
      });
  };
  // handle snackbar message ////////////////////////////////////////////////
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };
  ///////////////////////////////////////////////////////////////////////////////
  // handle password confirmation ////////////////////////////////////////////////
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [areEquals, setAreEqual] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [showPassword2, setShowPassword2] = useState(false);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

  const handlePasswordConfirmation = (e) => {
    setPasswordConfirmation(e.target.value);
  };

  useEffect(() => {
    const { password } = form;
    setAreEqual(password === passwordConfirmation);
  }, [passwordConfirmation, form]);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };
  ///////////////////////////////////////////////////////////////////////////////

  return {
    onRegister,
    areEquals,
    handlePasswordConfirmation,
    showSnackbar,
    snackbarMessage,
    handleCloseSnackbar,
    showPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
    showPassword2,
    handleClickShowPassword2,
    handleMouseDownPassword2
  };
};
