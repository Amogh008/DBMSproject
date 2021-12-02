import {BrowserRouter as Router , Routes , Route} from "react-router-dom"
import Home from "./home";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path ="/home" element={<Home/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
