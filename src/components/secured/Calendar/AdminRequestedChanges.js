import {
  Box,
  Container,
  createTheme,
} from "@mui/material";
import { ThemeProvider } from "styled-components";
import { useGetEvents } from "../../../hooks/useGetEvents";
import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import EventChangedDialog from "./Dialogs/EventChangedDialog.js";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#799a3d",
    },
  },
});

function AdminRequestedChanges() {
  const { changedEvents } = useGetEvents();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [infoOpen, setInfoOpen] = useState(false);
  const handleClose = () => {
    setInfoOpen(false);
  };
  const handleEventClick = (eventClickInfo) => {
    setSelectedEvent(eventClickInfo.event);
    setInfoOpen(true);
  };
  const renderChangedEvents = () => {
    return changedEvents.map((event) => ({
      id: event.id,
      title: event.title,
      start: new Date(event.startDate),
      end: new Date(event.endDate),
      color: event.color,
      userId: event.userId,
      eventStatus: event.eventStatus,
      extendedProps: {
        customProperty: event.eventStatus === "REQUESTED" ? "⏳ Cambio solicitado" : "✅ Asignada",
      },
    }));
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Container sx={{mt:5,mb:5}}>
        <Box className="calendar-container">
          <FullCalendar
            eventContent={(e) => {
              return (
                <Box>
                  <Box>Cambio solicitado - Tomará guardia: {e.event.title}</Box>
                </Box>
              );
            }}
            headerToolbar={{
              right: "today prev next",
            }}
            plugins={[listPlugin, interactionPlugin]}
            locale={esLocale}
            views={{listMonth: {titleFormat: {month: "short", year:"numeric"}}}}
            initialView="listMonth"
            events={changedEvents ? renderChangedEvents() : null}
            selectable={true}
            eventClick={handleEventClick}
          />
        </Box>
      </Container>
      <EventChangedDialog
        open={infoOpen}
        handleClose={handleClose}
        selectedEvent={selectedEvent}
      />
    </ThemeProvider>
  );
}

export default AdminRequestedChanges;
