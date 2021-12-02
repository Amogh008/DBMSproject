import {useContext} from 'react'
import { useNavigate } from 'react-router';
import { SocketContext } from './context/socketContext';
import Naavbar from './components/Navbar';
function HomePage() {
    
    const navigate = useNavigate();
  
    const {token,setToken,setLogin} = useContext(SocketContext);
  
    const logout = ()=>{
        setToken("");
        setLogin(false);
        return navigate('/login');

      }
    return (
        <div>
            <Naavbar/>
            <h1>You are now LoggedIn</h1>
        <h3>your token is : {token}</h3>
        <a onClick={logout} href="/"><p>logout</p></a>
        </div>
    )
}

export default HomePage
