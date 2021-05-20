import "./App.css";
import Navbar from "./Components/Generics/Navbar";
import Register from "./Components/User/Register";
// import Form from "./Components/Post/Form";
// import PostList from "./Components/Post/PostList";
// import Login from "./Components/User/Login";

function App() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        {/* <Form /> */}
        {/* <PostList /> */}
        {/* <Login /> */}
        <Register />
      </header>
    </div>
  );
}

export default App;
