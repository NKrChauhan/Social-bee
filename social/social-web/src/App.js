import "./App.css";
import Navbar from "./Components/Generics/Navbar";
import PostList from "./Components/Post/PostList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
        <PostList />
      </header>
    </div>
  );
}

export default App;
