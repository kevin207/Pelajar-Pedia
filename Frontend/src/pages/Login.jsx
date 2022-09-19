import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './pages.css';
import LOGO from '../assets/logo.jpg';
import {FcGoogle} from 'react-icons/fc';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import axios from "axios";

const Login = () => {

  const navigate = useNavigate();
  const [warning, setWarning] = useState("");
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const Login = async (e) =>{
    e.preventDefault();
    setLoading(true);

    await axios.post('http://localhost:5000/login', {
      email: inputs.email,
      password: inputs.password,
    }).then(function(res) {
      setLoading(false);
      swal({
        title: "Login Succes!",
        text: res.data.msg,
        icon: "success",
        button: "Okay"
      });
      navigate("/dashboard")
    }).catch(function(error) {
      setLoading(false);
      setWarning(error.response.data.msg)
    })
  }

  return (
    <div className="container">
      <div className="container-wrap">

        <div className="left-container">
          <img src={LOGO} alt="" className='logo'/>
          <h1 className="logo-title">Lorem ipsum dolor sit amet.</h1>
          <h4 className='logo-sub-title'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae, quas.</h4>
        </div>
        
        <div className="right-container">

          <h2 className='title'>Pelajar Pedia</h2>
          <h4 className='sub-title'>Welcome to Pelajar Pedia</h4>

          <form className="login-form" onSubmit={Login}>
            {warning && <div className='warning'>{warning}</div>}
            <div className="input-wrap">
              <div className='input-title'>Username or Email</div>
              <input onChange={handleInput} type="email" className='input-field'  name="email" required/>
            </div>

            <div className="input-wrap">
              <div className='input-title'>Password</div>
              <input onChange={handleInput} type="password" className='input-field' name="password" required/>
            </div>
            <a href="/" className="forgot">Forgot Password?</a>

            <button disabled={loading} className='sign' type="submit">Sign In</button>

            <div className="or">Or</div>

            <div className="google-sign">
              <div className="icon"><FcGoogle/></div>
              <div className="icon-text">Sign In With Google</div>
            </div>

            <div className="register-text">Doesn't have Account? <Link to='/register' className='register'>Create Account</Link></div>

          </form>

        </div>

      </div>
    </div>
  )
}

export default Login;