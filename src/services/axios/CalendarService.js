import axios from "./axios_config";
import { getAuthToken } from "../axios/axios_helper.js";

const baseURL = process.env.REACT_APP_BACKEND_URL;
const CALENDAR_API_BASE_URL = baseURL + "/calendar";

const token = getAuthToken();
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

class CalendarService {
  createEvent(event) {
    return axios
      .post(CALENDAR_API_BASE_URL + "/add-event", event, config)
      .then((r) => {
        return r;
      })
      .catch((e) => {
        throw e;
      });
  }

  getEvents(start, end) {
    return axios
      .get(
        `${CALENDAR_API_BASE_URL}/get-events?start=${start}&end=${end}`,
        config
      )

      .then((r) => {
        return r;
      })
      .catch((e) => {
        throw e;
      });
  }

  getUnpublishedEvents(start, end) {
    return axios
      .get(
        `${CALENDAR_API_BASE_URL}/get-unpublished-events?start=${start}&end=${end}`,
        config
      )

      .then((r) => {
        return r;
      })
      .catch((e) => {
        throw e;
      });
  }

  editEvent(event) {
    return axios.put(
      CALENDAR_API_BASE_URL + "/edit-event/" + event.id,
      event,
      config
    );
  }

  deleteEvent(id) {
    return axios.delete(CALENDAR_API_BASE_URL + "/delete/" + id, config);
  }

  getUserEvents() {
    return axios
      .get(CALENDAR_API_BASE_URL + "/get-user-events", config)
      .then((r) => {
        return r;
      })
      .catch((e) => {
        throw e;
      });
  }

  getUserRequestedEvents() {
    return axios.get(CALENDAR_API_BASE_URL + "/get-requested-events", config)
  }

  getOtherRequestedEvents() {
    return axios.get(CALENDAR_API_BASE_URL + "/get-requested-other", config)
  }

  publishEvents(events) {
    return axios
      .post(CALENDAR_API_BASE_URL + "/publish-events", events, config)
      .then((r) => {
        return r;
      })
      .catch((e) => {
        throw e;
      });
  }

  requestChange(id) {
    return axios.get(CALENDAR_API_BASE_URL +"/req-change/"+id, config)
  }

  requestCancel(id) {
    return axios.get(CALENDAR_API_BASE_URL +"/req-cancel/"+id, config)
  }

  requestAccept(id) {
    return axios.get(CALENDAR_API_BASE_URL +"/req-accept/"+id, config)
  }
}

const instance = new CalendarService();
export default instance;
