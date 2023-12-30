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
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useUserList } from "../../../../hooks/useUserList";
import { useAddEvents } from "../../../../hooks/useAddEvents";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#799a3d",
    },
  },
});

const initialEvent = {
  startDate: undefined,
  endDate: undefined,
  userId: "",
  color: "",
  eventStatus: "CREATED",
};

const EventAddDialog = ({ open, handleClose }) => {
  const { userList } = useUserList();
  const { event, handleChange, handleAddEvent } = useAddEvents(initialEvent);

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
  return (
    <ThemeProvider theme={customTheme}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ mb: 1 }}>Agendar guardia médica:</DialogTitle>
        <DialogContent
          sx={{
            alignContent: "center",
            alignItems: "center",
            maxWidth: 400,
          }}
        >
          {/* <DialogContentText></DialogContentText> */}
          <FormControl sx={{ mb: 1, mt: 1 }} id="event-add" fullWidth>
            <InputLabel>Médico</InputLabel>
            <Select
              label="Médico"
              id="id"
              name="id"
              value={event.userId || ""}
              onChange={(e) => handleChange("id", e)}
              sx={{ borderRadius: 0 }}
            >
              {userList.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.lastname}, {user.name}
                </MenuItem>
              ))}
            </Select>
            <FormControl sx={{ mt: 1 }}>
              <InputLabel>Turno</InputLabel>
              <Select
                label="Color"
                value={event.color || ""}
                onChange={(e) => handleChange("color", e)}
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
            <Divider sx={{mt:2,mb:1}}/>
          </FormControl>
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
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: null,
                seconds: null,
              }}
              onChange={(e) => handleChange("start", e)}
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
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: null,
                seconds: null,
              }}
              onChange={(e) => handleChange("end", e)}
              shouldDisableDate={shouldDisableEndDate}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
          <Button
            onClick={() => {
              handleAddEvent();
              handleClose();
            }}
          >
            Agendar
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default EventAddDialog;
