import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useUserList } from "../../../../hooks/useUserList";
import { useAddEvents } from "../../../../hooks/useAddEvents";
import { useState } from "react";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#799a3d",
    },
  },
});

const EventEditDialog = ({ open, setEditOpen, initialEvent }) => {
  const { userList } = useUserList();
  const { event, handleChange, handleEditEvent } = useAddEvents(initialEvent);
  const [formChanged, setFormChanged] = useState(false);
  const shouldDisableEndDate = (day) => {
    return event.startDate && day.isBefore(event.startDate, "day");
  };
  const ColorOptions = [
    { name: "Turno 1 - Médico 1", value: "#2e3e9b" },
    { name: "Turno 1 - Médico 2", value: "#7a79e2" },
    { name: "Turno 2 - Médico 1", value: "#307d36" },
    { name: "Turno 2 - Médico 2", value: "#7cb981" },
    { name: "Refuerzo 1", value: "#dd5050" },
    { name: "Refuerzo 2", value: "#7e7d89" },
  ];
  
  const handleFormChange = () => {
    setFormChanged(true);
  };

  const handleCancelFormChange = () => {
    setFormChanged(false);
    setEditOpen(false);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Dialog open={open} onClose={handleCancelFormChange}>
        <DialogTitle sx={{ mb: 1 }}>Editar guardia médica:</DialogTitle>
        <DialogContent
          sx={{
            alignContent: "center",
            alignItems: "center",
            maxWidth: 400,
          }}
        >
          <FormControl sx={{ mb: 1, mt: 1 }} id="event-add" fullWidth>
            <InputLabel>Médico</InputLabel>
            <Select
              label="Médico"
              id="id"
              name="id"
              value={event.userId || initialEvent.userId}
              onChange={(e) => {
                handleChange("id", e);
                handleFormChange();
              }}
              sx={{ borderRadius: 0 }}
            >
              {userList.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.lastname}, {user.name}
                </MenuItem>
              ))}
            </Select>
            <FormControl sx={{ mt: 1 }}>
              <InputLabel>Color</InputLabel>
              <Select
                label="Color"
                value={event.color || initialEvent.color}
                onChange={(e) => {
                  handleChange("color", e);
                  handleFormChange();
                }}
                sx={{ borderRadius: 0 }}
              >
                {ColorOptions.map((color) => (
                  <MenuItem
                    key={color.value}
                    value={color.value}
                    style={{
                      backgroundColor: color.value,
                      height: "3rem",
                    }}
                  >
                    {color.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </FormControl>
          <Divider sx={{mt:1,mb:2}}/>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              sx={{
                mb: 1,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 0,
                },
                width: "100%",
              }}
              label="Inicia"
              format="DD/MM/YYYY HH:mm"
              value={event.startDate || initialEvent.startDate}
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: null,
                seconds: null,
              }}
              onChange={(e) => {
                handleChange("start", e);
                handleFormChange();
              }}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              sx={{
                mb: 1,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 0,
                },
                width: "100%",
              }}
              label="Finaliza"
              format="DD/MM/YYYY HH:mm"
              value={event.endDate || initialEvent.endDate}
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: null,
                seconds: null,
              }}
              onChange={(e) => {
                handleChange("end", e);
                handleFormChange();
              }}
              shouldDisableDate={shouldDisableEndDate}
            />
          </LocalizationProvider>
          <Divider sx={{mt:1,mb:2}}/>
          <TextField
            label="Estado"
            value={event.eventStatus === "CREATED" ? "❌ Sin publicar" : "✅ Publicado"}
            disabled
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-root": {
                borderRadius: 0,
              },
            }}
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelFormChange}>Cerrar</Button>
          <Button
            onClick={() => {
              handleEditEvent();
              handleCancelFormChange();
            }}
            disabled={!formChanged}
          >
            Actualizar
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default EventEditDialog;
