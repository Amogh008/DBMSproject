import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TripDetail from "./components/TripDetail";
import { useContext } from "react";
import { SocketContext } from "./context/socketContext";
import DateCheck from "./components/DateCheck.js";
import Navbar from "./components/Navbar";

function App() {
  const { LoggedIn } = useContext(SocketContext);
  return (
    <div>
      {LoggedIn && <Navbar />}
      <Router>
        <div className="mw-100">
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/datecheck" element={<DateCheck />}></Route>
            <Route path="/tripdetail/:id" element={<TripDetail />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
