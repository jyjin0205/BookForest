import HorizonBar from "../components/HorizonBar";
import "./Today.css";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Card from "../components/Card";

function Today(){

    const navigate = useNavigate();
 
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
 
    useEffect(() => {
      axios.get("http://localhost:3001/api/books")
        .then((response) => {
          setItems(response.data);  // 정상적으로 데이터를 설정합니다.
          setLoading(false); // 로딩 상태 업데이트
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
          setError("Error fetching posts"); // 에러 상태 업데이트
          setLoading(false); // 로딩 상태 업데이트
        });
    }, []);
    


    if (loading) {
       return <p id="center">Loading Feeds</p>; // 데이터 로딩 중 메시지
    }
 
    if (error) {
       return <p id="center">{error}</p>; // 에러 발생 시 메시지
    }

    return (
        <div className = "todayBack">
            <HorizonBar />
            <div className="todaysbook_div">
                <img className="todaysbook_image" src="https://raw.githubusercontent.com/WIWLEE/ImageStorage/master/img/image-20241205044505996.png" />
            </div>
            <img class="banner" src="https://bookbrush.com/wp-content/uploads/Dean-Koontz-Banner.png"></img>
            <div id="cardBox">
                {items.map((item) => (
                   <Card 
                      imageUrl = {item.coverImg} // coverImg 필드로 설정
                      title = {item.title} // title 필드로 설정
                      author = {item.author} // content 필드로 설정
                      content = {""} // content 필드로 설정
                      onClick = {()=>{
                        //  navigate(`./ItemDetail/${item._id}`);  // 아이템 ID로 이동
                      }}
                   />
                ))}
             </div>
        </div>
    );
}

export default Today;
