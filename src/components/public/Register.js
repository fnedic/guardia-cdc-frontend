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
  MenuItem,
  Select,
} from "@mui/material";
import { useForm } from "./../../hooks/useForm";
import { useRegister } from "../../hooks/useRegister";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { useState } from "react";
import { useEffect } from "react";
dayjs.locale("es");

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#799a3d",
    },
  },
});

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 0,
    "& fieldset": {
      borderWidth: 1,
    },
  },
};

export default function Register() {
  const [selectedDate, setSelectedDate] = useState();
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const initialForm = {
    name: "",
    lastname: "",
    email: "",
    password: "",
    dni: "",
    specialtie: "",
    medicalRegistration: "",
    role: "USER",
    status: "PENDING",
  };

  const { form, handleChange, setForm } = useForm(initialForm);
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
    emailFormat,
  } = useRegister(form);

  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      startDate: selectedDate,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  return (
    <>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 5,
              marginBottom: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ bgcolor: "#315d9f", width: 50, height: 50 }}>
              <AppRegistrationIcon sx={{ fontSize: 35 }} />
            </Avatar>
            <Box component="form" sx={{ mt: 3 }}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="name"
                    fullWidth
                    id="name"
                    label="Nombre"
                    onChange={handleChange}
                    sx={inputStyle}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="lastname"
                    label="Apellido"
                    name="lastname"
                    onChange={handleChange}
                    sx={inputStyle}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    onChange={handleChange}
                    sx={inputStyle}
                  />
                  {!emailFormat && (
                    <Typography
                      align="center"
                      fontSize={"small"}
                      backgroundColor="#fc6a6a"
                      color={"white"}
                      marginTop={0.3}
                    >
                      El formato del email no es válido
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="number"
                    name="dni"
                    fullWidth
                    id="dni"
                    label="DNI"
                    onChange={handleChange}
                    sx={inputStyle}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="number"
                    fullWidth
                    id="medicalRegistration"
                    label="Matrícula Médica"
                    name="medicalRegistration"
                    onChange={handleChange}
                    sx={inputStyle}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Especilidad</InputLabel>
                    <Select
                      id="specialtie"
                      label="Especialidad"
                      name="specialtie"
                      onChange={handleChange}
                      sx={{ borderRadius: 0 }}
                    >
                      <MenuItem value={"ANESTESIOLOGIA"}>Anestesiología</MenuItem>
                      <MenuItem value={"CARDIOVASCULAR"}>Cardiología</MenuItem>
                      <MenuItem value={"CXCARDIOVASCULAR"}>Cirugía Cardiovascular</MenuItem>
                      <MenuItem value={"CIRUGIA"}>Cirugía (otras)</MenuItem>
                      <MenuItem value={"CLINICA"}>Clínica Médica</MenuItem>
                      <MenuItem value={"DERMATOLOGIA"}>Dermatología</MenuItem>
                      <MenuItem value={"DXIMAGENES"}>Diagnóstico por Imágenes</MenuItem>
                      <MenuItem value={"ENDOCRINOLOGIA"}>
                        Endocrinología
                      </MenuItem>
                      <MenuItem value={"FISIATRIA"}>Fisiatria</MenuItem>
                      <MenuItem value={"GASTROENTEROLOGIA"}>
                        Gastroenterología
                      </MenuItem>
                      <MenuItem value={"GENETICA"}>Genética Médica</MenuItem>
                      <MenuItem value={"GINECOLOGIA"}>
                        Ginecoobstetricia
                      </MenuItem>
                      <MenuItem value={"HEMATOLOGIA"}>Hematología</MenuItem>
                      <MenuItem value={"INFECTOLOGIA"}>Infectología</MenuItem>
                      <MenuItem value={"GENERALISTA"}>Medicina General</MenuItem>
                      <MenuItem value={"FAMILIA"}>Medicina de Familia</MenuItem>
                      <MenuItem value={"NEFROLOGIA"}>Nefrología</MenuItem>
                      <MenuItem value={"NEUMONOLOGIA"}>Neumonología</MenuItem>
                      <MenuItem value={"NEUROLOGIA"}>Neurologia</MenuItem>
                      <MenuItem value={"NUTRICION"}>Nutrición</MenuItem>
                      <MenuItem value={"OFTALMOLOGIA"}>Oftalmología</MenuItem>
                      <MenuItem value={"ONCOLOGIA"}>Oncología</MenuItem>
                      <MenuItem value={"ORL"}>ORL</MenuItem>
                      <MenuItem value={"PEDIATRIA"}>Pediatría</MenuItem>
                      <MenuItem value={"PSIQUIATRIA"}>Psiquiatría</MenuItem>
                      <MenuItem value={"REUMATOLOGIA"}>Reumatología</MenuItem>
                      <MenuItem value={"INTENSIVA"}>Terapia Intensiva</MenuItem>
                      <MenuItem value={"TRAUMATOLOGIA"}>Traumatología</MenuItem>
                      <MenuItem value={"UROLOGIA"}>Urología</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Inicio de actividad"
                      id="selectedDate"
                      value={selectedDate}
                      onChange={handleDateChange}
                      format="DD/MM/YYYY"
                      sx={{
                        width: "100%",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 0,
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} mt={2}>
                  <FormControl fullWidth>
                    <InputLabel>Contraseña</InputLabel>
                    <OutlinedInput
                      fullWidth
                      label="Contraseñ"
                      id="password"
                      name="password"
                      onChange={handleChange}
                      sx={{ borderRadius: 0 }}
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
                      fullWidth
                      label="repitetucontraseña"
                      name="password2"
                      id="password2"
                      onChange={handlePasswordConfirmation}
                      sx={{ borderRadius: 0 }}
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
                  backgroundColor: "#315d9f",
                  boxShadow: "0",
                  borderRadius: 0,
                }}
                onClick={onRegister}
                disabled={!areEquals || !emailFormat}
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
