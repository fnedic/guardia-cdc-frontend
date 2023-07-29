import { useState } from "react";
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

  const handleSubmit = (e) => {
    e.preventDefault();

    setForm(initialForm);

    UserService.createUser(form).then(() => {
        handleRedirect();
    });
      
  };

  const handleRedirect = () => {
    window.location.href = "/login";
  };

  return {
    form,
    handleChange,
    handleSubmit,
  };
};
