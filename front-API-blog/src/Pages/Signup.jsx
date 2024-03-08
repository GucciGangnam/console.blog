// IMPORTS 

// STYLES
import { useState } from "react";
import "./Signup.css"

// COMPONENT // 
export const Signup = () => {
    // States 
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    // Handle Input Changes
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        setPasswordsMatch(event.target.value === password);
    };
    return (
        <div className="Signup">
            <h1>signUpForm = {'{'}
            </h1>
            <div className="Signup-object-grid-container">
                <h1>username:</h1>
                <input
                    required
                    className="Signup-Input"
                    placeholder="example"
                    maxLength={15}
                    minLength={3}>
                </input>

                <h1>email:</h1>
                <input
                    required
                    className="Signup-Input"
                    placeholder="example@example.com"
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
                    pattern="(?=.*\d)(?=.*[A-Z]).{8,}"
                    title="Password must contain at least 1 capital letter and 1 number">
                </input>

                <h3>Confirm Password:</h3>
                <input
                    className={`Signup-Input ${!passwordsMatch ? 'passwords-not-match' : ''}`}
                    type="password"
                    placeholder="Example1"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                />
            </div>
            <h1>{'}'}</h1>
            <button>Submit{'()'}</button>
        </div >
    )
}