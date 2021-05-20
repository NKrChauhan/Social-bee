import React, { useState } from "react";
import "./login.css";
import image from "./login.png";
import swal from "sweetalert";

function Login() {
  const [uname, setUname] = useState("");
  const [pass, setPass] = useState("");
  const [isauthenticated, setAuth] = useState("false");
  // useEffect(() => {}, isauthenticated);
  var user = {
    uname: uname,
    pass: pass,
  };
  const handelSubmitLogin = (e) => {
    e.preventDefault();
    var loggedin = "false";
    //    server handeling
    loggedin = "true";
    swal("Login Alert", "logged in !!");
    if (loggedin === "false") swal("Login Alert", "uname or password is wrong");
  };
  const handelSubmitLogout = (e) => {
    e.preventDefault();
    // server handeling
    setUname("");
    setPass("");
    setAuth("false");
    swal("Looged Out", "Thanks and come again.");
  };
  return isauthenticated === "false" ? (
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
            <label className="colorRed col-md-6">Enter username : </label>
            <input
              placeholder="Enter the username"
              value={uname}
              type="text"
              className="col-md-6"
              onChange={(e) => setUname(e.target.value)}
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
    <div className="colorRed container">
      <h1>Welcome {user.uname}, Mate</h1>
      <form onSubmit={handelSubmitLogout}>
        You are Aready logged in !
        <button className="btn btn-cust">Logout Now</button>
      </form>
    </div>
  );
}

export default Login;
