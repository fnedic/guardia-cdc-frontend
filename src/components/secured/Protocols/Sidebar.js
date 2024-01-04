import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useSidebar } from "../../../hooks/useSidebar";
import { Avatar, Box, IconButton, Skeleton } from "@mui/material";
import { CloudDownload } from "@mui/icons-material";

function Sidebar(driveLink) {
  const { notice } = useSidebar();

  return (
    <Grid item xs={12} md={12} mt={3}>
      <Paper elevation={0} sx={{ p: 2, bgcolor: "#ebeeff", borderRadius: 0 }}>
        <Typography variant="h6" gutterBottom>
          Aviso!
        </Typography>
        <Typography>
          {notice ? (
            <Box>
              <Typography>{notice.title}</Typography>
              <Typography>
                <Link
                  href={notice.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Enlace
                </Link>
              </Typography>
            </Box>
          ) : (
            <Skeleton variant="" width={300} height={100} />
          )}
        </Typography>
      </Paper>
      <Grid
        item
        xs={12}
        mt={5}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "left",
        }}
      >
        <IconButton
          href={`${driveLink.driveLink}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Avatar sx={{ backgroundColor: "#283583", color: "#ffffff" }}>
            <CloudDownload />
          </Avatar>
        </IconButton>
        <Link
          href={`${driveLink.driveLink}`}
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
        >
          Descargar protocolo
        </Link>
      </Grid>
    </Grid>
  );
}

export default Sidebar;
