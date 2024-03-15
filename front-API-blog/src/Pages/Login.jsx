// IMPORTS 
// RRD 
import { useNavigate } from "react-router-dom";
// STYLES
import { useState } from "react";
import "./Login.css"

// COMPONENT // 
export const Login = ({setUserAccessToken}) => {
    const navigate = useNavigate();
    // STATES
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    // Handle Input change 
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }
    // Handle Submit Form 
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("logging in")
        // POST LOG IN DATA  
        // Set form data
        const formData = {
            username: username,
            password: password,
        };
        // Set request options
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        };
        try {
            const response = await fetch('http://localhost:3000/api/user/login', requestOptions)
            const responseData = await response.json();
            if (response.ok) {
                localStorage.setItem("UserAccessToken", responseData.accessToken)
                setUserAccessToken(responseData.accessToken)
                navigate('/');
                // Handle access token 
            } else {
                setErrMsg(responseData.msg)
                console.log(errMsg)
            }
        } catch (err) {
            setErrMsg("Network error.  Please try again later")
        }
    }



    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <h1>User = {'{'}
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
                    >
                    </input>
                    {errMsg && <p style={{ color: 'red' }}>Error:</p>}
                    {errMsg && <p style={{ color: 'red' }}>{errMsg}</p>}
                </div>
                <h1>{'}'}</h1>
                <button type="submit">Submit{'()'}</button>
            </form>
        </div>
    )
}