import React from "react";
import {
  Avatar,
  Box,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Typography,
} from "@mui/material";
import { Book, KeyboardArrowRight } from "@mui/icons-material";
import { useProtocolList } from "../../hooks/useProtocolList";
export default function ProtocolList() {
  
  const { protocolArray } = useProtocolList();

  function generate() {
    return protocolArray.map((protocol) => (
      <ListItem>
        <ListItemAvatar>
          <IconButton href={`view/${protocol.id}`}>
            <Avatar>
              <Book />
            </Avatar>
          </IconButton>
        </ListItemAvatar>
        <Grid container>
          <Grid
            item
            xs={12}
            sm={3}
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
              justifyContent: "left",
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
      </ListItem>
    ));
  }

  return (
    <Container component="main" sx={{ marginBottom: 5, marginTop: 3 }}>
      <Box>
        <Grid item xs={12} md={12}>
          <List>{generate()}</List>
        </Grid>
      </Box>
    </Container>
  );
}
