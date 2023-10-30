import React, { useState, useEffect } from "react";
import ProtocolService from "../../../services/axios/ProtocolService.js";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { CssBaseline, createTheme, ThemeProvider, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useParams } from "react-router-dom";
import { Cancel, Edit, Update } from "@mui/icons-material";
import { useSnackBar } from "../../../hooks/useSnackbar.js";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#799a3d",
    },
  },
});

const groupOptions = {
  CARDIOCASVULAR: "Cardiovascular",
  CIRUGIA: "Cirugía",
  ENDOCRINOMETABOLICO: "Endocrinometabolico",
  GASTROENTEROLOGIA: "Gastroenterología",
  GINECOOBSTETRICIA: "Ginecoobstetricia",
  HOMEOSTASIS: "Homeostasis",
  INFECTOLOGIA: "Infectología",
  NEFROLOGIA: "Nefrología",
  NEUMONOLOGIA: "Neumonología",
  NEUROLOGIA: "Neurología",
  OTORRINOLARINGOLOGIA: "ORL",
  TOXICOLOGIA: "Toxicología",
  TRAUMATOLOGIA: "Traumatología",
  UROLOGIA: "Urología",
};

const fieldLabels = {
  title: "Título",
  link: "Link",
};

function UpdateVideo() {
  const { id } = useParams();
  const { SnackBar, setSeverity, setShowSnackbar, setSnackbarMessage } =
    useSnackBar();

  const [video, setVideo] = useState({
    title: "",
    videoGroup: "",
    link: "",
  });

  const handleGoBack = () => {
    window.history.back();
  };

  useEffect(() => {
    ProtocolService.getVideoById(id).then((res) => {
      setVideo(res.data);
    });
  }, [id]);

  const updateUser = (e) => {
    e.preventDefault();

    ProtocolService.updateVideo(id, video)
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
    setVideo({
      ...video,
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
          <Box component="form" id="video-form" sx={{ mt: 3 }}>
            <Grid container spacing={1}>
              {Object.keys(fieldLabels).map((fieldName) => (
                <Grid item xs={12} sm={12} key={fieldName}>
                  <TextField
                    fullWidth
                    label={fieldLabels[fieldName]}
                    name={fieldName}
                    value={video[fieldName]}
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
              <Grid item xs={12}>
                <FormControl>
                  <InputLabel>Grupo</InputLabel>
                  <Select
                    sx={{ minWidth: "30rem", borderRadius:0 }}
                    name="videoGroup"
                    value={video.videoGroup}
                    onChange={handleChange}
                    label="Estado"
                  >
                    {Object.entries(groupOptions).map(([value, label]) => (
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

export default UpdateVideo;
