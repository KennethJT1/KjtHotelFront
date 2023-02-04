import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
import { Success } from "../components/Success";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
   const [success, setSuccess] = useState(false);

  const register = async () => {
    if (password === cpassword) {
      const user = {
        name,
        email,
        password,
        cpassword,
      };

      try {
        setLoading(true);
        const { data } = await axios.post("/api/user/register", user);
        setLoading(false);
        setSuccess(true);

        setName("");
        setEmail("");
        setPassword("");
        setCpassword("");
      } catch (error) {
        setLoading(false);
        setError(true);
        console.log(error.message);
      }
    } else {
      alert("Password does not match");
    }
  };

  return (
    <div>
      {loading && <Loading />}
      {error && <Error message="Registration failed" />}

      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          {success && <Success message="Registration successful" />}
          <div className="bs">
            <h2>Register</h2>
            <input
              type="text"
              className="form-control"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
            <input
              type="text"
              className="form-control"
              placeholder="confirm password"
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
            />
          </div>
          <button className="btn mt-3" onClick={register}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};
