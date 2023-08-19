import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {
  CssBaseline,
  createTheme,
  ThemeProvider,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import UserService from "./services/UserService";
import { useParams, useNavigate } from "react-router-dom";
import { Edit } from "@mui/icons-material";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#283583",
    },
  },
});

function UpdateUser() {
  const { id } = useParams(); // Obtener el valor de id desde los parámetros de la URL
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [medicalRegistration, setMedicalRegistration] = useState("");
  const [dni, setDni] = useState("");
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    UserService.getUserById(id).then((res) => {
      let user = res.data;
      setName(user.name);
      setLastname(user.lastname);
      setEmail(user.email);
      setMedicalRegistration(user.medicalRegistration);
      setStatus(user.status);
      setDni(user.dni);
    });
  }, [id]);

  const updateUser = (e) => {
    e.preventDefault();
    let user = {
      id: id,
      name: name,
      lastname: lastname,
      email: email,
      medicalRegistration: medicalRegistration,
      status: status,
      dni: dni,
    };

    UserService.updateUser(id, user)
      .then((red) => {
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeNameHandler = (event) => {
    setName(event.target.value);
  };

  const changeLastnameHandler = (event) => {
    setLastname(event.target.value);
  };

  const changeEmailHandler = (event) => {
    setEmail(event.target.value);
  };
  const changeMedicalRegistrationHandler = (event) => {
    setMedicalRegistration(event.target.value);
  };
  const changeDniHandler = (event) => {
    setDni(event.target.value);
  };
  const changeStatusHandler = (event) => {
    setStatus(event.target.value);
  };

  const cancel = () => {
    navigate("/dashboard");
  };

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 5,
            marginBottom: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ bgcolor: "#283583", width: 50, height: 50 }}>
            <Edit sx={{ fontSize: 35 }} />
          </Avatar>
          <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="name"
                  fullWidth
                  id="name"
                  label="Nombre"
                  autoFocus
                  onChange={changeNameHandler}
                  value={name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastname"
                  label="Apellido"
                  name="lastname"
                  onChange={changeLastnameHandler}
                  value={lastname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="dni"
                  fullWidth
                  id="dni"
                  label="DNI"
                  autoFocus
                  onChange={changeDniHandler}
                  value={dni}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="medicalRegistration"
                  label="Matrícula Médica"
                  name="medicalRegistration"
                  onChange={changeMedicalRegistrationHandler}
                  value={medicalRegistration}
                />
              </Grid>
              <Grid item xs={8.7}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  onChange={changeEmailHandler}
                  value={email}
                />
              </Grid>
              <Grid item sm={2}>
                <FormControl>
                  <InputLabel>Estado</InputLabel>
                  <Select
                    id="status"
                    value={status}
                    label="Estado"
                    onChange={changeStatusHandler}
                  >
                    <MenuItem value={"ACTIVE"}>Activo</MenuItem>
                    <MenuItem value={"PENDING"}>Pendiente</MenuItem>
                    <MenuItem value={"INACTIVE"}>Inactivo</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid display={"flex"} mt={3}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{
                  mr: 2,
                  backgroundColor: "#799A3D",
                  boxShadow: "0",
                  borderRadius: 1,
                }}
                onClick={updateUser}
              >
                Guardar
              </Button>
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "#942121",
                  boxShadow: "0",
                  borderRadius: 1,
                }}
                onClick={cancel}
              >
                Cancelar
              </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default UpdateUser;
