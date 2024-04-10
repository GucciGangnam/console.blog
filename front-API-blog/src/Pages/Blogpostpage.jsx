// Imports 

// RRD
import { useParams, useNavigate, Link, useActionData } from "react-router-dom";

// Components //
import { Newcomment } from "../Components/Newcomment";

// Styles 
import "./Blogpostpage.css"

// React 
import { useEffect, useState, useRef } from "react";

// COMPONENT //
export const Blogpostpage = ({ userAccessToken, loggedinUser }) => {
    // set up navigate
    const navigate = useNavigate();
    // UseState
    // States 
    const [post, setPost] = useState({});
    const [loadingData, setLoadingData] = useState(true);
    const [error, setError] = useState(null);
    const [userLikedPost, setUserLikedPost] = useState(false)
    const [postLikesCount, setPostLikesCount] = useState("")

    const [showCommentBox, setShowCommentBox] = useState(false)



    // Get params from url
    const { id } = useParams();
    // UE to frun fetchPost function on mount 
    useEffect(() => {
        fetchPost(id);
    }, [])
    // FN to fetch Posts using is from url params
    const fetchPost = async (postID) => {
        try {
            // Define req options
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            };
            // Fetch 
            const response = await fetch(`https://consoleblog.adaptable.app/api/post/${postID}`, requestOptions)
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            // If users id (from loggedinUser) is included in the like array, then set the userLikedPost to be true (making teh handle liek button a dislike button)
            const jsonData = await response.json();
            if (jsonData.post.LIKES.includes(loggedinUser.userId)) {
                setUserLikedPost(true);
            }
            setPostLikesCount(jsonData.post.LIKES.length)
            setTimeout(() => {
                setPost(jsonData);
                setLoadingData(false);
            }, 2000);
        } catch (error) {
            console.error('Error fetching data:', error.message);
            setError("Cant find that post");
        }
    };
    // FN To increment likes
    const handleLike = async () => {
        try {
            // Post request to http://localhost:3000/api/post/like/POSTID
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userAccessToken
                }
            };
            const response = await fetch(`https://consoleblog.adaptable.app/api/post/like/${id}`, requestOptions);
            if (!response.ok) {
                alert("you must log in to like a post")
                throw new Error('Failed to like/unlike the post');
            }
            if (response.ok){ 
                if (userLikedPost) {
                    setUserLikedPost(false);
                    setPostLikesCount(prevPostLikeCount => prevPostLikeCount - 1);
                } else {
                    setUserLikedPost(true);
                    setPostLikesCount(prevPostLikeCount => prevPostLikeCount + 1);
                }
            }
            console.log('Like operation succeeded');
        } catch (error) {
            console.error('Error occurred while liking/unliking the post:', error.message);
            // Handle the error appropriately, such as displaying an error message to the user
        }
    };
    // FN to handle delete post 
    const handleDeletePost = async () => {
        console.log("deleteing post")
        // post fetcgh to delete post api link with body as POST ID
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userAccessToken
            },
            body: JSON.stringify({ postID: post.post.ID })
        };
        try {
            const response = await fetch('https://consoleblog.adaptable.app/api/post', requestOptions)
            const responseJson = await response.json();
            if (response.ok) {
                console.log(responseJson.msg)
                navigate('/')
            } else {
                console.log(responseJson.msg)
            }
        } catch (err) {
            console.error(err)
        }
    }
    // FB to handle EDIT post 
    const handleEditPost = () => { 
        console.log("editign post")
    }
    // Handle show comment bopx 
    const handleShowCommentBox = () => {
        if (showCommentBox) {
            setShowCommentBox(false)
        } else {
            setShowCommentBox(true)
        }
    }


    return (

        <div className="Blogpostpage">
            {showCommentBox && <Newcomment setShowCommentBox={setShowCommentBox} userAccessToken={userAccessToken} id={id} />}
            <h1>{'{'}</h1>
            <div className="Blogpostpage-post-container">
                {loadingData ? (
                    <div className="Post-loading-container">
                        Loading post
                        <span className="Loading-dots Loading-dots-1">.</span>
                        <span className="Loading-dots Loading-dots-2">.</span>
                        <span className="Loading-dots Loading-dots-3">.</span>
                        <span className="Loading-dots Loading-dots-4">.</span>
                        <span className="Loading-dots Loading-dots-5">.</span>

                        <div className="Loading-steps">
                            <p className="Loading-step">Fetching data</p>
                            <p className="Loading-step">Awaiting response</p>
                            <p className="Loading-step">Response to JSON</p>
                            <p className="Loading-step">Setting title</p>
                            <p className="Loading-step">Setting author</p>
                            <p className="Loading-step">Setting date</p>
                            <p className="Loading-step">Counting words</p>
                            <p className="Loading-step">Finishing</p>
                            {error && <p className="Post-Loading-Error">Error: {error}</p>}
                        </div>
                    </div>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : post.post ? (
                    <div className="Object-grid-container">
                        <h3>Title:</h3><h3>{post.post.TITLE},</h3>
                        <h3>Body:</h3><h3>{post.post.BODY},</h3>
                        <h3>Likes:</h3><h3>{postLikesCount},</h3>
                        <h3>Functions:</h3>
                        <h3>
                            <button onClick={handleLike}>
                                {userLikedPost ? "decrementLike" : "IncrementLike"} {'('}{')'}
                            </button>
                            <button onClick={handleShowCommentBox}>postComment{'('}{')'}</button>
                            {post.post.AUTHOR_ID === loggedinUser.userId && (
                                <>
                                <button onClick={handleDeletePost}>DeletePost{'('}{')'}</button>
                                </>
                            )}
                        </h3>
                        <h3>Comments:</h3>
                        <div>
                            {post.post.COMMENTS.map((comment) => (
                                <div className="Object-grid-container" key={comment.ID}>
                                    <div>{comment.AUTHOR_USERNAME}:</div>
                                    <div>{comment.BODY}</div>
                                    
                                </div>
                                
                            ))}
                        </div>
                    </div>
                ) : (
                    <p>No post available</p>
                )}
            </div>
            <h1>{'}'}</h1>
        </div>
    )
}