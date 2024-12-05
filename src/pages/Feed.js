import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Card from "../components/Card";
import "./Feed.css";
import HorizonBar from "../components/HorizonBar"

function Feed() {

    const navigate = useNavigate();
 
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
 
    useEffect(() => {
      axios.get("http://localhost:3001/api/posts")
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
       <div>
         <HorizonBar />
          <h1 className="subtitle">FEED</h1>
          <div id="back">
             {/* Debugging: items를 직접 출력 */}
             {/* <pre>{JSON.stringify(items, null, 2)}</pre> */}
             <div id="cardBox">
                {items.map((item) => (
                   <Card 
                      imageUrl = {item.coverImg} // coverImg 필드로 설정
                      title = {item.title} // title 필드로 설정
                      author = {item.writer} // content 필드로 설정
                      content = {item.content} // content 필드로 설정
                      onClick = {()=>{
                        //  navigate(`./ItemDetail/${item._id}`);  // 아이템 ID로 이동
                      }}
                   />
                ))}
             </div>
          </div>
       </div>
    );
}
 
export default Feed;
