import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import Trips from "./components/Trips";
import { SocketContext } from "./context/socketContext";

function HomePage() {
  useEffect(() => {
    if (token === "") {
      navigate("/login");
    }
  });
  const navigate = useNavigate();
  const { token } = useContext(SocketContext);

  return (
    <div className="mw-100">
      <Trips />
    </div>
  );
}

export default HomePage;
