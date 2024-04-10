// IMPORTS //
// Hooks
import { useState} from 'react';
// RRD
import { useNavigate } from "react-router-dom";
// Styles
import './Newpost.css'
// Components 

// COMPONENT // 
export const Newpost = ({ userAccessToken }) => {
    // Set up navigate 
    const navigate = useNavigate();
    // States
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('')
    // Handle input values 
    const handleTitleChange = (e) => {
        const newValue = e.target.value;
        // Regular expression to allow most special characters but exclude potentially harmful ones
        const pattern = /^[^;'"\\]+$/;
        // Check if the new value matches the pattern
        if (pattern.test(newValue) || newValue === '') {
            // Update the state with the new value
            setTitle(newValue);
        }
    }
    const handleBodyChange = (e) => {
        const newBody = e.target.value;
        setBody(newBody);
    }
    // Handle submit 
    const submitNewPost = async (e) => {
        e.preventDefault();
        console.log("new post submitting")
        // Post request to http://localhost:3000/api/post
        const formData = {
            body: body,
            title: title,
        };
        // Set request options
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userAccessToken
            },
            body: JSON.stringify(formData)
        };
        try {
            const response = await fetch('http://localhost:3000/api/post', requestOptions)
            const responseBody = await response.json(); // Parse JSON response once
            const msg = responseBody.msg;
            if (response.ok) {
                console.log(msg)
                console.log("all good")
                navigate('/')
            } else {
                console.log(msg)
                console.log("all bad")
            }
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <div className='Newpost'>
            <form onSubmit={submitNewPost}>

                <h1>newPost = {'{'}</h1>
                <div className="Signup-object-grid-container">
                    <h1>title:</h1>
                    <input
                        required
                        className="Signup-Input"
                        placeholder="Example"
                        maxLength={50}
                        minLength={3}
                        value={title}
                        onChange={handleTitleChange}
                    />
                    <h1 id='xxx'>Body:</h1>
                    <textarea
                        required
                        className="Signup-Input"
                        placeholder="Type your blog here"
                        value={body}
                        onChange={handleBodyChange}
                        rows={5} // Set the initial number of rows
                        style={{ resize: 'vertical' }} // Allow vertical resizing
                        maxLength={10000} // Limit to 1000 characters
                    />
                </div>
                <h1>{'}'}</h1>
                <button type="submit">Submit{'()'}</button>


            </form>
        </div>
    )
}