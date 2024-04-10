
//IMPORTS
// React 
import { useState, useEffect } from 'react'
// Import Routes 
import { Route, Routes } from 'react-router-dom'
// Styles
import './App.css'
// Components 
import { Navbar } from './Components/Navbar'
// JWT-Decode
import { jwtDecode } from "jwt-decode";


// Pages 
import { Homepage } from './Pages/Homepage'
import { Blogpostpage } from './Pages/Blogpostpage'
import { Signup } from './Pages/Signup'
import { Login } from './Pages/Login'
import { Myaccount } from './Pages/Myaccount';
import { Newpost } from './Pages/Newpost';





// Function //
function App() {
  // States
  const [userAccessToken, setUserAccessToken] = useState("");
  const [loggedinUser, setLoggedinUser] = useState({})
  // UE to log AT when its updated 
  useEffect(() => {
    if (userAccessToken == "") {
      if (localStorage.getItem("UserAccessToken")) {
        setUserAccessToken(localStorage.getItem("UserAccessToken"))
        console.log("UAT updated to: " + userAccessToken)
        return;
      }
      setLoggedinUser({})
      console.log("loggedUser updated to: ")
      console.log(loggedinUser)
      return;
    } else {
      console.log("UAT updated to: " + userAccessToken)
      // Decode the JWT token
      const decodedToken = jwtDecode(userAccessToken);
      console.log(decodedToken)
      setLoggedinUser(decodedToken)
      console.log("decocded payload below")
      console.log(loggedinUser)
      setTimeout(() => { 
        localStorage.clear("UserAccessToken")
        setUserAccessToken("")
    }, 600000)
    }
  }, [userAccessToken])
  return (
    <div className='App'>
      <Navbar userAccessToken={userAccessToken} loggedinUser={loggedinUser} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/blogpost/:id" element={<Blogpostpage userAccessToken={userAccessToken} loggedinUser={loggedinUser} />} />
        <Route path="/newpost" element={<Newpost userAccessToken={userAccessToken}/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setUserAccessToken={setUserAccessToken} />} />
        <Route path="/account" element={<Myaccount userAccessToken={userAccessToken} setLoggedinUser={setLoggedinUser} setUserAccessToken={setUserAccessToken} />} />
      </Routes>
    </div>
  )
}

export default App
