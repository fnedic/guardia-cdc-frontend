import React from "react";
import LoggedAppBar from "./LoggedAppBar";
import { HomeContent } from './HomeContent';

export const Home = () => {
  return (
    <>
      <LoggedAppBar />
      <HomeContent />
    </>
  );
};
