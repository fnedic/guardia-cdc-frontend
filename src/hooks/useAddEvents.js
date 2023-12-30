import { useState } from "react";
import CalendarService from "../services/axios/CalendarService.js";
import { useEffect } from "react";

export const useAddEvents = (initialEvent) => {
  const [event, setEvent] = useState(initialEvent);
  const handleChange = (name, e) => {
    if (name === "start") {
      setEvent({
        ...event,
        startDate: e,
      });
    } else if (name === "end") {
      setEvent({
        ...event,
        endDate: e,
      });
    } else if (name === "id") {
      setEvent({
        ...event,
        userId: e.target.value,
      });
    } else if (name === "color") {
      setEvent({
        ...event,
        color: e.target.value,
      });
    }
  };

  const validateData = (event) => {
    if (
      event.startDate &&
      event.endDate &&
      (event.startDate.isAfter(event.endDate) ||
        event.startDate.isSame(event.endDate))
    ) {
      alert(
        "La fecha de finalización del evento no puede ser igual o anterior a la de inicio!"
      );
      return false;
    } else if (
      event.endDate === undefined ||
      event.startDate === undefined ||
      event.endDate.isValid() === false ||
      event.startDate.isValid() === false ||
      event.userId.trim() === "" ||
      event.color.trim() === ""
    ) {
      alert("Algunos campos se encuentran sin completar");
      return false;
    } else {
      return true;
    }
  };

  const handleAddEvent = (e) => {
    if (validateData(event)) {
      CalendarService.createEvent(event)
        .then((r) => {
          alert(r.data);
          window.location.href = "/admin/calendar";
        })
        .catch((err) => {
          alert(err.response.data);
        });
    }
  };

  const handleDeleteEvent = (id) => {
    CalendarService.deleteEvent(id)
      .then((r) => {
        alert(r.data);
        window.location.href = "/admin/calendar";
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  const handleEditEvent = () => {
    if (validateData(event)) {
      CalendarService.editEvent(event)
        .then((r) => {
          alert(r.data);
          window.location.href = "/admin/calendar";
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
  };

  const handlePublishEvents = (events) => {
    CalendarService.publishEvents(events)
      .then((r) => {
        alert(r.data);
        window.location.href = "/admin/calendar";
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const handleRequestChange = (id) => {
    CalendarService.requestChange(id)
      .then((r) => {
        alert(r.data);
        window.location.href = "/calendar";
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
      });
  };

  const handleRequestCancel = (id) => {
    CalendarService.requestCancel(id)
      .then((r) => {
        alert(r.data);
        window.location.href = "/calendar";
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
      });
  };

  const handleRequestAccept = (id) => {
    CalendarService.requestAccept(id)
      .then((r) => {
        alert(r.data);
        window.location.href = "/calendar";
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
      });
  };

  const handleRequestApprove = (id) => {
    CalendarService.requestChangeAccept(id)
      .then((r) => {
        alert(r.data);
        window.location.href = "/admin/requested-changes";
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
      });
  };

  const handleChangeCancel = (id) => {
    CalendarService.handleChangeCancel(id)
      .then((r) => {
        alert(r.data);
        window.location.href = "/admin/requested-changes";
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
      });
  };

  useEffect(() => {
    setEvent(initialEvent);
  }, [initialEvent]);

  return {
    event,
    handleChange,
    handleAddEvent,
    handleEditEvent,
    handleDeleteEvent,
    handlePublishEvents,
    handleRequestChange,
    handleRequestCancel,
    handleRequestAccept,
    handleRequestApprove,
    handleChangeCancel,
  };
};
