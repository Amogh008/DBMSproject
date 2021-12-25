import React, { useContext } from "react";
import { SocketContext } from "../context/socketContext";

function DateCheck() {
  const { userBooked } = useContext(SocketContext);
  return (
    <div>
      {userBooked.map((item) => (
        <li>{item}</li>
      ))}
    </div>
  );
}

export default DateCheck;
