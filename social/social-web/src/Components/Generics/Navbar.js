import logo from "../../logo/logo.png";

function Navbar(props) {
  return (
    <nav
      className="navbar navbar-dark navbar-expand-lg fixed-top"
      style={{ backgroundColor: "#572b33" }}
    >
      <span className="navbar-brand">
        SOcIaL
        <img
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          style={{ marginLeft: "-4px" }}
          alt=""
        />
      </span>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0"></ul>
        <form className="form-inline navbar-nav">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                @
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
