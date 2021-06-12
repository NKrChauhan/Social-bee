import React, { useState } from "react";
import "./login.css";
import image from "./login.png";
import swal from "sweetalert";
import { axiosCallWithoutAuth } from "../Generics/Utils";

function Register() {
  const [uname, setUname] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [repass, setRePass] = useState("");

  const handelSubmitRegister = (e) => {
    e.preventDefault();
    if (repass !== pass) {
      swal("Error", "Password doesn't match.");
    } else {
      var user = {
        username: uname,
        email: email,
        password: pass,
      };
      axiosCallWithoutAuth
        .post("user/register/", user)
        .then((res) => {
          if (res.status === 201) {
            swal("Success", "Logged in");
            setUname("");
            setPass("");
            setEmail("");
            setRePass("");
          } else {
            swal("Status", res.data.message);
          }
        })
        .catch((e) => {
          swal("Error", e.message);
        });
    }
  };
  return (
    <div className="login-page d-flex justify-content-start">
      <div className="col-md-6">
        <img
          src={image}
          alt="img"
          className="img-fluid"
          style={{ width: "50%" }}
        />
      </div>
      <div className="col-md-6 loginForm">
        <form onSubmit={handelSubmitRegister}>
          <strong>REGISTER NOW</strong>
          <hr />
          <div className="row">
            <label className="colorRed col-md-6">Enter username : </label>
            <input
              required
              placeholder="Enter the username"
              value={uname}
              type="text"
              className="col-md-6"
              onChange={(e) => setUname(e.target.value)}
            />
          </div>
          <div className="row">
            <label className="colorRed col-md-6">Enter email : </label>
            <input
              required
              placeholder="Enter the email id"
              value={email}
              type="text"
              className="col-md-6"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="row">
            <label className="col-md-6 colorRed">Enter password : </label>
            <input
              required
              placeholder="Enter the password"
              type="password"
              value={pass}
              className="col-md-6"
              onChange={(e) => setPass(e.target.value)}
            />
          </div>
          <div className="row">
            <label className="col-md-6 colorRed">Re-Enter password : </label>
            <input
              required
              placeholder="Enter the password again"
              type="password"
              value={repass}
              className="col-md-6"
              onChange={(e) => setRePass(e.target.value)}
            />
          </div>
          <br />
          <div>
            <button
              type="submit"
              style={{ float: "right" }}
              className="center btn btn-cust col-md-6"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
