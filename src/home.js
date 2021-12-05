import { useContext } from "react";
import { useNavigate } from "react-router";
import Trips from "./components/Trips";
import { SocketContext } from "./context/socketContext";

function HomePage() {
  const { LoggedIn } = useContext(SocketContext);
  const navigate = useNavigate();
  if (!LoggedIn) {
    navigate("/login");
  }
  return (
    <div className="mw-100">
      <Trips />
    </div>
  );
}

export default HomePage;
