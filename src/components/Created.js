import React, { useContext } from "react";
import { SocketContext } from "../context/socketContext";

function Created() {
  const { created } = useContext(SocketContext);
  return (
    <div>
      {created.map((item) => (
        <li>{item}</li>
      ))}{" "}
    </div>
  );
}

export default Created;
