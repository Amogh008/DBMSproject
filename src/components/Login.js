import Axios from 'axios';
import { useContext } from 'react';
import { SocketContext } from './../context/socketContext';
import {useNavigate} from "react-router-dom"



function LoginPage() {
    const navigate = useNavigate();
  
    const {setLogin,
        uemail,
        setMail,
        pass,
        setPass,
        token,
        setToken} = useContext(SocketContext);
  const login = async (e)=>{
    if(uemail==="" || pass==="")
       alert('Enter all fields');
     else{
       
       await Axios.post('http://192.168.17.148:8000/api/v1/users/login',{
        
         email :uemail,
         password:pass,
        
       }).then(res => {
        
        setToken(res.data.token);
        console.log(token);
        setLogin(true);
        navigate('/home')
        }).catch(err=>{
          
        })
      
     }
   }
   
   
   
   return (
    
     <div className="text-center" style={{height:"100%"}}>
            
            <form className="form-signin mx-auto my-5 py-5 w-25" style={{minWidth:'300px'}}  onSubmit={e=>e.preventDefault()}>
                  <img className="mb-4 rounded-circle mt-5" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpx4kjcrxKYNZ8bGKpW2KBeTsBmXZja6Z5lQ&usqp=CAU" alt="" width="72" height="72"></img>
                  <h1 className="h3 mb-3 font-weight-normal">SIGN IN</h1>
                  <label className="sr-only">Email address</label>
                  <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required=""  onChange={e => setMail(e.target.value)} value={uemail}/>
                  <label className="sr-only">Password</label>
                  <input type="password" id="inputPassword" className="form-control mt-3" placeholder="Password" required="" onChange={e=> setPass(e.target.value)} value={pass}/>
              
                  <button className="btn btn-lg btn-primary btn-block mt-5" type="submit" onClick={(e)=>login(e)}>Sign in</button>
            </form>


           
     </div>
  
  )
}

export default LoginPage;