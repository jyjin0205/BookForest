import HorizonBar from "../components/HorizonBar";
import "./Today.css";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Card from "../components/Card";
import RecommendationCard from "../components/RecommendationCard";

function Today(){

    const navigate = useNavigate();
 
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
 
    useEffect(() => {
      axios.get("http://localhost:3001/api/books")
        .then((response) => {
          setItems(response.data);  
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
          setError("Error fetching posts"); 
          setLoading(false);
        });
    }, []);
    
    // Randomize and get 10 items
    const randomBooks = items.sort(() => 0.5 - Math.random()).slice(0, 10);
    
    // Randomize a single feed item
    const randomFeed = items[Math.floor(Math.random() * items.length)];

    if (loading) {
       return <p id="center">Loading Feeds</p>; 
    }
 
    if (error) {
       return <p id="center">{error}</p>; 
    }

    return (
        <div className="todayBack">
            <HorizonBar />
            
            <div className="todaysbook_div">
                <img className="todaysbook_image" src="https://raw.githubusercontent.com/WIWLEE/ImageStorage/master/img/image-20241205044505996.png" />
            </div>
            
            <img className="banner" src="https://bookbrush.com/wp-content/uploads/Dean-Koontz-Banner.png" alt="Banner" />
            <div id="recommendation_div">
                <h2 id="recommendation">Today's Recommendation</h2>
            </div>

            <div id="cardBox-today">
                {randomBooks.map((item) => (
                   <Card 
                      imageUrl={item.coverImg} 
                      title={item.title} 
                      author={item.author} 
                      content={""} 
                      onClick={() => {
                         navigate(`./BookContent/${item._id}`); 
                      }}
                   />
                ))}
            </div>


            <div id="recommendation_div">
                <h2 id="recommendation">Today's Feed</h2>
            </div>

            
            <div id="cardBox-today">
                {randomFeed && (
                    <RecommendationCard 
                        imageUrl={"https://www.epubbooks.com/images/covers/wi/winter-s-tale-2b46a8.jpg"} 
                        title={"The Winter's Tale"} 
                        author={"William Shakespeare"} 
                        content={"A masterpiece by Shakespeare that seamlessly blends tragedy and comedy. The play explores deep emotions such as jealousy, love, and redemption. The first half is intense and full of drama, while the second half offers a sense of hope and joy. The miraculous resurrection at the end adds a sense of wonder, making it a timeless play for readers who enjoy classic literature with rich themes and emotional depth."} 
                        onClick={() => {
                           navigate(`./BookContent/5`);
                        }}
                    />
                )}
            </div>

        </div>
    );
}

export default Today;
