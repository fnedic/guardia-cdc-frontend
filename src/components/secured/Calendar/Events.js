import { Container, Grid, Typography } from "@mui/material";
import UserEvents from "./UserEvents.js";
import RequiredEvents from "./RequiredEvents.js";

export default function Events() {
  const fontStyle = {
    mb:5,
    letterSpacing: 1,
    fontWeight:"bold",
  };

  return (
    <Container sx={{ mt: 5, mb: 5 }}>
      <Grid container spacing={2} sx={{textAlign:"center"}}>
        <Grid item xs={12} sm={6}>
            <Typography
              variant="h5"
              sx={fontStyle}
            >
              GUARDIAS ASIGNADAS
            </Typography>
            <UserEvents />
        </Grid>
        <Grid item xs={12} sm={6}>
            <Typography
              variant="h5"
              sx={fontStyle}
            >
              CAMBIOS SOLICITADOS
            </Typography>
            <RequiredEvents />
        </Grid>
      </Grid>
    </Container>
  );
}
