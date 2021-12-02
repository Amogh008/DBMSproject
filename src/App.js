import {BrowserRouter as Router , Routes , Route} from "react-router-dom"
import Home from "./home";
import Login from "./components/Login";
import Signup from "./components/Signup"
import { useContext } from "react";
import { SocketContext } from "./context/socketContext";
function App() {
  const {LoggedIn} = useContext(SocketContext)
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={(!LoggedIn)?<Login/>:<Home/>}></Route>
          <Route path ="/home" element={LoggedIn?<Home/>:<Login/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/" element={<Login/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
