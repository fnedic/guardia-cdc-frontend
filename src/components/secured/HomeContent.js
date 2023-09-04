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

export const HomeContent = () => {
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
      h3: undefined,
    },
    components: {
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            // Map the new variant to render a <h1> by default
            poster: "h3",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ minHeight: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
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
              }}
            >
              <Grid>
                <Typography variant="poster">Bienvenido/a</Typography>
              </Grid>
              <Divider />
              <Box>
                <Box mt={5} mb={5}>
                  <Box>
                    <Typography variant="h3">Ya tienes cuenta?</Typography>
                  </Box>
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    href="/login"
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
                    inicia sesión
                  </Button>
                </Box>
                <Divider />
                <Box mt={5} mb={5}>
                  <Box>
                    <Typography variant="h3">
                      Aun no tienes una cuenta?
                    </Typography>
                  </Box>
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    href="/register"
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
                    Registrarse
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
