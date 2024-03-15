// IMPORTS 
// React 
import { useState, useEffect } from "react";
// Import Links 
import { Link, useNavigate } from "react-router-dom";

// Styles 
import "./Homepage.css"

// COMPONENT // 
export const Homepage = () => {
    const navigate = useNavigate();
    const [allPosts, setAllPosts] = useState({});
    const [loadingData, setLoadingData] = useState(true);
    const [error, setError] = useState(null);

    // Button handlers 

    const handleReadPost = (postID) => {
        navigate(`/blogpost/${postID}`);
    }
    // UE to run fetchData on mount
    useEffect(() => {
        fetchData();
    }, []);

    // FN to fetchdata
    const fetchData = async () => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            };
            setLoadingData(true);
            const response = await fetch('http://localhost:3000/api/post/all', requestOptions);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const jsonData = await response.json();
            setTimeout(() => {
                setAllPosts(jsonData);
                setLoadingData(false);
            }, 2000);
        } catch (error) {
            console.error('Error fetching data:', error.message);
            setError("Error connecting to database");
        }
    };

    // FN to convert dates to dd/mm/yy
    function formatDate(dateString) {
        const date = new Date(dateString);
        // Get day, month, and year
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
        const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year
        return `${day}/${month}/${year}`;
    }

    return (
        <div className="Homepage">
            <h1 className="Posts-Header">{'{Posts}'}</h1>
            <div className="Homepage-post-container">
                {loadingData ? (
                    <div className="Post-loading-container">
                        Loading posts
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
                ) : allPosts.allPostsFromAPI[0] ? (
                    allPosts.allPostsFromAPI.map(post => (
                        <div className="PostCard" key={post.ID}>
                            <div className="PostTitle">{post.TITLE}</div>
                            <div className="PostInfo">
                                <p>{'{'}</p>
                                <p>&nbsp;Author: {post.AUTHOR_USERNAME}</p>
                                <p>&nbsp;Posted: {formatDate(post.TIMESTAMP)}</p>
                                <p>&nbsp;Words: xxx</p>
                                <p>&nbsp;Likes: {post.LIKES.length}</p>
                                <p>&nbsp;Comments: {post.COMMENTS.length}</p>
                                <p>{'}'}</p>
                            </div>
                            <div className="Post-Btn-container">
                                <button className="Post-Btn" onClick={() => handleReadPost(post.ID)}>Fetch</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No posts available</p>
                )}
            </div>
        </div>
    );
};