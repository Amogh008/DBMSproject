import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { SocketContext } from "../context/socketContext";

function TripDetail() {
  const { token } = useContext(SocketContext);
  const id = useParams().id;
  const [trip, setTrip] = useState({});
  const [organizer, setOrganizer] = useState({});
  const [date, setDate] = useState("");
  useEffect(() => {
    const fetch = async () => {
      await axios
        .get(`http://172.20.10.4:8000/api/v1/tours/${id}`, {
          headers: {
            token: token,
          },
        })
        .then((res) => {
          console.log(res.data.data.tour);
          setTrip(res.data.data.tour);
          setDate(trip.startDate.split("T")[0].split("").reverse().join(""));
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
          console.log(res.data.data.person);
          setOrganizer(res.data.data.person);
        })
        .catch((err) => {});
    };
    fetchUser();
  }, [token, id, trip.creatorId]);

  return (
    <div>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-4 mb-5 mb-lg-0 wow fadeIn">
            <div className="card border-0 shadow">
              <img
                src="https://cdn.pixabay.com/photo/2021/11/18/22/08/flower-6807516__340.jpg"
                alt="..."
              />
              <div className="card-body p-1-9 p-xl-5">
                <div className="mb-4">
                  <h3 className="h4 mb-0">{organizer.name}</h3>
                  {/* <span className="text-primary">CEO &amp; Founder</span> */}
                </div>
                <ul className="list-unstyled mb-4">
                  <li className="mb-3">
                    <a href="#!">
                      <i className="far fa-envelope display-25 me-3 text-secondary"></i>
                      {organizer.email}
                    </a>
                  </li>
                  <li className="mb-3">
                    <a href="#!">
                      <i className="fas fa-mobile-alt display-25 me-3 text-secondary"></i>
                      +012 (345) 6789
                    </a>
                  </li>
                  <li>
                    <a href="#!">
                      <i className="fas fa-map-marker-alt display-25 me-3 text-secondary"></i>
                      205 Main Street, USA
                    </a>
                  </li>
                </ul>
                <ul className="social-icon-style2 ps-0">
                  <li>
                    <a href="#!" className="rounded-3">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="rounded-3">
                      <i className="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="rounded-3">
                      <i className="fab fa-youtube"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="rounded-3">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
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
                    {trip.source} to {trip.destination}
                  </h2>
                </div>
                <p>{trip.description}</p>
              </div>

              <div className="wow fadeIn">
                <div className="text-start mb-1-6 wow fadeIn">
                  <h2 className="mb-0 text-primary">{date}</h2>
                </div>
                <p className="mb-4">
                  Many desktop publishing packages and web page editors now use
                  Lorem Ipsum as their default model text, and a search for
                  'lorem ipsum' will uncover many web sites still in their
                  infancy. Various versions have evolved over the years,
                  sometimes by accident, sometimes on purpose.
                </p>
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
                      className="animated custom-bar progress-bar bg-secondary slideInLeft"
                      style={{
                        width: `${
                          (trip.maxSeats - trip.seatsLeft / trip.maxSeats) * 100
                        }%`,
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
