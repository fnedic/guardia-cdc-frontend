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
import { KeyboardArrowRight, Newspaper, Search } from "@mui/icons-material";
import { ThemeProvider } from "@mui/material/styles";
import LoadingMain from './../../public/LoadingMain';
import { useProcedureList } from "../../../hooks/useProcedureList";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#69445d",
    },
  },
});

export default function ProceduresList() {
  const { procedureArray } = useProcedureList();
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);

  if (!procedureArray || procedureArray.length === 0) {
    return <LoadingMain />;
  }
  const procedurePerPage = 6;
  const filteredProcedures = procedureArray.filter(
    (procedure) =>
    procedure.title.toLowerCase().includes(searchText.toLowerCase())
  );

  function generate() {
    const startIndex = (page - 1) * procedurePerPage;
    const endIndex = startIndex + procedurePerPage;
    const currentPageProtocols = filteredProcedures.slice(startIndex, endIndex);

    return currentPageProtocols.map((procedure) => (
      <Box>
        <ListItem key={procedure.id}>
          <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
            <Paper
              elevation={0}
              square
              sx={{
                textAlign: "center",
                mx: "auto",
                p: 2,
                background: "#f4f4f4",
                maxWidth: 1000,
              }}
            >
              <Stack direction="row" alignItems="center">
                <IconButton href={`../protocol/view/${procedure.id}`}>
                  <Avatar sx={{ backgroundColor: "#c6abae" }}>
                    <Newspaper />
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
                    <Typography>Procedimiento Institucional </Typography>
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
                    <Typography>{procedure.title}</Typography>
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
                    <Typography>{procedure.publicationDate}</Typography>
                  </Grid>
                </Grid>
                <IconButton href={`../protocol/view/${procedure.id}`}>
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
                  background: "#e3e3e3",
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
              count={Math.ceil(filteredProcedures.length / procedurePerPage)}
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