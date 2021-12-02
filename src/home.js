import {useContext} from 'react'
import { useNavigate } from 'react-router';
import { SocketContext } from './context/socketContext';


function HomePage() {
    const navigate = useNavigate();
    const {token,setToken,setLogin} = useContext(SocketContext);

    const logout = ()=>{
        setToken("");
        setLogin(false);
        navigate('/login');

      }
    return (
        <div>
            <h1>You are now LoggedIn</h1>
        <h3>your token is : {token}</h3>
        <a onClick={logout} href="/"><p>logout</p></a>
        </div>
    )
}

export default HomePage
