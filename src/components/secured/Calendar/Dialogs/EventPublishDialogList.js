import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import {
  DialogContentText,
  List,
  ListItem,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useAddEvents } from "../../../../hooks/useAddEvents";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#799a3d",
    },
  },
});
function myDate(date) {
  const myDate = new Date(date);
  const day = myDate.getDate();
  const month = myDate.getMonth() + 1;
  const hours = myDate.getHours();
  const minutes = myDate.getMinutes();

  const formattedDay = day < 10 ? `0${day}` : `${day}`;
  const formattedMonth = month < 10 ? `0${month}` : `${month}`;
  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  const formattedDate = `${formattedDay}/${formattedMonth}-${formattedHours}:${formattedMinutes}hs`;
  return formattedDate;
}
const EventPublishDialogList = ({ open, handleClose, unpublishedEvents }) => {

  const { handlePublishEvents } = useAddEvents();

  return (
    <ThemeProvider theme={customTheme}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ mb: 1 }}>Publicar guardias</DialogTitle>
        {unpublishedEvents.map((event) => (
          <List key={event.id}>
            <ListItem sx={{ display: "flex", maxHeight: 2 }}>
              {event.title}&nbsp;
              <DialogContentText>
                ({myDate(event.startDate)} hasta {myDate(event.endDate)})
              </DialogContentText>
            </ListItem>
          </List>
        ))}
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
          <Button
            onClick={() => {
              handlePublishEvents(unpublishedEvents);
              handleClose();
            }}
          >
            Publicar
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default EventPublishDialogList;
