import { useEffect } from "react";
import { useState } from "react";
import CalendarServices from "../services/axios/CalendarService.js";

export const useGetEvents = (currentDates) => {
  const [events, setEvents] = useState([]);
  const [unpublishedEvents, setUnpublishedEvents] = useState([]);
  const [userEvents, setUserEvents] = useState([]);
  const [userReqEvents, setUserReqEvents] = useState([]);
  const [otherReqEvents, setOtherReqEvents] = useState([]);
  const [changedEvents, setChangedEvents] = useState([]);

  useEffect(() => {
    if (currentDates) {
      const start = currentDates.start;
      const end = currentDates.end;
      fetchEvents(start, end);
      fetchUserEvents(start, end);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDates]);

  const fetchEvents = async (start, end) => {
    try {
      const response = await CalendarServices.getEvents(start, end);
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchUnpublishedEvents = async (currentDates) => {
    try {
      const response = await CalendarServices.getUnpublishedEvents(
        currentDates.start,
        currentDates.end
      );
      setUnpublishedEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchUserEvents = async () => {
    try {
      const response = await CalendarServices.getUserEvents(currentDates.start, currentDates.end);
      setUserEvents(response.data);
    } catch (error) {
      console.error("Error fetching user events:", error);
    }
  };

  const fetchUserReqEvents = async () => {
    try {
      const response = await CalendarServices.getUserRequestedEvents();
      setUserReqEvents(response.data);
    } catch (error) {
      console.error("Error fetching requested events:", error);
    }
  };

  const fetchOtherReqEvents = async () => {
    try {
      const response = await CalendarServices.getOtherRequestedEvents();
      setOtherReqEvents(response.data);
    } catch (error) {
      console.error("Error fetching requested events:", error);
    }
  };

  const fetchChangedEvents = async () => {
    try {
      const response = await CalendarServices.getChangedEvents();
      setChangedEvents(response.data);
    } catch (error) {
      console.error("Error fetching requested events:", error);
    }
  };

  useEffect(() => {
    fetchUserReqEvents();
  }, []);
  useEffect(() => {
    fetchOtherReqEvents();
  }, []);
  useEffect(() => {
    fetchChangedEvents();
  }, []);

  return {
    events,
    userEvents,
    unpublishedEvents,
    userReqEvents,
    otherReqEvents,
    changedEvents,
    fetchUnpublishedEvents,
    fetchUserReqEvents,
    fetchOtherReqEvents,
    fetchChangedEvents,
  };
};
