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
import { KeyboardArrowRight, YouTube } from "@mui/icons-material";
import { useProtocolList } from "../../hooks/useProtocolList";
import Link from "@mui/material/Link";

export default function ProtocolList() {
  const { protocolArray } = useProtocolList();

  function generate() {
    return protocolArray.map((protocol) => (
      <Box>
        {protocol.videoLink && (
          <ListItem>
            <ListItemAvatar>
              <IconButton
                href={`${protocol.videoLink}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Avatar sx={{ backgroundColor: "#FFFFFF", color: "#FF0000" }}>
                  <YouTube />
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
                <Link
                  href={`${protocol.videoLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {protocol.title}
                </Link>
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
            <IconButton
              href={`${protocol.videoLink}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Avatar>
                <KeyboardArrowRight />
              </Avatar>
            </IconButton>
          </ListItem>
        )}
      </Box>
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
