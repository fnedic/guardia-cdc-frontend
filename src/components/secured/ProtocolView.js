import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Container, Divider } from "@mui/material";
import { useState, useEffect } from "react";
import ProtocolService from "../secured/services/ProtocolService.js";
import { Editor, EditorState, convertFromRaw } from "draft-js";

function ProtocolView() {
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

  const initialState = {
    annexed: "",
    autor1: "",
    autor2: "",
    title: "",
    intro: "",
    procedures: "",
    generalInfo: "",
    videoLink: "",
    driveLink: "",
    protocolGroup: "",
    publicationDate: "",
  };

  const [protocol, setProtocol] = useState(initialState);
  const [editorStates, setEditorStates] = useState({}); // Store editor states dynamically

  useEffect(() => {
    ProtocolService.getProtocol()
      .then((data) => {
        setProtocol(data);
      })
      .catch((error) => {
        console.error("Error seteando protocolo! ", error);
      });
  }, []);

  useEffect(() => {
    const updatedEditorStates = {};

    // Iterate through protocol properties and create editor states for each section
    for (const key in protocol) {
      if (key !== "protocolGroup" || key !== "publicationDate") {
        const contentState = renderFormatedContent({ section: protocol[key] });
        if (contentState) {
          updatedEditorStates[key] =
            EditorState.createWithContent(contentState);
        }
      }
    }

    setEditorStates(updatedEditorStates);
  }, [protocol]);

  function renderFormatedContent({ section }) {
    try {
      if (!section) {
        return null;
      }
      const parsedSection = JSON.parse(section);
      const contentState = convertFromRaw(parsedSection);
      return contentState;
    } catch (error) {
      console.error("Error parsing JSON: ", error);
      return null;
    }
  }

  const post = { imageLink: "https://source.unsplash.com/random?wallpapers" };

  const myDate = new Date(protocol.publicationDate);
  const day = myDate.getDate();
  const month = myDate.getMonth() + 1;
  const year = myDate.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  return (
    <Container sx={{ mt: 5, mb: 5 }}>
      <main>
        <Grid item xs={12} md={6}>
          <CardActionArea component="" href="">
            <Card sx={{ display: "flex", color: "white", padding: "2rem" }}>
              <CardContent
                sx={{ flex: 1, zIndex: 1, backdropFilter: "blur(0.5px)" }}
              >
                <Grid>
                  {editorStates.title && (
                    <Editor editorState={editorStates.title} readOnly />
                  )}
                </Grid>
                <Grid>
                  {editorStates.intro && (
                    <Editor editorState={editorStates.intro} readOnly />
                  )}
                </Grid>
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

        <Grid mt={7}>
          <Grid>
            {protocol.protocolGroup}
            <Divider />
          </Grid>
          <Grid item xs={12} md={8} mt={4}>
            {editorStates.title && (
              <Editor editorState={editorStates.title} readOnly />
            )}
            <Grid fontStyle="italic" color="text.secondary" display="flex">
              {formattedDate}
              <Typography>, &nbsp; por &nbsp;</Typography>
              {editorStates.autor1 && (
                <Editor editorState={editorStates.autor1} readOnly />
              )}
              <Typography
                fontStyle="italic"
                color="text.secondary"
                component="div" // Cambio aquí
                display="flex"
              >
                , &nbsp;
              </Typography>
              {editorStates.autor2 && (
                <Editor editorState={editorStates.autor2} readOnly />
              )}
            </Grid>
            <Grid mt={3}>
              {editorStates.intro && (
                <Editor editorState={editorStates.intro} readOnly />
              )}
              {editorStates.generalInfo && (
                <Editor editorState={editorStates.generalInfo} readOnly />
              )}
              {editorStates.procedures && (
                <Editor editorState={editorStates.procedures} readOnly />
              )}
              {editorStates.annexed && (
                <Editor editorState={editorStates.annexed} readOnly />
              )}
              {editorStates.driveLink && (
                <Editor editorState={editorStates.driveLink} readOnly />
              )}
              {editorStates.videoLink && (
                <Editor editorState={editorStates.videoLink} readOnly />
              )}
            </Grid>
          </Grid>
        </Grid>
      </main>
    </Container>
  );
}

export default ProtocolView;
