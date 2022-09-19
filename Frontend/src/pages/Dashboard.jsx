import React, { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');

  useEffect(() => {
    refreshToken()
  },[]);

  const refreshToken = async() => {
    try {
      const response = await axios.get('http://localhost:5000/token');
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      console.log(decoded);
      setName(decoded.name);
      setExpire(decoded.exp);
    } catch (error) {
      if(error.response){
        navigate('/')
      }
    }
  }

  // Axios If Command Need Token
  const axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(async(config) =>{
    const currentDate = new Date();
    if(expire * 1000 < currentDate.getTime())
    {
      const response = await axios.get('http://localhost:5000/token');
      config.headers.Authorization = `Bearer ${response.data.accessToken}`;
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setName(decoded.name);
      setExpire(decoded.exp);
    }
    return config;
  }, (error)=>{
    return Promise.reject(error)
  });

  const getUser = async() => {
    const response = await axiosJWT.get('http://localhost:5000/users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    // Fetch User Data
    console.log(response.data)
  }

  const Logout = async() => {
    try {
      await axios.delete('http://localhost:5000/logout');
      navigate("/");
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className="title">Welcome Back: {name}</div>
      <button onClick={getUser} className="logout">Show User</button>
      <button onClick={Logout} className="logout">Logout</button>
    </div>
  );
};

export default Dashboard;
