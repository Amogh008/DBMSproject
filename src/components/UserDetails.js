import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { SocketContext } from "../context/socketContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserDetails() {
  const navigate = useNavigate();
  const [organizer, setOrganizer] = useState({});
  const { token, userId } = useContext(SocketContext);
  const para = useParams();
  useEffect(() => {
    const check = () => {
      if (token === "") {
        navigate("/login");
      }
    };
    check();
  });
  useEffect(() => {
    const fetchUser = async () => {
      await axios
        .get(`http://172.20.10.4:8000/api/v1/users/${para.id}`, {
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
  }, [token, para.id]);

  const changePhone = async () => {
    let loop = true;
    while (loop) {
      let phone = window.prompt("Enter the phone number:");

      if (phone.length !== 10) {
        alert("Enter a propper number!");
      } else {
        await axios
          .patch(
            `http://172.20.10.4:8000/api/v1/users/${userId}`,
            {
              phNo: phone,
            },
            {
              headers: { token },
            }
          )
          .then((res) => {
            navigate(`/home`);
          })
          .catch((err) => {
            alert("error");
          });
        loop = false;
      }
    }
  };
  return (
    <div>
      <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
        <div className="card p-4">
          <div className=" image d-flex flex-column justify-content-center align-items-center">
            <button className="btn btn-secondary">
              <img
                src={`${organizer.imageUrl}`}
                height="100"
                width="100"
                alt=""
              />
            </button>
            <h1 className="name mt-3">{organizer.name}</h1>
            <p className="idd">{organizer.email}</p>
            <div className="d-flex flex-row justify-content-center align-items-center gap-2">
              <h3 className="idd1">{organizer.phNo}</h3>
              <span>
                <i className="fa fa-copy"></i>
              </span>
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center mt-3">
              <span className="number">
                <h3 className="follow">Dl: {organizer.dlNo}</h3>
              </span>
            </div>

            <div className="text mt-3">
              <span>
                <h4>{`${organizer.occupation}`}</h4>
              </span>
            </div>
            <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
              <span>
                <i className="fa fa-twitter"></i>
              </span>
              <span>
                <i className="fa fa-facebook-f"></i>
              </span>
            </div>
            <div className=" px-2 rounded mt-4 date ">
              <h3 className="join">{`${organizer.gender}`}</h3>
            </div>
            <div className=" d-flex mt-2">
              {userId !== para.id && (
                <button className="btn1 btn-dark">
                  <h3>Review user</h3>
                </button>
              )}
              {userId === para.id && (
                <button className="btn1 btn-dark" onClick={changePhone}>
                  <h3>Change Phone Number</h3>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
