//IMPORTS
// React 

// Styles 
import './Navbar.css'


// COMPONENT 
export const Navbar = () => {
    return (
        <div className='Navbar'>
            <div className='Logo'>
                Logo here
            </div>

            <div className='Nav-Header'>
                console.blog
            </div>

            <div className='Nav-Btn-Container'>
                <button className='Nav-Btn'>Button 1</button>
                <button className='Nav-Btn'>Button 2</button>
            </div>
        </div>
    )
}