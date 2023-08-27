import * as React from "react";
import { DashboardProtocols, DashboardUsers } from './DashboardContent';
import DashAppBar from "./DashAppBar";

export default function Dashboard() {


  return (
    <>
      <DashAppBar/>
      <DashboardUsers/>
      <DashboardProtocols/>
    </>
  );
}
