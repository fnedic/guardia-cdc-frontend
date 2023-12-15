import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import EventEditDialog from "./EvenEditDialog";
import dayjs from "dayjs";
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
  const year = myDate.getFullYear();
  const hours = myDate.getHours();
  const minutes = myDate.getMinutes();

  const formattedDay = day < 10 ? `0${day}` : `${day}`;
  const formattedMonth = month < 10 ? `0${month}` : `${month}`;
  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  const formattedDate = `${formattedDay}/${formattedMonth}/${year} ${formattedHours}:${formattedMinutes}`;
  return formattedDate;
}

const EventInfoDialog = ({ open, handleClose, selectedEvent }) => {
  const initialEvent = {
    startDate: selectedEvent ? dayjs(selectedEvent.startStr) : undefined,
    endDate: selectedEvent ? dayjs(selectedEvent.endStr) : undefined,
    userId: selectedEvent ? selectedEvent.extendedProps.userId : undefined,
    color: selectedEvent ? selectedEvent.backgroundColor : undefined,
    id: selectedEvent ? selectedEvent.id : undefined,
    eventStatus: selectedEvent ? selectedEvent.extendedProps.eventStatus : undefined,
  };
  const { handleDeleteEvent } = useAddEvents();
  const [editOpen, setEditOpen] = useState(false);
  const handleEditOpen = () => {
    setEditOpen(true);
  };
  const [confirmOpen, setConfirmOpen] = useState(false);
  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };
  const handleConfirmOpen = () => {
    setConfirmOpen(true);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ mb: 1 }}>Información</DialogTitle>
        <DialogContent
          sx={{
            minWidth: 350,
          }}
        >
          {selectedEvent ? (
            <Box>
              <DialogContentText>
                Médico: {selectedEvent.title}
              </DialogContentText>
              {selectedEvent.extendedProps.customProperty && (
                <DialogContentText>
                  Observación: {selectedEvent.extendedProps.customProperty}
                </DialogContentText>
              )}
              <Divider sx={{ mt: 1, mb: 1 }} />
              <DialogContentText>
                Desde: {myDate(selectedEvent.startStr)}
              </DialogContentText>
              <DialogContentText>
                Hasta: {myDate(selectedEvent.endStr)}
              </DialogContentText>
            </Box>
          ) : (
            <CircularProgress color="success" />
          )}
        </DialogContent>
        <Box
          sx={{
            textAlign: "center",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <DialogActions>
            <Button onClick={handleClose}>Cerrar</Button>
            <Button sx={{ color:"#fb82a0" }} onClick={handleConfirmOpen}>Borrar</Button>
            <Button onClick={handleEditOpen}>Editar</Button>
          </DialogActions>
        </Box>
      </Dialog>
      <EventEditDialog
        open={editOpen}
        setEditOpen={setEditOpen}
        initialEvent={initialEvent}
      />
      <Dialog open={confirmOpen} onClose={handleConfirmClose}>
        <DialogTitle>¡Atención!</DialogTitle>
        <DialogContent sx={{ minWidth: 350, minHeight: 120, margin:1 }}>
          <DialogContentText>
            Esta acción no puede deshacerse!
          </DialogContentText>
          <DialogContentText>
            Desea borrar el evento seleccionado?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose}>Cerrar</Button>
          <Button
            sx={{color:"#fb82a0"}}
            onClick={() => {
              handleDeleteEvent(selectedEvent.id);
            }}
          >
            Borrar
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default EventInfoDialog;
