import { useEffect, useState } from "react";
import { request, setAuthHeader } from "../helpers/axios_helper.js";
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
        window.location.href = "/dashboard";
      })
      .catch((error) => {
        setAuthHeader(null);
      });
  };

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
    onLogin,
    onRegister,
    areEquals,
    handlePasswordConfirmation,
    showSnackbar,
    snackbarMessage,
    handleCloseSnackbar,
  };
};