//IMPORTS
// React 
// RRD
import { Link, useNavigate } from "react-router-dom";
// Styles 
import './Navbar.css'


// COMPONENT 
export const Navbar = () => {
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
                <button className='Nav-Btn' onClick={() => {navigate(`/signup`)}}>Sign up</button>
                <button className='Nav-Btn'>Button 2</button>
            </div>
        </div>
    )
}