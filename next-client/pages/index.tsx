import React from "react";
import Setup from "../components/SetupComponent";

export default function Home() {
  return (
    <Setup updateValue={(state) => {
      console.log(state)
    }}></Setup>
  )
}