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
import { Key, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  CssBaseline,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useForm } from "../../hooks/useForm";
import { useLogin } from "../../hooks/useLogin";
import { useLocation } from "react-router-dom";
import { useSnackBar } from "../../hooks/useSnackbar";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#799a3d",
    },
  },
});
const initialForm = {
  email: "",
  password: "",
};
const inputStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 0,
    "& fieldset": {
      borderWidth: 1,
    },
  },
};
export default function Login() {
  const { handleChange, form } = useForm(initialForm);
  const { setSnackbarMessage, setShowSnackbar, setSeverity, SnackBar } =
    useSnackBar();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");
  const {
    onLogin,
    SnackBar2,
    showPassword,
    handleMouseDownPassword,
    handleClickShowPassword,
  } = useLogin(form);

  React.useEffect(() => {
    if (status === "registered") {
      setSnackbarMessage(
        "Usuario registrado, aguarde autorización del administrador para iniciar sesión!"
      );
      setSeverity("info");
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
            marginTop: 5,
            marginBottom: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ bgcolor: "#315d9f", width: 50, height: 50 }}>
            <Key sx={{ fontSize: 30 }} />
          </Avatar>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
              sx={inputStyle}
            />
            <FormControl fullWidth>
              <InputLabel>Contraseña</InputLabel>
              <OutlinedInput
                required
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={onLogin}
              disableElevation
              sx={{
                mt: 3,
                mb: 1,
                backgroundColor: "#315d9f",
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
