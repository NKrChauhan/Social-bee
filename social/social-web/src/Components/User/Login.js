import React, { useState } from "react";
import "./login.css";
import image from "./login.png";
import swal from "sweetalert";
import { axiosCallWithoutAuth, axiosCallWithAuth } from "../Generics/Utils";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isauthenticated, setAuth] = useState(false);

  const handelSubmitLogin = (e) => {
    e.preventDefault();
    var userCred = {
      email: email,
      password: pass,
    };
    axiosCallWithoutAuth
      .post("user/login/", userCred)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("access_token", res.data["access_token"]);
          localStorage.setItem("refresh_token", res.data["refresh_token"]);
          setAuth(true);
          window.location.href = "/";
        } else {
          swal("Status", res.data.message);
        }
      })
      .catch((e) => {
        swal("Error", e.message);
      });
  };
  const handelSubmitLogout = (e) => {
    e.preventDefault();
    var token = {
      refresh_token: localStorage.getItem("refresh_token"),
    };
    axiosCallWithAuth
      .post("user/logout/", JSON.stringify(token))
      .then((res) => {
        if (res.status === 200) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          swal("Success", "Logged out");
          setAuth(false);
          setEmail("");
          setPass("");
          window.location.href = "/";
        } else {
          swal("Status", res.data.message);
        }
      })
      .catch((e) => {
        swal("Error", e.message);
      });
  };
  return isauthenticated === false ? (
    <div className="login-page d-flex justify-content-start">
      <div className="col-md-6">
        <img
          src={image}
          alt="img"
          className="img-fluid"
          style={{ width: "40%" }}
        />
      </div>
      <div className="col-md-6 loginForm">
        <form onSubmit={handelSubmitLogin}>
          <strong>LOGIN</strong>
          <hr />
          <div className="row">
            <label className="colorRed col-md-6">Enter email : </label>
            <input
              placeholder="Enter Registered email"
              value={email}
              type="text"
              className="col-md-6"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="row">
            <label className="col-md-6 colorRed">Enter password : </label>
            <input
              placeholder="Enter the password"
              type="password"
              value={pass}
              className="col-md-6"
              onChange={(e) => setPass(e.target.value)}
            />
          </div>
          <br />
          <div>
            <button
              type="submit"
              style={{ float: "right" }}
              className="center btn btn-cust col-md-6"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <div className="colorRed container jumbotron">
      <form onSubmit={handelSubmitLogout}>
        You are Aready {email}, logged in !...
        <button className="btn btn-cust">Logout Now</button>
      </form>
    </div>
  );
}

export default Login;
