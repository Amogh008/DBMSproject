import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/socketContext";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
function Trips() {
  const { token } = useContext(SocketContext);

  const [trips, setTrips] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      await axios
        .get("http://172.20.10.4:8000/api/v1/tours", {
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

  const respond = (e) => {
    console.log(e.target);
  };

  return (
    <div>
      <div className="row p-3">
        {trips.map((variant) => (
          <div className="col-12  col-md-6 col-lg-4 col-xl-3  m-auto ">
            <Link
              to={`/tripdetail/${variant._id}`}
              className="mx-auto my-4 nav-link d-flex justify-content-center"
              key={variant._id}
            >
              <Card
                bg="dark"
                key={variant._id}
                text="white"
                style={{ width: "18rem" }}
                onClick={(e) => {
                  respond(e);
                }}
              >
                <Card.Header>
                  {variant.source[0].toUpperCase() +
                    variant.source.substring(1)}
                  {" ------> "}
                  {variant.destination[0].toUpperCase() +
                    variant.destination.substring(1)}
                </Card.Header>
                <Card.Body className="bg-secondary">
                  <Card.Title></Card.Title>
                  <Card.Title className="text-warning">
                    {variant.startDate
                      .split("T")[0]
                      .split("-")
                      .reverse()
                      .join("-")}
                  </Card.Title>
                  <Card.Text>{variant.description}</Card.Text>
                  <Card.Text className="text-warning">
                    Seats remaining: {variant.seatsLeft}/{variant.maxSeats}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Trips;
