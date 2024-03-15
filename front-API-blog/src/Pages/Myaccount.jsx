// IMPORTS //
// Hooks 
import { useEffect, useState } from "react";
// RRD
import { Link, useNavigate } from "react-router-dom";
// Styles 
import "./Myaccount.css"

// COMPONENT // 
export const Myaccount = ({ userAccessToken, loggedinUser }) => {
    const navigate = useNavigate();
    // States 
    const [loading, setLoading] = useState(true)
    const [fetchErr, setFetchErr] = useState(false)
    const [fetchErrMsg, setFetchErrMsg] = useState(false)
    const [userData, setUserData] = useState({})


    //UE to fetch request on mount
    useEffect(() => {
        fetchUserAccountInfo();
    }, [])
    // Fetch - Fetch user info from thne api (oops, i used req.body)
    const fetchUserAccountInfo = async () => {
        setLoading(true)
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userAccessToken
                }
            };
            const response = await fetch(`http://localhost:3000/api/user`, requestOptions)
            if (!response.ok) {
                const responseData = await response.json();
                setTimeout(() => {
                    setLoading(false)
                    setFetchErr(true)
                }, 2000)
                console.log(responseData)
                navigate('/login')
                return;
            } else {
                const data = await response.json();
                setTimeout(() => {
                    setUserData(data.publicUserInfo)
                    setLoading(false)
                    setFetchErr(false)
                }, 2000)
            }
            return;
        } catch (err) {
            setTimeout(() => {
                setLoading(true)
                setFetchErr(true)
                setFetchErrMsg("Error connecting to database")
            }, 2000)
            console.error(err);
            return;
        }
    }

    return (
        <div className="Myaccount">
            <h1 className="Posts-Header">{'{'}</h1>
            <div className="Blogpostpage-post-container">
                {loading ? (
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
                            <p className="Loading-step">Authorizing</p>
                            <p className="Loading-step">Checking permissions</p>
                            <p className="Loading-step">Response to JSON</p>
                            <p className="Loading-step">Setting user info</p>
                            <p className="Loading-step">Setting user info</p>
                            <p className="Loading-step">Finishing</p>
                            {fetchErr && <p className="Post-Loading-Error">Error: {fetchErrMsg}</p>}
                        </div>
                    </div>
                ) : fetchErr ? (
                    <p className="Post-Loading-Error">Error: {fetchErrMsg}</p>
                ) : (
                    <div className="Object-grid-container">
                    <h3>username:</h3><h3>{userData.USERNAME},</h3>
                    <h3>Firstname:</h3><h3>{userData.FIRSTNAME ? userData.FIRSTNAME : "Anon"},</h3>
                    <h3>Lastname:</h3><h3>{userData.LASTNAME ? userData.LASTNAME : "Anon"},</h3>
                    <h3>Email:</h3><h3>{userData.EMAIL},</h3>                  
                    </div>
                )}
            </div>
            <h1 className="Posts-Header">{'}'}</h1>
        </div>
        
    )
}

// If resposnse is ok then load user account page!


// If not then redirect to login page!