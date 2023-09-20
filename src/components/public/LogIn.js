import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Key } from "@mui/icons-material";
import { CssBaseline } from "@mui/material";
import { useForm } from "../../hooks/useForm";
import { useLogin } from "../../hooks/useLogin";
import { useLocation } from "react-router-dom";
import { useSnackBar } from "../../hooks/useSnackbar";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#69445d",
    },
  },
});

const initialForm = {
  email: "",
  password: "",
};

export default function Login() {
  const { handleChange, form } = useForm(initialForm);
  const { setSnackbarMessage, setShowSnackbar, setSeverity, SnackBar } =
    useSnackBar();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");
  const { onLogin, SnackBar2 } = useLogin(form);

  React.useEffect(() => {
    if (status === "registered") {
      setSnackbarMessage(
        "Usuario registrado, aguarde autorización del administrador para iniciar sesión!"
      );
      setSeverity("info")
      setShowSnackbar(true);
    } else if (status === "rejected") {
      setSnackbarMessage("Aun no tiene permisos para ingresar!");
      setSeverity("error");
      setShowSnackbar(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

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
          <Avatar sx={{ bgcolor: "#6d7dac", width: 50, height: 50 }}>
            <Key sx={{ fontSize: 30 }} />
          </Avatar>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
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
              onChange={handleChange}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              onClick={onLogin}
              disableElevation
              sx={{
                mt: 3,
                mb: 1,
                backgroundColor: "#6d7dac",
                boxShadow: "0",
                borderRadius: 0,
                width: "100%",
              }}
            >
              <Typography>Iniciar Sesión</Typography>
            </Button>
            <Grid container>
              <Grid item display={"flex"}>
                <Typography variant="body2" color="#6c737f">
                  No tienes una cuenta?
                </Typography>
                &nbsp;
                <Link href="/register" variant="body2" color="#283583e0">
                  {"Crea una!"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      {SnackBar2}
      {SnackBar}
    </ThemeProvider>
  );
}
