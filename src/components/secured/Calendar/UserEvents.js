import { Box, Container, createTheme } from "@mui/material";
import { ThemeProvider } from "styled-components";
import { useGetEvents } from "../../../hooks/useGetEvents";
import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import EventInfoUserDialog from "./Dialogs/EventInfoUserDialog.js";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#799a3d",
    },
  },
});

function UserEvents() {
  const [currentDates, setCurrentDates] = useState(null);
  const { userEvents } = useGetEvents(currentDates);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [infoOpen, setInfoOpen] = useState(false);
  const handleClose = () => {
    setInfoOpen(false);
  };
  const handleEventClick = (eventClickInfo) => {
    setSelectedEvent(eventClickInfo.event);
    setInfoOpen(true);
  };
  const renderUserEvents = () => {
    return userEvents.map((event) => ({
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
  const handleDatesSet = (dateInfo) => {
    setCurrentDates({
      start: dateInfo.startStr,
      end: dateInfo.endStr,
    });
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Container>
        <Box className="calendar-container">
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
            plugins={[listPlugin, interactionPlugin]}
            locale={esLocale}
            views={{
              listMonth: { titleFormat: { month: "short", year: "numeric" } },
            }}
            height={"auto"}
            initialView="listMonth"
            events={userEvents ? renderUserEvents() : null}
            selectable={true}
            eventClick={handleEventClick}
            datesSet={handleDatesSet}
          />
        </Box>
      </Container>
      <EventInfoUserDialog
        open={infoOpen}
        handleClose={handleClose}
        selectedEvent={selectedEvent}
      />
    </ThemeProvider>
  );
}

export default UserEvents;
