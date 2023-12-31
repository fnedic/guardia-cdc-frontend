import { Box, Container, Paper, Typography, createTheme } from "@mui/material";
import { ThemeProvider } from "styled-components";
import { useGetEvents } from "../../../hooks/useGetEvents";
import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import EventInfoUserRequiredDialog from "./Dialogs/EventInfoUserRequiredDialog.js";
import EventInfoOtherRequiredDialog from "./Dialogs/EventInfoOtherRequiredDialog.js";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#799a3d",
    },
  },
});

function RequiredEvents() {
  const { userReqEvents, otherReqEvents } = useGetEvents();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [userReqOpen, setUserReqOpen] = useState(false);
  const [otherReqOpen, setOtherReqOpen] = useState(false);
  const handleClose = () => {
    setUserReqOpen(false);
    setOtherReqOpen(false);
  };
  const handleEventUserClick = (eventClickInfo) => {
    setSelectedEvent(eventClickInfo.event);
    setUserReqOpen(true);
  };
  const handleEventOtherClick = (eventClickInfo) => {
    setSelectedEvent(eventClickInfo.event);
    setOtherReqOpen(true);
  };
  const userRequestedEvents = () => {
    return userReqEvents.map((event) => ({
      id: event.id,
      title: event.title,
      start: new Date(event.startDate),
      end: new Date(event.endDate),
      color: event.color,
      userId: event.userId,
      eventStatus: event.eventStatus,
      extendedProps: {
        customProperty:
          event.eventStatus === "REQUESTED"
            ? "⏳ Cambio solicitado"
            : "✅ Asignada",
      },
    }));
  };
  const otherRequestedEvents = () => {
    return otherReqEvents.map((event) => ({
      id: event.id,
      title: event.title,
      start: new Date(event.startDate),
      end: new Date(event.endDate),
      color: event.color,
      userId: event.userId,
      eventStatus: event.eventStatus,
      extendedProps: {
        customProperty:
          event.eventStatus === "REQUESTED"
            ? "⏳ Cambio solicitado"
            : "✅ Asignada",
      },
    }));
  };
  const fontStyle = {
    mb: 1,
    letterSpacing: 1,
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Container>
        <Box>
          <Paper sx={{ backgroundColor: "#f0f0f0", boxShadow: 0 }}>
            <Typography variant="h5" sx={fontStyle}>
              Mis solicitudes
            </Typography>
          </Paper>
          <FullCalendar
            eventContent={(eventInfo) => {
              return (
                <>
                  <Box>{eventInfo.event.title}</Box>
                  <Box>{eventInfo.event.extendedProps.customProperty}</Box>
                </>
              );
            }}
            headerToolbar={{
              right: "today next",
            }}
            views={{
              listMonth: { titleFormat: { month: "short", year: "numeric" } },
            }}
            plugins={[listPlugin, interactionPlugin]}
            locale={esLocale}
            height={"auto"}
            initialView="listMonth"
            events={userReqEvents ? userRequestedEvents() : null}
            selectable={true}
            eventClick={handleEventUserClick}
          />
        </Box>
        <Box sx={{ mt: 5 }}>
          <Paper sx={{ backgroundColor: "#f0f0f0", boxShadow: 0 }}>
            <Typography variant="h5" sx={fontStyle}>
              Solicitud de terceros
            </Typography>
          </Paper>
          <FullCalendar
            eventContent={(eventInfo) => {
              return (
                <>
                  <Box>{eventInfo.event.title}</Box>
                  <Box>{eventInfo.event.extendedProps.customProperty}</Box>
                </>
              );
            }}
            headerToolbar={{
              right: "today next",
            }}
            views={{
              listMonth: { titleFormat: { month: "short", year: "numeric" } },
            }}
            plugins={[listPlugin, interactionPlugin]}
            locale={esLocale}
            height={"auto"}
            initialView="listMonth"
            events={otherReqEvents ? otherRequestedEvents() : null}
            selectable={true}
            eventClick={handleEventOtherClick}
          />
        </Box>
      </Container>
      <EventInfoUserRequiredDialog
        open={userReqOpen}
        handleClose={handleClose}
        selectedEvent={selectedEvent}
      />
      <EventInfoOtherRequiredDialog
        open={otherReqOpen}
        handleClose={handleClose}
        selectedEvent={selectedEvent}
      />
    </ThemeProvider>
  );
}

export default RequiredEvents;
