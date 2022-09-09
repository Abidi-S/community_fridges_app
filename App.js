import React from "react";
import Routes from "./navigation/index";

//Routes is what is displayed, and from there the navigator chooses what screens to show
export default function AppWrapper() {
  return <Routes />;
}
