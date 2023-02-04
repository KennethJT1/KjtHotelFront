import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
import { Success } from "../components/Success";

export const Login = () => {
  const [email, setEmail] = useState("kem@gmail.com");
  const [password, setPassword] = useState("1234");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const login = async () => {
    const user = {
      email,
      password,
    };

    try {
      setLoading(true);
      const { data } = await axios.post("/api/user/login", user);
      setLoading(false);

      localStorage.setItem("currentuser", JSON.stringify(data));
      window.location.href ="/home";
    } catch (error) {
      setLoading(false);
       setError(true);
      console.log(error.message);
    }
  };

  return (
    <div>
      {loading && <Loading />}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          {error && <Error message="Login failed" />}
          <div className="bs">
            <h2>Login</h2>

            <input
              type="text"
              className="form-control"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn mt-3" onClick={login}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
