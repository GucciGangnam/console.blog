// IMPORTS 
// RRD 
// HOOKS 
import { useState } from "react"
// Styles
import "./Newcomment.css"

// COMNPONENT // 
export const Newcomment = ({ userAccessToken, setShowCommentBox, id }) => {
    // State 
    const [message, setMessage] = useState("")
    // Handle post comment 
    const handlePostComment = async (e) => {
        e.preventDefault();
        console.log("handling posting of comment")
        // Post reqest to post/comment?ID
        // required req.body.msg to be teh mcomment meesage 
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userAccessToken
            },
            body: JSON.stringify({ comment: message })
        };
        const response = await fetch(`https://consoleblog.adaptable.app/api/post/comment/${id}`, requestOptions)
        if (!response.ok) {
            console.log("response NOT OK")
            alert("Must be logged in to post a comment")
        } else {
            console.log("response OK!")
            setShowCommentBox(false)
            window.location.reload();
        }
    }
    // Handle change message 
    const handleChangeMessage = (event) => {
        setMessage(event.target.value);
    }

    return (
        <div className="NewcommentContainer">
            <form className="Newcommewnt-form" onSubmit={handlePostComment}>
                Comment
                <input
                    className="Newcomment-textinput"
                    type="text"
                    value={message}
                    onChange={handleChangeMessage}
                />
                <div className="CommentBoxButtons">
                <button onClick={() => { setShowCommentBox(false) }}>Close Box</button>
                <button type="submit">PostComment</button>
                </div>

            </form>
        </div>
    )
}