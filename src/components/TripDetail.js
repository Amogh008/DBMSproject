import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { SocketContext } from "../context/socketContext";
import { useNavigate } from "react-router-dom";
function TripDetail() {
  const { token, userId } = useContext(SocketContext);
  const id = useParams().id;
  const [trip, setTrip] = useState({
    source: "source",
    destination: "destination",
    description: "description",
  });
  const [organizer, setOrganizer] = useState({});
  const [date, setDate] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const check = () => {
      if (token === "") {
        navigate("/login");
      }
    };
    check();
    const fetch = async () => {
      await axios
        .get(`http://172.20.10.4:8000/api/v1/tours/${id}`, {
          headers: {
            token: token,
          },
        })
        .then((res) => {
          setTrip(res.data.data.tour);
          setDate(trip.startDate.split("T")[0].split("-").reverse().join("-"));
          setDate(date.reverse());
        })
        .catch((err) => {});
    };
    fetch();

    const fetchUser = async () => {
      await axios
        .get(`http://172.20.10.4:8000/api/v1/users/${trip.creatorId}`, {
          headers: {
            token: token,
          },
        })
        .then((res) => {
          setOrganizer(res.data.data.person);
        })
        .catch((err) => {});
    };
    fetchUser();
  }, [token, id, trip.creatorId, trip.startDate, date, navigate]);

  const bookTrip = async () => {
    await axios
      .patch(
        `http://172.20.10.4:8000/api/v1/tours/${trip._id}`,
        {},
        {
          headers: {
            token: token,
          },
        }
      )
      .then((res) => {
        navigate("/home");
      })
      .catch((err) => {
        alert("Error!");
      });
  };

  const deleteTour = async () => {
    await axios
      .delete(
        `http://172.20.10.4:8000/api/v1/tours/${trip._id}`,
        {},
        {
          headers: {
            token: token,
          },
        }
      )
      .then((res) => {
        alert("Deleted successfully!!");
        navigate("/home");
      })
      .catch((err) => {
        alert("error");
      });
  };

  return (
    <div>
      <div className="container my-5" style={{ "text-align": "center" }}>
        <div className="row justify-content-center">
          <div
            className="col-md-7 col-lg-4 mb-5 mb-lg-0 wow fadeIn "
            style={{ "text-align": "center" }}
          >
            <div className="card border-0 shadow">
              <img
                src={`https://www.w3schools.com/howto/img_avatar.png`}
                alt="..."
                style={{ height: "auto ", width: "100%" }}
              />
              <div className="card-body p-1-9 p-xl-5">
                <div className="mb-4">
                  <Link to={`/userdetails/${organizer._id}`}>
                    <h1 className="h1 mb-0 font-weight-bold">
                      {organizer.name}
                    </h1>
                  </Link>
                </div>
                <ul className="list-unstyled mb-4">
                  <li className=" text-danger mb-3">
                    <p href="#!">
                      <i className="far fa-envelope display-25 me-3 text-secondary"></i>
                      {organizer.email}
                    </p>
                  </li>
                  <li className="h4 mb-3">
                    <p href="#!">
                      <i className="fas fa-mobile-alt display-25 me-3 text-secondary"></i>
                      {organizer.phNo}
                    </p>
                  </li>
                  <li className="h4 ">
                    <p href="#!">
                      <i className="fas fa-map-marker-alt display-25 me-3 text-secondary"></i>
                      {organizer.address}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="ps-lg-1-6 ps-xl-5">
              <div className="mb-5 wow fadeIn">
                <div className="text-start mb-1-6 wow fadeIn">
                  <h2
                    className="h1 mb-0 text-primary font-weight-bold"
                    style={{ "text-align": "center" }}
                  >
                    {trip.source[0].toUpperCase() + trip.source.substring(1)}
                    <br />
                    <span className="text-danger">
                      {"|"}
                      <br />
                      {"\\/"}
                    </span>
                    <br />
                    {trip.destination[0].toUpperCase() +
                      trip.destination.substring(1)}
                  </h2>
                </div>
                <h4 className="h2 my-4">
                  {trip.description[0].toUpperCase() +
                    trip.description.substring(1)}
                </h4>
              </div>

              <div className="wow fadeIn">
                <div className="text-start mb-1-6 wow fadeIn">
                  <h2 className="mb-0 text-primary">Date: {date}</h2>
                </div>

                {organizer._id !== userId ? (
                  <button
                    type="button"
                    className="mt-4 mb-0 btn btn-primary btn-lg"
                    onClick={bookTrip}
                  >
                    Book Trip
                  </button>
                ) : (
                  <button
                    type="button"
                    className="mt-4 mb-0  btn btn-danger btn-lg"
                    onClick={deleteTour}
                  >
                    Cancel Trip
                  </button>
                )}

                <div className="my-4">
                  <div
                    className="d-flex justify-content-center mx-2 mb-3"
                    onClick={bookTrip}
                  ></div>
                </div>
                <div className="progress-style1" style={{ width: "100%" }}>
                  <div className="progress-text">
                    <div className="row">
                      <div className="col-6 fw-bold" style={{ width: "100%" }}>
                        Seat Availability :{" "}
                        <span className="col-6">
                          {trip.seatsLeft} / {trip.maxSeats}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="custom-progress progress rounded-3 mb-4">
                    <div
                      className="animated custom-bar progress-bar bg-success slideInLeft"
                      style={{
                        width: `${(trip.seatsLeft / trip.maxSeats) * 100}%`,
                      }}
                      aria-valuemax="100"
                      aria-valuemin="0"
                      aria-valuenow="70"
                      role="progressbar"
                    ></div>
                  </div>
                  <div className="progress-text">
                    <div className="row">
                      <div className="col-6 fw-bold">
                        User Rating :{" "}
                        <span className="col-6">{trip.maxSeats} / 5</span>
                      </div>
                      <div className="col-6 text-end"></div>
                    </div>
                  </div>
                  <div className="custom-progress progress rounded-3 mb-4">
                    <div
                      className="animated custom-bar progress-bar slideInLeft"
                      style={{
                        width: `${(trip.maxSeats / 5) * 100}%`,
                      }}
                      aria-valuemax="5  "
                      aria-valuemin="0"
                      aria-valuenow={trip.ratingsAverage}
                      role="progressbar"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TripDetail;
