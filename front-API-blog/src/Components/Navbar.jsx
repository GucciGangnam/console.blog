//IMPORTS
// React 
// RRD
import { Link, useNavigate } from "react-router-dom";
// Styles 
import './Navbar.css'


// COMPONENT 
export const Navbar = ({ userAccessToken, loggedinUser }) => {
    const navigate = useNavigate();
    const navigateToHomePage = () => { 
        navigate('/');
    }
    return (
        <div className='Navbar'>
            <div className='Logo'>
                <div style={{ maxHeight: "100%", overflow: "hidden" }}>
                    <img className="Logo" src="/Console.png" alt="Logo" onClick={navigateToHomePage} style={{ maxHeight: "50px", width: "auto" }} />
                </div>
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