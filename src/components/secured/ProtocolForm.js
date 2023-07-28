import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Typography } from "@mui/material";
import { useRef } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";

import "../../../node_modules/draft-js/dist/Draft.css";
import RichTextEditor from "./RichTextEditor";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#283583",
    },
  },
});

export default function ProtocolForm() {
  const titleRef = React.useRef(null);
  const autor1Ref = useRef(null);
  const autor2Ref = useRef(null);
  const introRef = useRef(null);
  const generalInfoRef = useRef(null);
  const proceduresRef = useRef(null);
  const anexxedRef = useRef(null);
  const videoLinkRef = useRef(null);
  const driveLinkRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // const titleContentWithFormat = titleRef.current.getContentWithFormat();
    // console.log(titleContentWithFormat);
    // const autor1ContentWithFormat = autor1Ref.current.getContentWithFormat();
    // console.log(autor1ContentWithFormat);
    // const autor2ContentWithFormat = autor2Ref.current.getContentWithFormat();
    // console.log(autor2ContentWithFormat);
    // const generalInfoContentWithFormat = generalInfoRef.current.getContentWithFormat();
    // console.log(generalInfoContentWithFormat);
    // const proceduresContentWithFormat = proceduresRef.current.getContentWithFormat();
    // console.log(proceduresContentWithFormat);
    // const anexxedContentWithFormat = anexxedRef.current.getContentWithFormat();
    // console.log(anexxedContentWithFormat);
    // const videoLinkContentWithFormat = videoLinkRef.current.getContentWithFormat();
    // console.log(videoLinkContentWithFormat);
    // const driveLinkContentWithFormat = driveLinkRef.current.getContentWithFormat();
    // console.log(driveLinkContentWithFormat);

  };

  const handleRichTextChange = (id, editorState) => {
    switch (id) {
      case "title":
        titleRef.current = editorState;
        break;
      case "autor1":
        autor1Ref.current = editorState;
        break;
      case "autor2":
        autor2Ref.current = editorState;
        break;
      case "intro":
        introRef.current = editorState;
        break;
      case "generalInfo":
        generalInfoRef.current = editorState;
        break;
      case "procedures":
        proceduresRef.current = editorState;
        break;
      case "anexxed":
        anexxedRef.current = editorState;
        break;
      case "videoLink":
        videoLinkRef.current = editorState;
        break;
      case "driveLink":
        driveLinkRef.current = editorState;
        break;
    }
  };

  const customBoxStyle = {
    backgroundColor: "#283683e5",
    maxWidth: "100%",
    color: "#fafafa",
    borderTopLeftRadius: "0.7rem",
    borderTopRightRadius: "0.7rem",
  };

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />

      <Container component="main">
        <Box
          sx={{
            marginTop: 8,
            marginBottom: 15,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 0, textAlign: "center" }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12} marginBottom={"2rem"}>
                <Box sx={customBoxStyle}>
                  <Typography variant="h6" letterSpacing={0.5}>
                    Título
                  </Typography>
                </Box>
                <RichTextEditor
                  ref={titleRef}
                  id="title"
                  onContentChange={handleRichTextChange}
                />
              </Grid>

              <Grid item xs={12} sm={6} marginBottom={"2rem"}>
                <Box sx={customBoxStyle}>
                  <Typography variant="h6" letterSpacing={0.5}>
                    Autor Primario
                  </Typography>
                </Box>
                <RichTextEditor
                  ref={autor1Ref}
                  id="autor1"
                  onContentChange={handleRichTextChange}
                />
              </Grid>

              <Grid item xs={12} sm={6} marginBottom={"2rem"}>
                <Box sx={customBoxStyle}>
                  <Typography variant="h6" letterSpacing={0.5}>
                    Autor Secundario
                  </Typography>
                </Box>
                <RichTextEditor
                  ref={autor2Ref}
                  id="autor2"
                  onContentChange={handleRichTextChange}
                />
              </Grid>

              <Grid item xs={12} marginBottom={"2rem"}>
                <Box sx={customBoxStyle}>
                  <Typography variant="h6" letterSpacing={0.5}>
                    Introducción
                  </Typography>
                </Box>
                <RichTextEditor
                  ref={introRef}
                  id="intro"
                  onContentChange={handleRichTextChange}
                />
              </Grid>

              <Grid item xs={12} marginBottom={"2rem"}>
                <Box sx={customBoxStyle}>
                  <Typography variant="h6" letterSpacing={0.5}>
                    Información General
                  </Typography>
                </Box>
                <RichTextEditor
                  ref={generalInfoRef}
                  id="generalInfo"
                  onContentChange={handleRichTextChange}
                />
              </Grid>

              <Grid item xs={12} marginBottom={"2rem"}>
                <Box sx={customBoxStyle}>
                  <Typography variant="h6" letterSpacing={0.5}>
                    Procedimientos
                  </Typography>
                </Box>
                <RichTextEditor
                  ref={proceduresRef}
                  id="procedures"
                  onContentChange={handleRichTextChange}
                />
              </Grid>

              <Grid item xs={12} marginBottom={"2rem"}>
                <Box sx={customBoxStyle}>
                  <Typography variant="h6" letterSpacing={0.5}>
                    Anexo
                  </Typography>
                </Box>
                <RichTextEditor
                  ref={anexxedRef}
                  id="anexxed"
                  onContentChange={handleRichTextChange}
                />
              </Grid>

              <Grid item xs={12} sm={6} marginBottom={"2rem"}>
                <Box sx={customBoxStyle}>
                  <Typography variant="h6" letterSpacing={0.5}>
                    Video (link YouTube)
                  </Typography>
                </Box>
                <RichTextEditor
                  ref={videoLinkRef}
                  id="videoLink"
                  onContentChange={handleRichTextChange}
                />
              </Grid>

              <Grid item xs={12} sm={6} marginBottom={"2rem"}>
                <Box sx={customBoxStyle}>
                  <Typography variant="h6" letterSpacing={0.5}>
                    Protocolo (link Google Drive)
                  </Typography>
                </Box>
                <RichTextEditor
                  ref={driveLinkRef}
                  id="driveLink"
                  onContentChange={handleRichTextChange}
                />
              </Grid>
            </Grid>

            <Grid item xs={12} sm={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Publicación"
                  slotProps={{ textField: { size: "small" } }}
                />
              </LocalizationProvider>

              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 0.2,
                  ml: 6,
                  backgroundColor: "#799A3D",
                  boxShadow: "0",
                  borderRadius: 1,
                  width: "50%",
                }}
                onClick={handleSubmit}
              >
                Publicar Protocolo
              </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
