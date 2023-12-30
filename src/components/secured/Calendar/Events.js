import { Container, Grid, Paper, Typography } from "@mui/material";
import UserEvents from "./UserEvents.js";
import RequiredEvents from "./RequiredEvents.js";

export default function Events() {
  const fontStyle = {
    mb: 2,
    letterSpacing: 1,
    fontWeight: "bold",
  };

  return (
    <Container sx={{ mt: 5, mb: 5 }}>
      <Grid container spacing={2} sx={{ textAlign: "center" }}>
        <Grid item xs={12} sm={6}>
          <Paper sx={{ backgroundColor: "#d5d5d5", boxShadow: 0 }}>
            <Typography variant="h5" sx={fontStyle}>
              Guardias asignadas
            </Typography>
          </Paper>
          <UserEvents />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper sx={{ backgroundColor: "#d5d5d5", boxShadow: 0 }}>
            <Typography variant="h5" sx={fontStyle}>
              Cambios solicitados
            </Typography>
          </Paper>
          <RequiredEvents />
        </Grid>
      </Grid>
    </Container>
  );
}
