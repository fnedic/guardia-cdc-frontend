import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Container, Divider } from "@mui/material";

function ProtocolView() {
  const post = {
    title: "Infecciones del tracto urinario",
    date: "23/12/2022",
    autor1: "Facundo Nedic",
    autor2: "Vanina Solavallone",
    intro:
      "La infección del tracto urinario (ITU) consiste en la colonización y multiplicación microbiana en la vía urinaria asociado a signo-sintomatología. Estos procesos son motivo frecuente de consulta en el servicio de Guarda con la consecuente prescripción de antimicrobianos. ",
    generalInfo:
      "Es más frecuente en mujeres (relación 3:1), asociado a la actividad sexual, embarazo y edad. En el varón, predomina luego de los 50 años, en relación a la presencia de alteraciones prostáticas o manipulaciones urológicas. Existe creciente resistencia antimicrobiana en Argentina, siendo mayor al 20% para Trimetoprima/Sulfametoxazol y Ampicilina Sulbactam, y en aumento para Fluoroquinolonas.",
    procedures: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    anexxed: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    videoLink: "",
    drivelLink: "",
    imageLink: "https://source.unsplash.com/random?wallpapers",
    group: "Infectología",
  };

  const cardImgStyle = {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    objectFit: "cover",
    borderRadius: "0.5rem",
    opacity: "5px",
  };

  return (
    <Container sx={{ mt: 5, mb: 5 }}>
      <main>
        <Grid item xs={12} md={6}>
          <CardActionArea component="" href="">
            <Card sx={{ display: "flex", color: "white", padding: "2rem" }}>
              <CardContent
                sx={{ flex: 1, zIndex: 1, backdropFilter: "blur(0.5px)" }}
              >
                <Typography component="h3" variant="h3" paragraph>
                  {post.title}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  {post.intro}
                </Typography>
                <Typography variant="subtitle1" color="primary">
                  Continuar leyendo...
                </Typography>
              </CardContent>
            </Card>
            <CardMedia
              component="img"
              style={cardImgStyle}
              image={post.imageLink}
            />
          </CardActionArea>
        </Grid>
        <Grid item xs={12} md={8} mt={7}>
          <Typography variant="h6" color={"text.secondary"} gutterBottom>
            {post.group}
          </Typography>
          <Divider />
          <Grid mt={3}>
            <Typography variant="h4">{post.title}</Typography>
            <Typography fontStyle={"italic"} color={"text.secondary"}>
              {post.date}, por {post.autor1}, {post.autor2}
            </Typography>
            <Typography></Typography>
            <Typography mt={3}>{post.intro}</Typography>
            <Typography mt={2}>{post.generalInfo}</Typography>
            <Typography mt={2}>{post.procedures}</Typography>
            <Typography mt={2}>{post.anexxed}</Typography>
            <Typography mt={2}>{post.videoLink}</Typography>
            <Typography mt={2}>{post.drivelLink}</Typography>
          </Grid>
        </Grid>
      </main>
    </Container>
  );
}

export default ProtocolView;
