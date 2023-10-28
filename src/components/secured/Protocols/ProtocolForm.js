import * as React from "react";
import { useState } from "react";
import ProtocolService from "../../../services/axios/ProtocolService.js";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Alert,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useRef } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";

import "../../../../node_modules/draft-js/dist/Draft.css";
import RichTextEditor from "./RichTextEditor";
import { Send } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#799a3d",
    },
  },
});
const customBoxStyle = {
  backgroundColor: "#a19ba8",
  maxWidth: "100%",
  color: "#fafafa",
  borderTopLeftRadius: "0",
  borderTopRightRadius: "0",
  marginBottom: -0.1,
};

export default function ProtocolForm() {
  const titleRef = useRef(null);
  const autor1Ref = useRef(null);
  const autor2Ref = useRef(null);
  const introRef = useRef(null);
  const generalInfoRef = useRef(null);
  const proceduresRef = useRef(null);
  const anexxedRef = useRef(null);
  const [title, setTitle] = useState("");
  const [autor1, setAutor1] = useState("");
  const [autor2, setAutor2] = useState("");
  const [group, setGroup] = useState("");
  const [video, setVideo] = useState();
  const [drive, setDrive] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [videoTitle, setVideoTitle] = useState();
  const [videoLink, setLink] = useState();
  const [videoGroup, setVideoGroup] = useState("");
  const [videoDate, setDate] = useState();
  const [notice, setNotice] = useState("");

  const navigate = useNavigate();
  const [selectedForm, setSelectedForm] = useState("protocol");
  const handleFormChange = (event) => {
    setSelectedForm(event.target.value);
  };
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
    if (group.trim() === "" || selectedDate === undefined) {
      setSnackbarMessage("Algunos campos se encuentran vacíos!");
      setSeverity("warning");
      setShowSnackbar(true);
      return;
    }
    const protocol = {
      title: title,
      autor1: autor1,
      autor2: autor2,
      intro: introRef.current.getContentWithFormat(),
      generalInfo: generalInfoRef.current.getContentWithFormat(),
      procedures: proceduresRef.current.getContentWithFormat(),
      annexed: anexxedRef.current.getContentWithFormat(),
      videoLink: video,
      driveLink: drive,
      publicationDate: selectedDate,
      protocolGroup: group,
    };

    ProtocolService.createProtocol(protocol)
      .then((response) => {
        const messageParam = encodeURIComponent(response.data);
        const tableName =
          protocol.protocolGroup === "PROCEDIMIENTO" ? "procedure" : "protocol";
        navigate(
          `/admin/data?table=${tableName}&status=success&mssg=${messageParam}`
        );
      })
      .catch((error) => {
        setSnackbarMessage(error.response.data.message);
        setSeverity("error");
        setShowSnackbar(true);
      });
  };
  const handleVideoSubmit = (e) => {
    e.preventDefault();
    if (
      videoTitle === undefined ||
      videoGroup === undefined ||
      videoLink === undefined ||
      videoDate === undefined ||
      videoTitle === "" ||
      videoGroup === "" ||
      videoLink === ""
    ) {
      setSnackbarMessage("Algunos campos se encuentran vacíos!");
      setSeverity("warning");
      setShowSnackbar(true);
      return;
    }
    const video = {
      title: videoTitle,
      videoGroup: videoGroup,
      link: videoLink,
      date: videoDate,
    };
    ProtocolService.createVideo(video)
      .then((response) => {
        const messageParam = encodeURIComponent(response.data);
        navigate(`/admin/data?table=video&status=success&mssg=${messageParam}`);
      })
      .catch((error) => {
        setSnackbarMessage(error.response.data.message);
        setSeverity("error");
        setShowSnackbar(true);
      });
  };
  const handleNoticeSubmit = (e) => {
    e.preventDefault();
    if (notice === "") {
      setSnackbarMessage("Algunos campos se encuentran vacíos!");
      setSeverity("warning");
      setShowSnackbar(true);
      return;
    }
    const notice2 = {
      title: notice,
    };
    ProtocolService.createNotice(notice2)
     .then((response) => {
        const messageParam = encodeURIComponent(response.data);
        navigate(`/admin/data?table=protocol&status=success&mssg=${messageParam}`);
      })
     .catch((error) => {
        setSnackbarMessage(error.response.data.message);
        setSeverity("error");
        setShowSnackbar(true);
      });
  };
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleAutor1 = (e) => {
    setAutor1(e.target.value);
  };
  const handleAutor2 = (e) => {
    setAutor2(e.target.value);
  };
  const handleDateChange = (e) => {
    setSelectedDate(e);
  };
  const handleInputChange = (e) => {
    setGroup(e.target.value);
  };
  const handleInputChangeV = (e) => {
    setVideo(e.target.value);
  };
  const handleInputChangeD = (e) => {
    setDrive(e.target.value);
  };
  const handleDateChange2 = (e) => {
    setDate(e);
  };
  const handleInputChange2 = (e) => {
    setVideoGroup(e.target.value);
  };
  const handleInputChangeV2 = (e) => {
    setVideoTitle(e.target.value);
  };
  const handleInputChangeD2 = (e) => {
    setLink(e.target.value);
  };
  const handleNotice = (e) => {
    setNotice(e.target.value);
  };
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Container component="main" sx={{ marginTop: 8, marginBottom: 15 }}>
        <Box
          sx={{
            mb: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Paper
            elevation={0}
            sx={{
              mx: "auto",
              p: 4,
              borderRadius: "0",
              backgroundColor: "#ebebeb",
            }}
          >
            <Box mb={2}>
              <Typography variant="h4" sx={{ fontWeight: 5 }}>
                ¿Que contenido desea publicar?
              </Typography>
            </Box>
            <Box ml={10}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Radio
                      checked={selectedForm === "protocol"}
                      onChange={handleFormChange}
                      value="protocol"
                    />
                  }
                  label="Protocolo / Procedimiento Institucional"
                />
                <FormControlLabel
                  control={
                    <Radio
                      checked={selectedForm === "video"}
                      onChange={handleFormChange}
                      value="video"
                    />
                  }
                  label="Video"
                />
                <FormControlLabel
                  control={
                    <Radio
                      checked={selectedForm === "notice"}
                      onChange={handleFormChange}
                      value="notice"
                    />
                  }
                  label="Aviso"
                />
              </FormGroup>
            </Box>
          </Paper>
        </Box>
        {selectedForm === "protocol" && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="form"
              noValidate
              sx={{ mt: 0, textAlign: "center" }}
            >
              <Grid item xs={12} sm={6} marginBottom={"2rem"}>
                <Box sx={customBoxStyle}>
                  <Typography variant="h6" letterSpacing={0.5}>
                    Título
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  id="title"
                  value={title}
                  onChange={handleTitle}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 0,
                      "& fieldset": {
                        borderWidth: 1,
                      },
                    },
                  }}
                />
              </Grid>

              <Grid container spacing={1}>
                <Grid item xs={12} sm={6} marginBottom={"2rem"}>
                  <Box sx={customBoxStyle}>
                    <Typography variant="h6" letterSpacing={0.5}>
                      Autor Primario
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    id="autor1"
                    value={autor1}
                    onChange={handleAutor1}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 0,
                        "& fieldset": {
                          borderWidth: 1,
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6} marginBottom={"2rem"}>
                  <Box sx={customBoxStyle}>
                    <Typography variant="h6" letterSpacing={0.5}>
                      Autor Secundario
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    id="autor2"
                    value={autor2}
                    onChange={handleAutor2}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 0,
                        "& fieldset": {
                          borderWidth: 1,
                        },
                      },
                    }}
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
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 0,
                        "& fieldset": {
                          borderWidth: 1,
                        },
                      },
                    }}
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
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 0,
                        "& fieldset": {
                          borderWidth: 1,
                        },
                      },
                    }}
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
                    sx={{ borderRadius: 0 }}
                  >
                    <MenuItem value={"CARDIOVASCULAR"}>Cardiología</MenuItem>
                    <MenuItem value={"CIRUGIA"}>Cirugía</MenuItem>
                    <MenuItem value={"ENDOCRINOMETABOLICO"}>
                      Endocrinometabolico
                    </MenuItem>
                    <MenuItem value={"GASTROENTEROLOGIA"}>
                      Gastroenterología
                    </MenuItem>
                    <MenuItem value={"GINECOOBSTETRICIA"}>
                      Ginecoobstetricia
                    </MenuItem>
                    <MenuItem value={"HOMEOSTASIS"}>Homeostasis</MenuItem>
                    <MenuItem value={"INFECTOLOGIA"}>Infectología</MenuItem>
                    <MenuItem value={"NEFROLOGIA"}>Nefrología</MenuItem>
                    <MenuItem value={"NEUMONOLOGIA"}>Neumonología</MenuItem>
                    <MenuItem value={"NEUROLOGIA"}>Neurologia</MenuItem>
                    <MenuItem value={"OTORRINOLARINGOLOGIA"}>ORL</MenuItem>
                    <MenuItem value={"PROCEDIMIENTO"}>
                      Procedimiento Institucional
                    </MenuItem>
                    <MenuItem value={"TOXICOLOGIA"}>Toxicología</MenuItem>
                    <MenuItem value={"TRAUMATOLOGIA"}>Traumatología</MenuItem>
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
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 0,
                      },
                    }}
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
        )}
        {selectedForm === "video" && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box component="form" noValidate sx={{ textAlign: "center" }}>
              <Grid item xs={12} sm={6}>
                <Box mb={5}>
                  <Box sx={customBoxStyle}>
                    <Typography variant="h6" letterSpacing={0.5}>
                      Título
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    id="title"
                    value={videoTitle}
                    onChange={handleInputChangeV2}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 0,
                        "& fieldset": {
                          borderWidth: 1,
                        },
                      },
                    }}
                  />
                </Box>
                <Box mb={5}>
                  <Box sx={customBoxStyle}>
                    <Typography variant="h6" letterSpacing={0.5}>
                      Link YouTube
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    id="videoLink"
                    value={videoLink}
                    onChange={handleInputChangeD2}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 0,
                        "& fieldset": {
                          borderWidth: 1,
                        },
                      },
                    }}
                  />
                </Box>
                <Grid>
                  <FormControl sx={{ minWidth: 200, mr: 2 }} size="small">
                    <InputLabel>Grupo</InputLabel>
                    <Select
                      id="videoGroup"
                      label="Group"
                      value={videoGroup}
                      onChange={handleInputChange2}
                      sx={{ borderRadius: 0 }}
                    >
                      <MenuItem value={"CARDIOVASCULAR"}>Cardiología</MenuItem>
                      <MenuItem value={"CIRUGIA"}>Cirugía</MenuItem>
                      <MenuItem value={"ENDOCRINOMETABOLICO"}>
                        Endocrinometabolico
                      </MenuItem>
                      <MenuItem value={"GASTROENTEROLOGIA"}>
                        Gastroenterología
                      </MenuItem>
                      <MenuItem value={"GINECOOBSTETRICIA"}>
                        Ginecoobstetricia
                      </MenuItem>
                      <MenuItem value={"HOMEOSTASIS"}>Homeostasis</MenuItem>
                      <MenuItem value={"INFECTOLOGIA"}>Infectología</MenuItem>
                      <MenuItem value={"NEFROLOGIA"}>Nefrología</MenuItem>
                      <MenuItem value={"NEUMONOLOGIA"}>Neumonología</MenuItem>
                      <MenuItem value={"NEUROLOGIA"}>Neurologia</MenuItem>
                      <MenuItem value={"OTORRINOLARINGOLOGIA"}>ORL</MenuItem>
                      <MenuItem value={"TOXICOLOGIA"}>Toxicología</MenuItem>
                      <MenuItem value={"TRAUMATOLOGIA"}>Traumatología</MenuItem>
                      <MenuItem value={"UROLOGIA"}>Urología</MenuItem>
                    </Select>
                  </FormControl>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Publicación"
                      slotProps={{ textField: { size: "small" } }}
                      id="date"
                      value={videoDate}
                      onChange={handleDateChange2}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 0,
                        },
                      }}
                    />
                  </LocalizationProvider>

                  <Button
                    type="submit"
                    variant="contained"
                    endIcon={<Send />}
                    disableElevation
                    sx={{
                      backgroundColor: "#6d7dac",
                      boxShadow: "0",
                      borderRadius: 0,
                      ml: 2,
                    }}
                    onClick={handleVideoSubmit}
                  >
                    Publicar
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}
        {selectedForm === "notice" && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box component="form" noValidate sx={{ textAlign: "center" }}>
              <Grid item xs={12} sm={6}>
                <Box mb={5}>
                  <Box sx={customBoxStyle}>
                    <Typography variant="h6" letterSpacing={0.5}>
                      Aviso
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    id="notice"
                    value={notice}
                    onChange={handleNotice}
                    sx={{
                      minWidth:600,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 0,
                        "& fieldset": {
                          borderWidth: 1,
                        },
                      },
                    }}
                  />
                </Box>
                <Button
                  type="button"
                  variant="contained"
                  endIcon={<Send />}
                  disableElevation
                  sx={{
                    backgroundColor: "#6d7dac",
                    boxShadow: "0",
                    borderRadius: 0,
                  }}
                  onClick={handleNoticeSubmit}
                >
                  Publicar
                </Button>
              </Grid>
            </Box>
          </Box>
        )}
      </Container>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3500}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
