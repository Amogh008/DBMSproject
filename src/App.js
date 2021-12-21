import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TripDetail from "./components/TripDetail";
import { useContext } from "react";
import { SocketContext } from "./context/socketContext";
import Navbar from "./components/Navbar";
import UserDetails from "./components/UserDetails";
import CreateTrip from "./components/CreateTrip";

function App() {
  const { LoggedIn } = useContext(SocketContext);
  return (
    <div>
      <Router>
        {LoggedIn && <Navbar />}
        <div className="mw-100">
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/" element={<Login />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/userdetails/:id" element={<UserDetails />}></Route>
            <Route path="/tripdetail/:id" element={<TripDetail />}></Route>
            <Route path="/schedule" element={<CreateTrip />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
