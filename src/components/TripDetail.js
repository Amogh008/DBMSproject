import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { SocketContext } from "../context/socketContext";
import { useNavigate } from "react-router-dom";
function TripDetail() {
  const { token, userId } = useContext(SocketContext);
  const id = useParams().id;
  const [trip, setTrip] = useState({});
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
    axios.patch(
      `http://172.20.10.4:8000/api/v1/tours/${trip._id}`,
      {},
      {
        headers: {
          token: token,
        },
      }
    );
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
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-4 mb-5 mb-lg-0 wow fadeIn">
            <div className="card border-0 shadow">
              <img src={`${organizer.imageUrl}`} alt="..." />
              <div className="card-body p-1-9 p-xl-5">
                <div className="mb-4">
                  <Link to={`/userdetails/${organizer._id}`}>
                    <h3 className="h4 mb-0">{organizer.name}</h3>
                  </Link>
                </div>
                <ul className="list-unstyled mb-4">
                  <li className="mb-3">
                    <p href="#!">
                      <i className="far fa-envelope display-25 me-3 text-secondary"></i>
                      {organizer.email}
                    </p>
                  </li>
                  <li className="mb-3">
                    <p href="#!">
                      <i className="fas fa-mobile-alt display-25 me-3 text-secondary"></i>
                      {organizer.phNo}
                    </p>
                  </li>
                  <li>
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
                  <h2 className="h1 mb-0 text-primary">
                    {trip.source}
                    {"  ----->  "}
                    {trip.destination}
                  </h2>
                </div>
                <p className="my-4">{trip.description}</p>
              </div>

              <div className="wow fadeIn">
                <div className="text-start mb-1-6 wow fadeIn">
                  <h2 className="mb-0 text-primary">Date: {date}</h2>
                </div>
                <div className="my-4">
                  <div
                    className="d-flex justify-content-center mx-2 mb-3"
                    onClick={bookTrip}
                  >
                    {organizer._id !== userId ? (
                      <button type="button" className="btn btn-primary btn-lg">
                        Book Trip
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-danger btn-lg"
                        onClick={deleteTour}
                      >
                        Cancel Trip
                      </button>
                    )}
                  </div>
                </div>
                <div className="progress-style1">
                  <div className="progress-text">
                    <div className="row">
                      <div className="col-6 fw-bold">Seat Availability</div>
                      <div className="col-6 text-end">
                        {trip.seatsLeft} / {trip.maxSeats}
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
                      <div className="col-6 fw-bold">User Rating</div>
                      <div className="col-6 text-end">{trip.maxSeats} / 5</div>
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
