import { useEffect } from "react";
import { useState } from "react";
import CalendarServices from "../services/axios/CalendarService.js";

export const useGetEvents = (currentDates) => {
  const [events, setEvents] = useState([]);
  const [unpublishedEvents, setUnpublishedEvents] = useState([]);
  const [userEvents, setUserEvents ] = useState([]);
  const [userReqEvents, setUserReqEvents ] = useState([]);
  const [otherReqEvents, setOtherReqEvents ] = useState([]);

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
      const response = await CalendarServices.getUnpublishedEvents(currentDates.start, currentDates.end);
      setUnpublishedEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchUserEvents = async () => {
    try {
      const response = await CalendarServices.getUserEvents();
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

  useEffect(() => {
    if (currentDates) {
      const start = currentDates.start;
      const end = currentDates.end;
      fetchEvents(start, end);
    }
  }, [currentDates]);

  useEffect(() => {
    fetchUserEvents()
  }, [])
  useEffect(() => {
    fetchUserReqEvents()
  }, [])
  useEffect(() => {
    fetchOtherReqEvents()
  }, [])

  return {
    events,
    userEvents,
    unpublishedEvents,
    userReqEvents,
    otherReqEvents,
    fetchUnpublishedEvents,
    fetchUserReqEvents,
    fetchOtherReqEvents,
  };
};
