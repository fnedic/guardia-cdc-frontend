import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useUserForm } from "../../hooks/CustomHooks";
import { CssBaseline } from "@mui/material";

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#283583',
    },
  },
});

export default function Register() {
  const { form, setForm, handleChanges } = useUserForm();

  const [areEquals, setAreEqual] = React.useState(true);
  const [passwordConfrimation, setPasswordConfirmation] = React.useState();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handlePasswordConfirmation = (e) => {
    setPasswordConfirmation(e.target.value); // atrapo el valor del input password2
  };

  React.useEffect(() => {
    const { password } = form;
    setAreEqual(password === passwordConfrimation);
  }, [passwordConfrimation]);

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline/>
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
            <AppRegistrationIcon sx={{fontSize: 35}}/>
          </Avatar>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Nombre"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Apellido"
                  name="lastName"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  onChange={handleChanges}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="dni"
                  required
                  fullWidth
                  id="dni"
                  label="DNI"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="medicalReg"
                  label="Matrícula Médica"
                  name="medicalReg"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  onChange={handleChanges}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Repite tu contraseña"
                  type="password"
                  id="password2"
                  onChange={handlePasswordConfirmation}
                />
                {!areEquals && (
                  <Typography
                    align="center"
                    boxShadow={3}
                    fontSize={"small"}
                    backgroundColor="#d32f2f"
                    color={"white"}
                    marginTop={0.5}
                    borderRadius={0.8}
                  >
                    Las contraseñas no coinciden!
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 1, backgroundColor: "#799A3D", boxShadow: "0", borderRadius: 1 }}
              onClick={handleSubmit}
              disabled={!areEquals}
            >
              Registrarme
            </Button>
            <Grid item display={"flex"}>
                <Typography variant="body2" color="#6c737f">Ya tienes una cuenta?</Typography>
                &nbsp;
                <Link href="http://localhost:3000/login" variant="body2" color="#283583e0">
                  {"Ingresa!"}
                </Link>
              </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}