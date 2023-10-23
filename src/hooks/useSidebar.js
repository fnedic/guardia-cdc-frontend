import { useEffect, useState } from "react";
import ProtocolService from "../services/axios/ProtocolService.js";

export const useSidebar = () => {
  // LOGIC FOR SIDEBAR CONTENT //////////////////////////////////////////////////

  const [notice, setNotice] = useState();

  useEffect(() => {
    ProtocolService.getNotice()
    .then((r) => {
      setNotice(r.data);
    })
    .catch((e) => {});
  }, []);
  ////////////////////////////////////////////////////////////////////////////////
  return {
    notice,
  };
};