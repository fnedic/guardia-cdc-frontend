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
        window.location.href = "/dashboard";
      })
      .catch((error) => {
        setAuthHeader(null);
      });
  };

  return {onLogin}
};
