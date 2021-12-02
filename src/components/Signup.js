import axios from 'axios';
import React,{useContext, useState} from 'react'
import { SocketContext } from '../context/socketContext';
import { useNavigate } from 'react-router';


function Signup() {
    const navigate = useNavigate();
    const {setToken,token,setLogin,setAttempted,attempted} = useContext(SocketContext)
    const [userName,setName] = useState("");
    const [newEmail,setNewEmail] = useState("");
    const [newPass,setNewPass] = useState("");
    const [newCnfPass,setCnfPass] = useState("");

    const register=async()=>{
        setAttempted(false)
        if(userName==="" || newEmail==="" || newPass==="" || newCnfPass===""){
            alert('Enter all the fields');
        }else{
            await axios.post('http://192.168.17.148:8000/api/v1/users/signup',{
                name:userName,    
                email :newEmail,
                password:newPass,
                passwordConfirm:newCnfPass
               
              }).then(res => {
               
               setToken(res.data.token);
               console.log(token);
               setLogin(true);
               navigate('/home')
               }).catch(err=>{
                   setAttempted(true);
               })
        }
    }


    return (
        <div>
<section className=" p-4" style={{"background-color": "#eee"}}>
  <div className="container h-100 mb-5">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{"border-radius": "25px"}}>
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                {attempted && <p className=" mt-2 mb-4 text-danger font-weight-bold text-center" >Email already in use or invalid</p>}


                <form className="mx-1 mx-md-4" onSubmit={e=>e.preventDefault()}>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="text" id="form3Example1c" className="form-control" onChange={e=>setName(e.target.value)} value={userName}/>
                      <label className="form-label" for="form3Example1c">Your Name</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="email" id="form3Example3c" className="form-control" value={newEmail} onChange={e=>setNewEmail(e.target.value)}/>
                      <label className="form-label" for="form3Example3c">Your Email</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4c" className="form-control" value={newPass} onChange={e=>setNewPass(e.target.value)}/>
                      <label className="form-label" for="form3Example4c">Password</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4cd" className="form-control" value={newCnfPass} onChange={e=>setCnfPass(e.target.value)} />
                      <label className="form-label" for="form3Example4cd">Repeat your password</label>
                    </div>
                  </div>

              

                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="button" className="btn btn-primary btn-lg" onClick={register}>Register</button>
                  </div>

                </form>

              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-registration/draw1.png" className="img-fluid" alt="img"/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
        </div>
    )
}

export default Signup
