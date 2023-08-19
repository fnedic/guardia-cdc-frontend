import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Key } from "@mui/icons-material";
import { CssBaseline } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#283583",
    },
  },
});

export default function LogIn() {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    try {
      const response = await axios.post(
        "http://localhost:8080/cdc/login",
        formData
      );

      if (response.data === "Login exitoso!") {
        console.log("Inicio de sesión exitoso");
        navigate("/dashboard");
        // Realizar redirección u otras acciones después del inicio de sesión exitoso
      } else if (response.data === "Inicio de sesión fallido") {
        console.log("Inicio de sesión fallido ");
        // Manejar el inicio de sesión fallido
      }
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
    }
  };

  return (
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
            <Key sx={{ fontSize: 30 }} />
          </Avatar>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              sx={{ color: "#6c737f" }}
              control={<Checkbox value="remember" />}
              label="Recuérdame"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disableElevation
              sx={{
                mt: 1,
                mb: 1,
                backgroundColor: "#799A3D",
                boxShadow: "0",
                borderRadius: 1,
                width: "100%",
              }}
            >
              <Typography>Iniciar Sesión</Typography>
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" color="#283583e0">
                  Olvide mi contraseña
                </Link>
              </Grid>
              <Grid item display={"flex"}>
                <Typography variant="body2" color="#6c737f">
                  No tienes una cuenta?
                </Typography>
                &nbsp;
                <Link
                  href="http://localhost:3000/register"
                  variant="body2"
                  color="#283583e0"
                >
                  {"Crea una!"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
