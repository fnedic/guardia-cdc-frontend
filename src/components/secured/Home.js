import React from "react";
import image from "../public/images/home-background.svg";
import {
  Box,
  Button,
  CssBaseline,
  Divider,
  Grid,
  Paper,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { setAuthHeader } from "../../helpers/axios_helper";

export const Home = () => {
  
  const handleLogout = () => {
    setAuthHeader(null);
    window.location.href = "/login";
  };
  const defaultTheme = createTheme({
    palette: {
      primary: {
        main: "#69445d",
      },
    },
    typography: {
      poster: {
        fontSize: 50,
        color: "#283583",
      },
    },
    components: {
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            // Map the new variant to render a <h1> by default
            poster: "h2",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ maxHeight: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={4} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Grid>
                <Typography variant="poster">¡Bienvenido de nuevo!</Typography>
                <Typography variant="h3">¿Que deseas hacer?</Typography>
              </Grid>
              <Box>
                <Box mt={10} mb={8}>
                  <Box>
                    <Typography variant="h5">Editar mi perfil:</Typography>
                  </Box>
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    href="/profile"
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
                    editar perfil
                  </Button>
                </Box>
                <Divider />
                <Box mt={8} mb={5}>
                  <Box>
                    <Typography variant="h5">
                      Cerrar mi sesión:
                    </Typography>
                  </Box>
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    disableElevation
                    onClick={() => handleLogout()}
                    sx={{
                      mt: 3,
                      mb: 1,
                      backgroundColor: "#6d7dac",
                      boxShadow: "0",
                      borderRadius: 0,
                      width: "100%",
                    }}
                  >
                    Cerrar Sesión
                  </Button>
                </Box>
                <Divider />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};