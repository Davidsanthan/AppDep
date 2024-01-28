import React from 'react'
import './App.css';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Leave from './Components/Leave';
import Tasks from './Components/Tasks';
import Home from './Components/Home';
import { BrowserRouter,Routes,Route,Link } from 'react-router-dom';
import Editprofile from './Components/Editprofile';
function App() {
  
  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route path="/"element={<Login/>}></Route>
      <Route path="/Home"element={<Home/>}></Route>
      <Route path="/Signup"element={<Signup/>}></Route>
      <Route path="/Leave"element={<Leave/>}></Route>
      <Route path="/Tasks"element={<Tasks/>}></Route>
      <Route path="/Editprofile"element={<Editprofile/>}></Route>
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App