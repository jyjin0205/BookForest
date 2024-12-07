import { useNavigate } from 'react-router-dom';
import React, {useState,useEffect} from "react";
import "./Card.css";
import signoutImage from "../file/sign-out.png";

const HorizonBar = () => {
    const navigate = useNavigate();
    const [exists, setExists] = useState(false); 

    const handleLogout = async(e) => {
        try{
            /*
            await fetch("http://localhost:3001/api/users/logout",{
                method: 'POST',
                credentials: 'include',
            });
            */

            document.cookie ="autoToken=expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
            navigate("/");
           
        }catch(error){
            console.error("Error");
        }
    }

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/users/userInfo", {
                    method: "GET",
                    credentials: "include", 
                });

                if (response.ok) {
                    const data = await response.json();
                    setExists(data.exists);
                } else {
                    console.error("Failed to fetch userInfo");
                }
            } catch (error) {
                console.error("Error fetching userInfo:", error);
            }
        }; 
        fetchUserInfo();
    });
    
    return (    
        <div>
            <div id="horizon-bar">
                <h2 id="webtitle">BOOK FOREST</h2>
                <button id="TodayButton" onClick={() => {
                    navigate("/");
                }}>Today</button>
                <button id="FeedButton" onClick={() => {
                    navigate("/Feed");
                }}>Feed</button>
                {exists && (
                    <>
                    <button id="myPageButton" onClick={() => {
                    navigate("/MyPage");
                    }}>MyPage</button>

                    <button id="signOutButton" onClick={()=>{
                        handleLogout();
                    }}>
                        <img src={signoutImage} alt="logout" width="30px"/>
                    </button>
                    </>
                )}
                {!exists && (
                    <button id="logInButton" onClick={()=> {
                        navigate("/login");
                    }}>LogIn</button>
                )}
                
            </div>
        </div>
    );
}

export default HorizonBar;