import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  CssBaseline,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useRef } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";

import "../../../../node_modules/draft-js/dist/Draft.css";
import RichTextEditor from "./RichTextEditor";
import ProtocolService from "../../../services/ProtocolService.js";
import { Send } from "@mui/icons-material";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#69445d",
    },
  },
});

export default function ProtocolForm() {
  const titleRef = useRef(null);
  const autor1Ref = useRef(null);
  const autor2Ref = useRef(null);
  const introRef = useRef(null);
  const generalInfoRef = useRef(null);
  const proceduresRef = useRef(null);
  const anexxedRef = useRef(null);

  const handleRichTextChange = (id, editorState) => {
    // eslint-disable-next-line
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
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const protocol = {
      title: titleRef.current.getContentWithFormat(),
      autor1: autor1Ref.current.getContentWithFormat(),
      autor2: autor2Ref.current.getContentWithFormat(),
      intro: introRef.current.getContentWithFormat(),
      generalInfo: generalInfoRef.current.getContentWithFormat(),
      procedures: proceduresRef.current.getContentWithFormat(),
      annexed: anexxedRef.current.getContentWithFormat(),
      videoLink: video,
      driveLink: drive,
      publicationDate: selectedDate,
      protocolGroup: group,
    };

    ProtocolService.createProtocol(protocol).then((user) => {});

    handleRedirect();
  };

  const [selectedDate, setDate] = React.useState();
  const handleDateChange = (date) => {
    setDate(date);
  };

  const [group, setGroup] = React.useState("");
  const [video, setVideo] = React.useState();
  const [drive, setDrive] = React.useState();

  const handleInputChange = (e) => {
    setGroup(e.target.value);
  };
  const handleInputChangeV = (e) => {
    setVideo(e.target.value);
  };
  const handleInputChangeD = (e) => {
    setDrive(e.target.value);
  };

  const handleRedirect = () => {
    window.location.href = "/admin";
  };

  const customBoxStyle = {
    backgroundColor: "#a19ba8",
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
          <Box component="form" noValidate sx={{ mt: 0, textAlign: "center" }}>
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
                <TextField
                  fullWidth
                  id="videoLink"
                  value={video}
                  onChange={handleInputChangeV}
                />
              </Grid>

              <Grid item xs={12} sm={6} marginBottom={"2rem"}>
                <Box sx={customBoxStyle}>
                  <Typography variant="h6" letterSpacing={0.5}>
                    Protocolo (link Google Drive)
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  id="driveLink"
                  value={drive}
                  onChange={handleInputChangeD}
                />
              </Grid>
            </Grid>

            <Grid item xs={12} sm={2}>
              <FormControl sx={{ minWidth: 200, mr: 5 }} size="small">
                <InputLabel>Grupo</InputLabel>
                <Select
                  id="protocolGroup"
                  value={group}
                  label="Group"
                  onChange={handleInputChange}
                >
                  <MenuItem value={"CARDIOVASCULAR"}>Cardiología</MenuItem>
                  <MenuItem value={"CIRUGIA"}>Cirugía</MenuItem>
                  <MenuItem value={"GENERALES"}>Generales</MenuItem>
                  <MenuItem value={"INFECTOLOGIA"}>Infectología</MenuItem>
                  <MenuItem value={"OTORRINOLARINGOLOGIA"}>ORL</MenuItem>
                  <MenuItem value={"RESPIRATORIO"}>Respiratorio</MenuItem>
                  <MenuItem value={"TRAUMATOLOGIA"}>Traumatología</MenuItem>
                  <MenuItem value={"TOXICOLOGIA"}>Toxicología</MenuItem>
                  <MenuItem value={"URGENCIAS"}>Urgencias</MenuItem>
                  <MenuItem value={"UROLOGIA"}>Urología</MenuItem>
                </Select>
              </FormControl>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Publicación"
                  slotProps={{ textField: { size: "small" } }}
                  id="createdDate"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </LocalizationProvider>

              <Button
                type="submit"
                variant="contained"
                endIcon={<Send />}
                disableElevation
                sx={{
                  mt: 0.2,
                  ml: 6,
                  backgroundColor: "#6d7dac",
                  boxShadow: "0",
                  borderRadius: 0,
                  width: "20%",
                }}
                onClick={handleSubmit}
              >
                Publicar
              </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
