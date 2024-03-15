//IMPORTS
// React 
// RRD
import { Link, useNavigate } from "react-router-dom";
// Styles 
import './Navbar.css'


// COMPONENT 
export const Navbar = ({ userAccessToken, loggedinUser }) => {
    const navigate = useNavigate();
    return (
        <div className='Navbar'>
            <div className='Logo'>
                <Link to={"/"}>Logo Here</Link>
            </div>

            <div className='Nav-Header'>
                console.blog
            </div>

            <div className='Nav-Btn-Container'>
                {!loggedinUser.username ? (
                    <>
                        
                        <button className='Nav-Btn' onClick={() => { navigate(`/signup`) }}>Sign up</button>
                        <button className='Nav-Btn' onClick={() => { navigate(`/login`) }}>Log in</button>
                    </>
                ) : (
                    <>
                    <button className='Nav-Btn' onClick={() => { navigate(`/newpost`) }}>Create</button>
                    <button className='Nav-Btn' onClick={() => { navigate(`/account`) }}>Account</button>
                    </>
                )}
            </div>
        </div>
    )
}