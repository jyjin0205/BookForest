import { useNavigate } from 'react-router-dom';
import "./Card.css";

function HorizonBar() {
    const navigate = useNavigate();
    
    return (    
        <div>
            <div id="horizon-bar">
                <h2 id="webtitle">BOOK FOREST</h2>
                <button id="TodayButton" onClick={() => {
                    navigate("/");
                }}>Home</button>
                <button id="FeedButton" onClick={() => {
                    navigate("/Feed");
                }}>Feed</button>
                <button id="myPageButton" onClick={() => {
                    navigate("/MyPage");
                }}>MyPage</button>
            </div>
        </div>
    );
}

export default HorizonBar;