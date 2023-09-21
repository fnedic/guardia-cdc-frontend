import React, { useState, useEffect } from "react";
import UserService from "../../../services/UserService.js";
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
import { useParams } from "react-router-dom";
import { Cancel, Edit, Update } from "@mui/icons-material";
import { useSnackBar } from "../../../hooks/useSnackbar.js";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#69445d",
    },
  },
});

const statusOptions = {
  ACTIVE: "Activo",
  INACTIVE: "Inactivo",
};

const fieldLabels = {
  name: "Nombre",
  lastname: "Apellido",
  dni: "DNI",
  medicalRegistration: "Matrícula Médica",
  email: "Email",
};

function UpdateUser() {
  const { id } = useParams();
  const { SnackBar, setSeverity, setShowSnackbar, setSnackbarMessage } =
    useSnackBar();

  const [user, setUser] = useState({
    name: "",
    lastname: "",
    medicalRegistration: "",
    dni: "",
    status: "",
    email: "",
  });

  const handleGoBack = () => {
    window.history.back();
  };

  useEffect(() => {
    UserService.getUserById(id).then((res) => {
      setUser(res.data);
    });
  }, [id]);

  const updateUser = (e) => {
    e.preventDefault();

    UserService.updateUser(id, user)
      .then(() => {
        handleGoBack();
      })
      .catch((error) => {
        if (error.response) {
          setSnackbarMessage(error.response.data.message);
          setSeverity("error");
          setShowSnackbar(true);
        } else {
          setSnackbarMessage("Error del servidor!");
          setSeverity("warning");
          setShowSnackbar(true);
        }
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
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
          <Avatar sx={{ bgcolor: "#6d7dac", width: 50, height: 50 }}>
            <Edit sx={{ fontSize: 35 }} />
          </Avatar>
          <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={1}>
              {Object.keys(fieldLabels).map((fieldName) => (
                <Grid item xs={12} sm={6} key={fieldName}>
                  <TextField
                    fullWidth
                    label={fieldLabels[fieldName]}
                    name={fieldName}
                    InputProps={{
                      inputProps: {
                        type:
                          fieldName === "dni" ||
                          fieldName === "medicalRegistration"
                            ? "number"
                            : "text",
                      },
                    }}
                    value={user[fieldName]}
                    onChange={handleChange}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 0, // Establece el radio de los bordes a 0 para hacerlos rectos
                        "& fieldset": {
                          borderWidth: 1, // Puedes ajustar el ancho del borde como desees
                        },
                      },
                    }}
                  />
                </Grid>
              ))}
              <Grid item xs={6}>
                <FormControl>
                  <InputLabel>Estado</InputLabel>
                  <Select
                    sx={{ minWidth: "12rem", borderRadius:0 }}
                    name="status"
                    value={user.status}
                    onChange={handleChange}
                    label="Estado"
                  >
                    {Object.entries(statusOptions).map(([value, label]) => (
                      <MenuItem key={value} value={value}>
                        {label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid display={"flex"} mt={3}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                disableElevation
                endIcon={<Update />}
                sx={{
                  mr: 2,
                  backgroundColor: "#6d7dac",
                  boxShadow: "0",
                  borderRadius: 0,
                }}
                onClick={updateUser}
              >
                Actualizar
              </Button>
              <Button
                type="button"
                fullWidth
                variant="contained"
                disableElevation
                endIcon={<Cancel />}
                sx={{
                  backgroundColor: "#942121",
                  boxShadow: "0",
                  borderRadius: 0,
                }}
                onClick={handleGoBack}
              >
                Cancelar
              </Button>
            </Grid>
          </Box>
        </Box>
        {SnackBar}
      </Container>
    </ThemeProvider>
  );
}

export default UpdateUser;