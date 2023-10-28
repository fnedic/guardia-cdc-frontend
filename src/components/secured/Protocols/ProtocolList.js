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
  Pagination,
  Paper,
  Stack,
  TextField,
  Typography,
  createTheme,
} from "@mui/material";
import { Description, KeyboardArrowRight, Search } from "@mui/icons-material";
import { useProtocolList } from "../../../hooks/useProtocolList";
import { ThemeProvider } from "@mui/material/styles";
import LoadingMain from './../../public/LoadingMain';

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#799a3d",
    },
  },
});

export default function ProtocolList() {
  const { protocolArray } = useProtocolList();
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  if (!protocolArray || protocolArray.length === 0) {
    return <LoadingMain />;
  }
  const protocolsPerPage = 6;
  const filteredProtocols = protocolArray.filter(
    (protocol) =>
      protocol.title.toLowerCase().includes(searchText.toLowerCase()) ||
      protocol.protocolGroup.toLowerCase().includes(searchText.toLowerCase())
  );

  function generate() {
    const startIndex = (page - 1) * protocolsPerPage;
    const endIndex = startIndex + protocolsPerPage;
    const currentPageProtocols = filteredProtocols.slice(startIndex, endIndex);

    return currentPageProtocols.map((protocol) => (
      <Box>
        <ListItem key={protocol.id}>
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
                <IconButton href={`view/${protocol.id}`}>
                  <Avatar sx={{ backgroundColor: "#b4b8cc" }}>
                    <Description />
                  </Avatar>
                </IconButton>
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
                    <Typography>{protocol.protocolGroup} </Typography>
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
                    <Typography>{protocol.title}</Typography>
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
                    <Typography>{protocol.publicationDate}</Typography>
                  </Grid>
                </Grid>
                <IconButton href={`view/${protocol.id}`}>
                  <Avatar>
                    <KeyboardArrowRight />
                  </Avatar>
                </IconButton>
              </Stack>
            </Paper>
          </Box>
        </ListItem>
      </Box>
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
          <Box sx={{ display:"flex", justifyContent:"center" }}>
            <Pagination
              count={Math.ceil(filteredProtocols.length / protocolsPerPage)}
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