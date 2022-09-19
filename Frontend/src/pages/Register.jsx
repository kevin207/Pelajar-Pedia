import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import LOGO from "../assets/logo.jpg";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import axios from "axios";
import "./pages.css";

const Register = () => {

  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState("");

  const handleInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const Register = async (e) => {
    e.preventDefault();
    setLoading(true);

    await axios.post('http://localhost:5000/users', {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password,
      confirm: inputs.confirm,
    }).then(function(res) {
      setLoading(false);
      swal({
        title: "Register Success!",
        text: res.data.msg,
        icon: "success",
        button: "Okay"
      });
      navigate("/")
    }).catch(function(error) {
      setLoading(false);
      setWarning(error.response.data.msg)
    })
  };

  return (
    <div className="container">
      <div className="container-wrap">
        <div className="left-container">
          <img src={LOGO} alt="" className="logo" />
          <h1 className="logo-title">Lorem ipsum dolor sit amet.</h1>
          <h4 className="logo-sub-title">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Repudiandae, quas.
          </h4>
        </div>

        <div className="right-container">
          <br />
          <h4 className="sub-title">Create New Account</h4>
          
          <form onSubmit={Register} className="login-form">
          {warning && <div className='warning'>{warning}</div>}

            <div className="input-wrap-first">
              <div className="input-title">Name</div>
              <input
                type="text"
                className="input-field"
                onChange={handleInput}
                name="name"
                required
              />
            </div>

            <div className="input-wrap">
              <div className="input-title">Email</div>
              <input
                type="email"
                className="input-field"
                onChange={handleInput}
                name="email"
                required
              />
            </div>

            <div className="input-wrap">
              <div className="input-title">Password</div>
              <input
                type="password"
                className="input-field"
                onChange={handleInput}
                name="password"
                required
              />
            </div>

            <div className="input-wrap">
              <div className="input-title">Password Confirmation</div>
              <input
                type="password"
                className="input-field"
                onChange={handleInput}
                name="confirm"
                required
              />
            </div>
            <br />

            <button disabled={loading} className="sign" type="submit">
              Sign Up
            </button>

            <div className="or">Or</div>

            <div className="google-sign">
              <div className="icon">
                <FcGoogle />
              </div>
              <div className="icon-text">Sign Up With Google</div>
            </div>

            <div className="register-text">
              Already have Account?{" "}
              <Link to="/" className="register">
                Sign In
              </Link>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Register;
