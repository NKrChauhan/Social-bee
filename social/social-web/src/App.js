import "./App.css";
import Navbar from "./Components/Generics/Navbar";
import Register from "./Components/User/Register";
import PostList from "./Components/Post/PostList";
import Login from "./Components/User/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/">
              <PostList />
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
