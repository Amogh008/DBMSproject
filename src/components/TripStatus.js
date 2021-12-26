import { React, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../context/socketContext";

function TripStatus() {
  const navigate = useNavigate();
  const { token } = useContext(SocketContext);
  useEffect(() => {
    const check = () => {
      if (token === "") {
        navigate("/login");
      }
    };
    check();
  });

  return (
    <div>
      <table className="table table-striped" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Company</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {
            <tr>
              <td>
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar1.png"
                  width="32"
                  height="32"
                  class="rounded-circle my-n1"
                  alt="Avatar"
                />
              </td>
              <td>Garrett Winters</td>
              <td>Good Guys</td>
              <td>garrett@winters.com</td>
              <td>
                <span class="badge bg-success">Active</span>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  );
}

export default TripStatus;
