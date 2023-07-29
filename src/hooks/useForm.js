import { useEffect, useState } from "react";
import UserService from "../components/secured/services/UserService.js";

export const useForm = (initialForm) => {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
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
  const [passwordConfrimation, setPasswordConfirmation] = useState("");
  const [areEquals, setAreEqual] = useState(true);

  const handlePasswordConfirmation = (e) => {
    setPasswordConfirmation(e.target.value);
  };

  useEffect(() => {
    const { password } = form;
    setAreEqual(password === passwordConfrimation);
  }, [passwordConfrimation, form]);
  ///////////////////////////////////////////////////////////////////////////////

  return {
    form,
    handleChange,
    handleSubmit,
    areEquals,
    handlePasswordConfirmation,
    showSnackbar,
    snackbarMessage,
    handleCloseSnackbar,
  };
};
