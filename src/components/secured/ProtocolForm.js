import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#283583",
    },
  },
});

export default function ProtocolForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Container component="main">
        <Box
          sx={{
            marginTop: 8,
            marginBottom: 15,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 0, textAlign: "center" }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12} sm={10}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Título"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker label="Publicación" />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="autor1"
                  required
                  fullWidth
                  id="autor1"
                  label="Autor Primario"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="autor2"
                  label="Autor Secundario"
                  name="autor2"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  id="intro"
                  label="Introducción"
                  name="intro"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="generalInfo"
                  required
                  fullWidth
                  multiline
                  id="generalInfo"
                  label="Información General"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="procedures"
                  required
                  fullWidth
                  multiline
                  id="procedures"
                  label="Procedimientos"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  id="annexed"
                  label="Anexo"
                  name="annexed"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="videoLink"
                  label="Video (link YouTube)"
                  name="videoLink"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="protocolLink"
                  label="Protocolo (link Drive)"
                  name="protocolLink"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 5,
                backgroundColor: "#799A3D",
                boxShadow: "0",
                borderRadius: 1,
                width: "50%",
              }}
              onClick={handleSubmit}
            >
              Publicar
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
