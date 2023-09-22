import { React } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import {
  Avatar,
  Badge,
  Button,
  Container,
  Divider,
  IconButton,
  Link,
} from "@mui/material";
import { Editor } from "draft-js";
import { useProtocolView } from "../../../hooks/useProtocolView.js";
import { useMostViewedProtocol } from "../../../hooks/useMostViewedProtocol.js";
import { useProtocolList } from "../../../hooks/useProtocolList.js";

import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import Sidebar from "./Sidebar.js";
import { CloudDownload } from "@mui/icons-material";

function ProtocolView() {
  const { mostViewedProtocol } = useMostViewedProtocol();
  const { editorStates, protocol, ImproveViews } = useProtocolView();
  const { myDate } = useProtocolList();

  const gradientColors = "linear-gradient(18deg, #283583 30%, #799A3D 85%)";

  const sidebar = {
    title: "About",
    description:
      "Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.",
    archives: [
      { title: "March 2020", url: "#" },
      { title: "February 2020", url: "#" },
      { title: "January 2020", url: "#" },
      { title: "November 1999", url: "#" },
      { title: "October 1999", url: "#" },
      { title: "September 1999", url: "#" },
      { title: "August 1999", url: "#" },
      { title: "July 1999", url: "#" },
      { title: "June 1999", url: "#" },
      { title: "May 1999", url: "#" },
      { title: "April 1999", url: "#" },
    ],
    social: [
      { name: "GitHub", icon: GitHubIcon },
      { name: "Twitter", icon: TwitterIcon },
      { name: "Facebook", icon: FacebookIcon },
    ],
  };

  if (protocol) {
    ImproveViews();
  }

  return (
    <Container component="main" sx={{ mt: 5, mb: 5 }}>
      {mostViewedProtocol && (
        <Grid item xs={12} md={6}>
          <Badge
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            badgeContent={"Top!"}
            color="primary"
          >
            <CardActionArea>
              <Card
                sx={{
                  display: "flex",
                  color: "white",
                  padding: "1.5rem",
                  backgroundImage: gradientColors,
                  borderRadius: "0.8rem",
                  opacity: "0.95",
                }}
              >
                <CardContent
                  sx={{ flex: 1, zIndex: 1, backdropFilter: "blur(0.5px)" }}
                >
                  <Typography fontSize={15}>
                    {mostViewedProtocol.protocolGroup}
                  </Typography>
                  <Divider />
                  <Grid mt={2}>
                    <Typography component="h4" variant="h4" paragraph>
                      {mostViewedProtocol.title}
                    </Typography>
                  </Grid>
                  <Typography variant="subtitle1" paragraph>
                    {mostViewedProtocol.intro}...
                  </Typography>
                  <Button href={`${mostViewedProtocol.id}`}>
                    Continuar leyendo...
                  </Button>
                </CardContent>
              </Card>
            </CardActionArea>
          </Badge>
        </Grid>
      )}
      <Grid container mt={5}>
        <Grid item xs={12} md={8}>
          <Grid>
            {protocol.protocolGroup}
            <Divider />
          </Grid>
          {editorStates.title && (
            <Typography>{protocol.title}</Typography>
          )}
          <Grid fontStyle="italic" color="text.secondary" display="flex">
            {myDate(protocol.publicationDate)}
            <Typography>, &nbsp; por &nbsp;</Typography>
            <Typography>{protocol.autor1}</Typography>
            <Typography
              fontStyle="italic"
              color="text.secondary"
              component="div"
              display="flex"
            >
              , &nbsp;
            </Typography>
            <Typography>{protocol.autor2}</Typography>
          </Grid>
          <Grid mt={3}>
            {editorStates.intro && (
              <>
                <Editor editorState={editorStates.intro} readOnly />
                <Divider sx={{ mb: 3, mt: 3 }} />
              </>
            )}
            {editorStates.generalInfo && (
              <>
                <Editor editorState={editorStates.generalInfo} readOnly />
                <Divider sx={{ mb: 3, mt: 3 }} />
              </>
            )}

            {editorStates.procedures && (
              <>
                <Editor editorState={editorStates.procedures} readOnly />
                <Divider sx={{ mb: 3, mt: 3 }} />
              </>
            )}
            {editorStates.annexed && (
              <>
                <Editor editorState={editorStates.annexed} readOnly />
                <Divider sx={{ mt: 3 }} />
              </>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Sidebar
            title={sidebar.title}
            description={sidebar.description}
            archives={sidebar.archives}
            social={sidebar.social}
          />
          <Grid
            item
            xs={12}
            mt={5}
            ml={3}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "left",
            }}
          >
            <IconButton
              href={`${protocol.driveLink}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Avatar sx={{ backgroundColor: "#283583", color: "#ffffff" }}>
                <CloudDownload />
              </Avatar>
            </IconButton>
            <Link
              href={`${protocol.driveLink}`}
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
            >
              Descargar protocolo
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProtocolView;
