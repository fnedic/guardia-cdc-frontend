import * as React from "react";
import { useLocation } from "react-router-dom";
import { useSnackBar } from "./../../../hooks/useSnackbar";
import { useEffect } from "react";
import { ProtocolTable } from './ProtocolTable';
import { PersonalTable } from "./PersonalTable";
import { Box } from "@mui/material";
import { VideoTable } from "./VideoTable";
import { ProcedureTable } from "./ProcedureTable";

export default function Dashboard() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");
  const table = queryParams.get("table");
  const mssg = queryParams.get("mssg");
  const { setSnackbarMessage, setShowSnackbar, setSeverity, SnackBar } =
    useSnackBar();
  useEffect(() => {
    if (status === "success") {
      setSnackbarMessage(mssg);
      setSeverity("success");
      setShowSnackbar(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <Box>
      {table === "personal" ? (
        <PersonalTable/>
      ) : table === "protocol" ? (
        <ProtocolTable/>
      ) : table === "video" ? (
        <VideoTable/>
      ) : table === "procedure" ? (
        <ProcedureTable/>
      ) : null}
      {SnackBar}
    </Box>
  );
}
