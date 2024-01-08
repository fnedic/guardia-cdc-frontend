import React, { useState, useEffect } from "react";
import UserService from "../../services/axios/UserService.js";
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
import { useSnackBar } from "../../hooks/useSnackbar.js";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/es-us.js";
import dayjs from "dayjs";
dayjs.locale("es-us");

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#799a3d",
    },
  },
});

const specialtieOptions = {
  ANESTESIOLOGIA:"Anestesiología",
  CARDIOVASCULAR:"Cardiovascular",
  CXCARDIOVASCULAR:"Cirugía Cardiovascular",
  CIRUGIA:"Cirugía (otras)",
  CLINICA:"Clínica Médica",
  DERMATOLOGIA:"Dermatología",
  DXIMAGENES:"Diagnóstico por Imágenes",
  ENDOCRINOLOGIA:"Endocrinología",
  FISIATRIA:"Fisiatria",
  GASTROENTEROLOGIA:"Gastroenterología",
  GENETICA:"Genética Médica",
  GINECOLOGIA:"Ginecoobstetricia",
  HEMATOLOGIA:"Hematología",
  INFECTOLOGIA:"Infectología",
  GENERALISTA:"Medicina General",
  FAMILIA:"Medicina de Familia",
  NEFROLOGIA:"Nefrología",
  NEUMONOLOGIA:"Neumonología",
  NEUROLOGIA:"Neurología",
  NUTRICION:"Nutrición",
  OFTALMOLOGIA:"Oftalmología",
  ONCOLOGIA:"Oncología",
  ORL:"ORL",
  PEDIATRIA:"Pediatría",
  PSIQUIATRIA:"Psiquiatría",
  REUMATOLOGIA:"Reumatología",
  INTENSIVA:"Terapia Intensiva",
  TRAUMATOLOGIA:"Traumatología",
  UROLOGIA:"Urología",
};

const fieldLabels = {
  name: "Nombre",
  lastname: "Apellido",
  dni: "DNI",
  medicalRegistration: "Matrícula Médica",
  email: "Email",
};

function ProfileContent() {
  const { id } = useParams();
  const { SnackBar, setSeverity, setShowSnackbar, setSnackbarMessage } =
    useSnackBar();
  const [user, setUser] = useState({
    name: "",
    lastname: "",
    medicalRegistration: "",
    dni: "",
    email: "",
    specialtie: "",
    startDate: undefined,
  });

  const handleGoBack = () => {
    window.history.back();
  };

  useEffect(() => {
    UserService.getProfile(id).then((res) => {
      setUser(res.data);
    });
  }, [id]);

  const updateUser = (e) => {
    e.preventDefault();

    UserService.updateUser(user.id, user)
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

  const handleDateChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      startDate: e,
    }));
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
          <Avatar sx={{ bgcolor: "#427bd2", width: 50, height: 50 }}>
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
                        borderRadius: 0,
                        "& fieldset": {
                          borderWidth: 1,
                        },
                      },
                    }}
                  />
                </Grid>
              ))}
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Inicio de actividad"
                    name="startDate"
                    value={dayjs(user.startDate)}
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
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Especialidad</InputLabel>
                  <Select
                    sx={{ borderRadius: 0 }}
                    name="specialtie"
                    value={user.specialtie}
                    onChange={handleChange}
                    label="Especialidad"
                  >
                    {Object.entries(specialtieOptions).map(([value, label]) => (
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
                  backgroundColor: "#427bd2",
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
                Cerrar
              </Button>
            </Grid>
          </Box>
        </Box>
        {SnackBar}
      </Container>
    </ThemeProvider>
  );
}

export default ProfileContent;
