import "./App.css";
import Navbar from "./Components/Generics/Navbar";
import Form from "./Components/Post/Form";
import PostList from "./Components/Post/PostList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
        <Form />
        <PostList />
      </header>
    </div>
  );
}

export default App;
