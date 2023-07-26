import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

function ProtocolView() {
  const protocol = {

    title: "Protocol",
    autor1: "Facundo Nedic",
    autor2: "Vanina Solavallone",
    intro: "La infección del tracto urinario (ITU) consiste en la colonización y multiplicación microbiana en la vía urinaria asociado a signo-sintomatología. Estos procesos son motivo frecuente de consulta en el servicio de Guarda con la consecuente prescripción de antimicrobianos. ",
    generalInfo: "Es más frecuente en mujeres (relación 3:1), asociado a la actividad sexual, embarazo y edad. En el varón, predomina luego de los 50 años, en relación a la presencia de alteraciones prostáticas o manipulaciones urológicas. Existe creciente resistencia antimicrobiana en Argentina, siendo mayor al 20% para Trimetoprima/Sulfametoxazol y Ampicilina Sulbactam, y en aumento para Fluoroquinolonas.",
    procedures: "",
    anexxed: "",
    videoLink: "",
    protocolLink: "",

  }

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {post.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {post.date}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.description}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Continue reading...
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={post.image}
            alt={post.imageLabel}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProtocolView;