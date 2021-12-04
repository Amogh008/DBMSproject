import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/socketContext"; //http://192.168.17.87:8000/api/v1/users/login
import { Card } from "react-bootstrap";
// import { Card } from "react-bootstrap";
function Trips() {
  const { token } = useContext(SocketContext);

  const [trips, setTrips] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      await axios
        .get("http://192.168.17.87:8000/api/v1/tours", {
          headers: {
            token: token,
          },
        })
        .then((res) => {
          setTrips(res.data.data.tours);
        })
        .catch((err) => {
          setTrips([]);
        });
    };
    fetch();
  }, [token]);
  if (trips.length === 0) return <h3>No trips found</h3>;
  else {
    return (
      <div className="row p-3">
        {trips.map((variant, idx) => (
          <Card
            bg="dark"
            key={idx}
            text="white"
            style={{ width: "18rem" }}
            className="mt-3 mx-auto"
          >
            <Card.Header>Header</Card.Header>
            <Card.Body>
              <Card.Title>{variant.name}</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  }
}

export default Trips;
