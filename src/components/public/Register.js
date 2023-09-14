import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  CssBaseline,
  createTheme,
  ThemeProvider,
  Snackbar,
  Alert,
  InputAdornment,
  IconButton,
  FormControl,
  OutlinedInput,
  InputLabel,
} from "@mui/material";
import { useForm } from "./../../hooks/useForm";
import { useRegister } from "../../hooks/useRegister";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#69445d",
    },
  },
});

const initialForm = {
  name: "",
  lastname: "",
  email: "",
  password: "",
  dni: "",
  medicalRegistration: "",
  role: "USER",
  status: "PENDING",
};

export default function Register() {
  const { form, handleChange } = useForm(initialForm);

  const {
    onRegister,
    areEquals,
    showSnackbar,
    snackbarMessage,
    handlePasswordConfirmation,
    handleCloseSnackbar,
    showPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
    showPassword2,
    handleClickShowPassword2,
    handleMouseDownPassword2,
  } = useRegister(form);

  return (
    <>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              marginBottom: 15,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ bgcolor: "#283583", width: 50, height: 50 }}>
              <AppRegistrationIcon sx={{ fontSize: 35 }} />
            </Avatar>
            <Box component="form" sx={{ mt: 3 }}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Nombre"
                    autoFocus
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastname"
                    label="Apellido"
                    name="lastname"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="number"
                    name="dni"
                    required
                    fullWidth
                    id="dni"
                    label="DNI"
                    autoFocus
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="number"
                    required
                    fullWidth
                    id="medicalRegistration"
                    label="Matrícula Médica"
                    name="medicalRegistration"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Contraseña</InputLabel>
                    <OutlinedInput
                      required
                      fullWidth
                      label="Contraseñ"
                      id="password"
                      name="password"
                      onChange={handleChange}
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Repite tu contraseña</InputLabel>
                    <OutlinedInput
                      required
                      fullWidth
                      label="repitetucontraseña"
                      name="password2"
                      id="password2"
                      onChange={handlePasswordConfirmation}
                      type={showPassword2 ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword2}
                            onMouseDown={handleMouseDownPassword2}
                            edge="end"
                          >
                            {showPassword2 ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  {!areEquals && (
                    <Typography
                      align="center"
                      fontSize={"small"}
                      backgroundColor="#fc6a6a"
                      color={"white"}
                      marginTop={0.3}
                      borderRadius={0.8}
                    >
                      Las contraseñas no coinciden!
                    </Typography>
                  )}
                </Grid>
              </Grid>
              <Button
                type="button"
                fullWidth
                variant="contained"
                disableElevation
                sx={{
                  mt: 3,
                  mb: 1,
                  backgroundColor: "#6d7dac",
                  boxShadow: "0",
                  borderRadius: 0,
                }}
                onClick={onRegister}
                disabled={!areEquals}
              >
                Registrarme
              </Button>
              <Grid item display={"flex"}>
                <Typography variant="body2" color="#6c737f">
                  Ya tienes una cuenta?
                </Typography>
                &nbsp;
                <Link href="/login" variant="body2" color="#283583e0">
                  {"Ingresa!"}
                </Link>
              </Grid>
            </Box>
          </Box>
        </Container>
        <Snackbar
          open={showSnackbar}
          autoHideDuration={2500}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </>
  );
}
