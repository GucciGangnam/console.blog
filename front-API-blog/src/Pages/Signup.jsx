// IMPORTS 

// RRD 
import { useNavigate } from "react-router-dom";
// STYLES
import { useState } from "react";
import "./Signup.css"

// COMPONENT // 
export const Signup = () => {
    const navigate = useNavigate()
    // States 
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    //fetch 
    const [error, setError] = useState("")
    const [confirmation, setConfirmation] = useState("")

    // Handle Input Changes
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        setPasswordsMatch(event.target.value === password);
    };
    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }
    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }
    // Submit new user 
    const submitNewUser = async (e) => {
        const formData = {
            username: username,
            email: email,
            password: password,
        };
        // Check if passwords match 
        if (password !== confirmPassword) { 
            e.preventDefault();
            setError("passwords dont match")
            return;
        }
        // chgeck if password is valid 
        e.preventDefault();
        try {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            };
            const response = await fetch('http://localhost:3000/api/user', requestOptions);
            const responseData = await response.json();
            if (!response.ok) {
                console.log(responseData.msg)
                throw new Error(responseData.msg); // Extract error message
            } else {
                setConfirmation(responseData.msg)
                setTimeout(() => { 
                    setConfirmation('Redirecting to login')
                }, 500)
                setTimeout(() => { 
                    navigate('/login');
                }, 1000)
            }
        } catch (err) {
            console.error(err);
            setError(err.message); // Set error to the extracted message from the caught error
        }
    }
    return (
        <div className="Signup">
            <form onSubmit={submitNewUser}>

            
            <h1>signUpForm = {'{'}
            </h1>
            <div className="Signup-object-grid-container">
                <h1>username:</h1>
                <input
                    required
                    className="Signup-Input"
                    placeholder="example"
                    maxLength={15}
                    minLength={3}
                    pattern="^[a-zA-Z0-9]+$"
                    title="Username can only contain letters and numbers"
                    value={username}
                    onChange={handleUsernameChange}
                />

                <h1>email:</h1>
                <input
                    required
                    className="Signup-Input"
                    placeholder="example@example.com"
                    value={email}
                    onChange={handleEmailChange}
                    type="email">
                </input>

                <h1>password:</h1>
                <input
                    required
                    className="Signup-Input"
                    type="password"
                    placeholder="Example1"
                    value={password}
                    onChange={handlePasswordChange}
                    minLength={8}
                    maxLength={32}
                    pattern="(?=.*\d)(?=.*[A-Z]).{8,}"
                    title="Password must contain at least 1 capital letter and 1 number">
                </input>

                <h3>Confirm Password:</h3>
                <input
                    className={`Signup-Input ${!passwordsMatch ? 'passwords-not-match' : ''}`}
                    type="password"
                    placeholder="Example1"
                    minLength={8}
                    maxLength={32}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                />
                {error && <p style={{ color: 'red' }}>Error:</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {confirmation && <p style={{ color: 'green' }}>Success</p>}
                {confirmation && <p style={{ color: 'green' }}>{confirmation}</p>}
                
            </div>
            <h1>{'}'}</h1>
            <button type="submit">Submit{'()'}</button>
            </form>
        </div >
    )
}