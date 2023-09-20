import * as React from "react";
import { DashboardProtocols, DashboardUsers } from "./DashboardContent";
import { useLocation } from "react-router-dom";
import { useSnackBar } from "./../../../hooks/useSnackbar";
import { useEffect } from "react";

export default function Dashboard() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");
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
    <>
      <DashboardUsers />
      <DashboardProtocols />
      {SnackBar}
    </>
  );
}
