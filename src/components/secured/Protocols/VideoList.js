import React, { useState } from "react";
import {
  Avatar,
  Box,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  Pagination,
  Paper,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { KeyboardArrowRight, Search, YouTube } from "@mui/icons-material";
import Link from "@mui/material/Link";
import { useVideoList } from "../../../hooks/useVideoList";
import LoadingMain from "./../../public/LoadingMain";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#315d9f",
    },
  },
});

export default function VideoList() {
  const { videoList, myDate } = useVideoList();
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  if (!videoList || videoList.length === 0) {
    return <LoadingMain />;
  }
  const videosPerPage = 6;
  const filteredVideos = videoList.filter(
    (video) =>
      video.title.toLowerCase().includes(searchText.toLowerCase()) ||
      video.videoGroup.toLowerCase().includes(searchText.toLowerCase())
  );

  function generate() {
    const startIndex = (page - 1) * videosPerPage;
    const endIndex = startIndex + videosPerPage;
    const currentPageVideos = filteredVideos.slice(startIndex, endIndex);
    return currentPageVideos.map((video) => (
      <ListItem key={video.id}>
        <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
          <Paper
            elevation={0}
            square
            sx={{
              textAlign: "center",
              mx: "auto",
              p: 2,
              background: "#f4f5ff",
              maxWidth: 1000,
            }}
          >
            <Stack direction="row" alignItems="center">
              <ListItemAvatar>
                <IconButton
                  href={`${video.link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Avatar sx={{ backgroundColor: "#e1e3ff", color: "#e14949" }}>
                    <YouTube />
                  </Avatar>
                </IconButton>
              </ListItemAvatar>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "left",
                  }}
                >
                  <Typography>{video.videoGroup} </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={5}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "left",
                  }}
                >
                  <Link
                    href={`${video.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {video.title}
                  </Link>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={3}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography>{myDate(video.date)}</Typography>
                </Grid>
              </Grid>
              <IconButton
                target="_blank"
                rel="noopener noreferrer"
                href={`${video.link}`}
              >
                <Avatar>
                  <KeyboardArrowRight />
                </Avatar>
              </IconButton>
            </Stack>
          </Paper>
        </Box>
      </ListItem>
    ));
  }

  return (
    <ThemeProvider theme={customTheme}>
      <Container
        component="main"
        sx={{
          marginBottom: 5,
          marginTop: 3,
          alignContent: "center",
          textAlign: "center",
        }}
      >
        <Box>
          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              size="small"
              placeholder="Buscar..."
              variant="outlined"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              sx={{ mb: 3, maxWidth: 500 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            <Box
              sx={{
                display: { xs: "none", sm: "block" },
                flexGrow: 1,
                overflow: "hidden",
              }}
            >
              <Paper
                elevation={0}
                square
                sx={{
                  textAlign: "center",
                  mx: "auto",
                  p: 1,
                  background: "#ebeeff",
                  maxWidth: 1000,
                }}
              >
                <Stack direction="row" alignItems="center">
                  <Grid container>
                    <Grid
                      item
                      xs={12}
                      sm={3}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography>Grupo</Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={5}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography>Título</Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography>Fecha de publicación</Typography>
                    </Grid>
                  </Grid>
                </Stack>
              </Paper>
            </Box>
            <List>{generate()}</List>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Pagination
              count={Math.ceil(filteredVideos.length / videosPerPage)}
              page={page}
              onChange={(event, value) => {
                setPage(value);
              }}
              variant="outlined"
              color="primary"
              size="medium"
            />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
