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

const EventInfoUserDialog = ({ open, handleClose, selectedEvent }) => {
  const { handleRequestChange } = useAddEvents();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const handleChangeOpen = () => {
    setConfirmOpen(true);
  };
  const handleConfirmClose = () => {
    setConfirmOpen(false);
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
                  Estado: {selectedEvent.extendedProps.customProperty}
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
            <Button onClick={handleChangeOpen}>Solicitar Cambio</Button>
          </DialogActions>
        </Box>
      </Dialog>
      <Dialog open={confirmOpen} onClose={handleChangeOpen}>
        <DialogTitle>¡Atención!</DialogTitle>
        <DialogContent sx={{ maxWidth:400, minHeight: 120, margin:1 }}>
          <DialogContentText>
            Esta acción publicara esta guardia médica en el panel de solicitudes de cambios.
          </DialogContentText>
          <Divider sx={{ mt:2, mb:2 }}/>
          <DialogContentText>
            Desea continuar?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose}>Cerrar</Button>
          <Button
            onClick={() => {
              handleRequestChange(selectedEvent.id);
            }}
          >
            Publicar
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default EventInfoUserDialog;