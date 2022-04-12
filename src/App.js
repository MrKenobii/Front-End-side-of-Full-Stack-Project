
import './App.css';
import Post from './components/Post/Post';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import User from './components/User/User';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route  path="/" element={<Home />}></Route>
          <Route  path="/users/:userId" element={<User />}></Route>
        </Routes>
      </Router>
      {/* <Post /> */}
    </div>
  );
}

export default App;
