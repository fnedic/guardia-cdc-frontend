import { React } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import { Badge, Button, Container, Divider } from "@mui/material";
import { Editor } from "draft-js";
import { useProtocolView } from "../../../hooks/useProtocolView.js";
import { useMostViewedProtocol } from "../../../hooks/useMostViewedProtocol.js";
import { useProtocolList } from "../../../hooks/useProtocolList.js";
import Sidebar from "./Sidebar.js";

function ProtocolView() {
  const { mostViewedProtocol } = useMostViewedProtocol();
  const { editorStates, protocol, ImproveViews } = useProtocolView();
  const { myDate } = useProtocolList();

  const gradientColors = "linear-gradient(18deg, #283583 30%, #dce4ff 95%)";

  if (protocol) {
    ImproveViews();
  }

  return (
    <Container component="main" sx={{ mt: 5, mb: 5 }}>
      {mostViewedProtocol && (
        <Grid item xs={12} md={6}>
          <Badge
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            badgeContent={"Top!"}
            color="success"
          >
            <CardActionArea>
              <Card
                sx={{
                  display: "flex",
                  color: "white",
                  padding: "1.5rem",
                  backgroundImage: gradientColors,
                  borderRadius: 0,
                  opacity: "0.95",
                  boxShadow: 0,
                }}
              >
                <CardContent
                  sx={{ flex: 1, zIndex: 1, backdropFilter: "blur(0.5px)" }}
                >
                  <Typography fontSize={15}>
                    {mostViewedProtocol.protocolGroup}
                  </Typography>
                  <Divider />
                  <Grid mt={2}>
                    <Typography component="h4" variant="h4" paragraph>
                      {mostViewedProtocol.title}
                    </Typography>
                  </Grid>
                  <Typography variant="subtitle1" paragraph>
                    {mostViewedProtocol.intro}...
                  </Typography>
                  <Button href={`${mostViewedProtocol.id}`}>
                    Continuar leyendo...
                  </Button>
                </CardContent>
              </Card>
            </CardActionArea>
          </Badge>
        </Grid>
      )}
      <Grid container mt={0} spacing={5}>
        <Grid item xs={12} md={8}>
          <Grid>
            {protocol.protocolGroup}
            <Divider />
          </Grid>
          <Grid mb={3} mt={3}>
            <Typography variant="h6">{protocol.title}</Typography>
          </Grid>
          <Typography fontStyle="italic" color="text.secondary">{`${myDate(
            protocol.publicationDate
          )}, por ${
            protocol.autor2
              ? protocol.autor1 + ", " + protocol.autor2
              : protocol.autor1
          }`}</Typography>
          <Grid mt={3}>
            {editorStates.intro && (
              <>
                <Editor editorState={editorStates.intro} readOnly />
              </>
            )}
            {editorStates.generalInfo && (
              <>
                <Editor editorState={editorStates.generalInfo} readOnly />
              </>
            )}

            {editorStates.procedures && (
              <>
                <Editor editorState={editorStates.procedures} readOnly />
              </>
            )}
            {editorStates.annexed && (
              <>
                <Editor editorState={editorStates.annexed} readOnly />
              </>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Sidebar driveLink={protocol.driveLink} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProtocolView;
