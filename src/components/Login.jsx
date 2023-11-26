import React, {useState} from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {auth} from "../../src/Firebase";
// import { AuthContext } from "../context/AuthContext";
export const Login = (props)=>{
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);
  const navitage = useNavigate();
  // const {dispatch} = useContext(AuthContext);

  const handleSubmit = (e)=>{
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, pass)
  .then((userCredential) => {
    const user = userCredential.user;
    // dispatch({type:"LOGIN", payload:user})
    navitage("/")
  })
  .catch((error) => {
    setError(true);
  });
    
  };


    return(
        <div className="container-login-form">
        <form className="form-login-container"onSubmit={handleSubmit}>
    <div className="form-group">
      <h3>Log in</h3>
      <label htmlFor="exampleInputEmail1"></label>
      <input value = {email} onChange = {(e)=>setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
      <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div className="form-group">
      <label htmlFor="exampleInputPassword1"></label>
      <input value={pass} onChange={(e)=>setPass(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
    </div>
    <button type="submit" className="btn btn-primary mx-2 my-2">log in</button> <br></br>
    {error && <span>Wrong email or password!</span>}
  </form>
  
      </div> 
    )
}