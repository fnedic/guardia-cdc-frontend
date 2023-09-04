import { useEffect, useState } from "react";
import UserService from "../services/UserService.js";
import { request, setAuthHeader, setRole } from "../helpers/axios_helper.js";
import { useNavigate } from "react-router-dom";

export const useForm = (initialForm) => {
  const [form, setForm] = useState(initialForm);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };
  
  const onLogin = (e) => {
    e.preventDefault();
    request("POST", "/login", {
      email: form.email,
      password: form.password,
    })
      .then((response) => {
        setAuthHeader(response.data.token);
        setRole(response.data.role);
        console.log("Usuario logueado exitosamente!");
        window.location.href = "/dashboard";
      })
      .catch((error) => {
        console.log("ERROR AL INICIAR SESION", error);
        setAuthHeader(null);
        setRole(null);
      });
  };

  const onRegister = (event) => {
    event.preventDefault();
    request("POST", "/register", {
      name: form.name,
      lastname: form.lastname,
      email: form.email,
      password: form.password,
      dni: form.dni,
      medicalRegistration: form.medicalRegistration,
    })
      .then((response) => {
        setAuthHeader(response.data.token);
        navigate("/login");
      })
      .catch((error) => {
        setAuthHeader(null);
        
      });
  };

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // handle empty form send /////////////////////////////////////////////////////
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
    ///////////////////////////////////////////////////////////////////////////////
    setForm(initialForm);

    UserService.createUser(form).then(() => {
      handleRedirect();
    });
  };

  const handleRedirect = () => {
    window.location.href = "/login";
  };

  // handle password confirmation ////////////////////////////////////////////////
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [areEquals, setAreEqual] = useState(true);

  const handlePasswordConfirmation = (e) => {
    setPasswordConfirmation(e.target.value);
  };

  useEffect(() => {
    const { password } = form;
    setAreEqual(password === passwordConfirmation);
  }, [passwordConfirmation, form]);
  ///////////////////////////////////////////////////////////////////////////////

  return {
    form,
    handleChange,
    handleSubmit,
    onLogin,
    onRegister,
    areEquals,
    handlePasswordConfirmation,
    showSnackbar,
    snackbarMessage,
    handleCloseSnackbar,
  };
};

export const useLogout = () => {

  const logout = () => {
    setAuthHeader(null);
    setRole(null);
    window.location.href = "/login";
  };

  return {
    logout,
  };
};
