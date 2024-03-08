// Imports 

// RRD
import { useParams, useNavigate, Link } from "react-router-dom";

// Components //


// Styles 
import "./Blogpostpage.css"
import { useEffect, useState } from "react";

// COMPONENT //
export const Blogpostpage = () => {
    // States 
    const [post, setPost] = useState({});
    const [loadingData, setLoadingData] = useState(true);
    const [error, setError] = useState(null);
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
            const response = await fetch(`http://localhost:3000/api/post/${postID}`, requestOptions)
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const jsonData = await response.json();
            setTimeout(() => {
                setPost(jsonData);
                setLoadingData(false);
            }, 2000);
        } catch (error) {
            console.error('Error fetching data:', error.message);
            setError("Cant find that post");
        }
    };


    return (





        <div className="Blogpostpage">
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
                            <p className="Loading-step">Setting titles</p>
                            <p className="Loading-step">Setting authors</p>
                            <p className="Loading-step">Setting dates</p>
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
                    <h3>Likes:</h3><h3>{post.post.LIKES.length},</h3>
                    <h3>Functions:</h3><h3><button>IncrementLike{'('}{')'}</button><button>postComment{'('}{')'}</button></h3>
                    <h3>Comments:</h3>
                    <div className="Object-grid-container">
                        <h3>A</h3>
                        <h3>A</h3>
                        <h3>A</h3>
                        <h3>A</h3>
                        <h3>A</h3>
                        <h3>A</h3>
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