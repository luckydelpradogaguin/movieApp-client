import AppNavBar from "../components/AppNavBar";
import React from "react-router-dom";

export default function Home() {
  return (
    <>
      <AppNavBar />
      <h1 className="mt-3">Welcome to the Movie App</h1>
    </>
  );
}
