
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import './App.css'
import User from './components/User/User';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Auth from './Auth/Auth';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route  path="/" element={<Home />}></Route>
          <Route  path="/users/:userId" element={<User />}></Route>
          <Route exact path="/auth" element={localStorage.getItem("currentUser") !== null ? <Navigate to="/" /> : <Auth />}>
          
          </Route>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
