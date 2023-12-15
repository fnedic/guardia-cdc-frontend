import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from "@fullcalendar/core/locales/es";
import interactionPlugin from "@fullcalendar/interaction";
import EventAddDialog from "./Dialogs/EventAddDialog.js";
import EventInfoDialog from "./Dialogs/EventInfoDialog.js";
import { Container, ThemeProvider, createTheme } from "@mui/material";
import { useGetEvents } from "../../../hooks/useGetEvents.js";
import EventPublishDialogList from "./Dialogs/EventPublishDialogList.js";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#799a3d",
    },
  },
});

const Calendar = () => {
  const [currentDates, setCurrentDates] = useState(null);
  const [open, setOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [publishOpen, setPublishOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { events, unpublishedEvents, fetchUnpublishedEvents } = useGetEvents(currentDates);

  const handleEditOpen = () => {
    setOpen(true);
  };

  const handlePublishOpen = () => {
    setPublishOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    setInfoOpen(false);
    setPublishOpen(false);
  };

  const handleEventClick = (eventClickInfo) => {
    setSelectedEvent(eventClickInfo.event);
    setInfoOpen(true);
  };

  const renderEvents = () => {
    return events.map((event) => ({
      id: event.id,
      title: event.title,
      start: new Date(event.startDate),
      end: new Date(event.endDate),
      color: event.color,
      userId: event.userId,
      eventStatus: event.eventStatus,
      extendedProps: {
        customProperty: event.eventStatus === "CREATED" ? "❌ Sin publicar" : "✅ Publicado"
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
        <FullCalendar
          eventContent={(eventInfo) => {
            return (
              <>
                <p>{eventInfo.timeText}</p>
                <p>{eventInfo.event.title}</p>
                <p>{eventInfo.event.extendedProps.customProperty}</p>
              </>
            );
          }}
          headerToolbar={{
            center: "addEvent publishEvent",
            right: "today prev,next",
          }}
          plugins={[timeGridPlugin, interactionPlugin]}
          titleFormat={{ year: "numeric", month: "short" }}
          locale={esLocale}
          initialView="timeGridWeek"
          views={{
            timeGridWeek: {
              type: "timeGrid",
              duration: { days: 4 },
              slotDuration: { hours: 1 },
              expandRows: "true",
              nowIndicator: "true",
            },
          }}
          allDaySlot={false}
          events={events ? renderEvents() : null}
          selectable={true}
          eventClick={handleEventClick}
          customButtons={{
            addEvent: {
              text: "Agendar +",
              hint: "agenda una guardia médica en el calendario",
              click: function () {
                handleEditOpen();
              },
            },
            publishEvent: {
              text: "Publicar guardias",
              hint: "publica y hace efectivas las guardias médicas agendadas",
              click: function () {
                fetchUnpublishedEvents(currentDates);
                handlePublishOpen();
              },
            },
          }}
          datesSet={handleDatesSet}
        />
        <EventAddDialog open={open} handleClose={handleClose} />
        <EventInfoDialog
          open={infoOpen}
          handleClose={handleClose}
          selectedEvent={selectedEvent}
        />
        <EventPublishDialogList open={publishOpen} handleClose={handleClose} unpublishedEvents={unpublishedEvents} />
      </Container>
    </ThemeProvider>
  );
};

export default Calendar;
