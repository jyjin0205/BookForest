import React, { useEffect, useState } from 'react';

const Home = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('/api/users')  // axios.get 대신 fetch 사용
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();  // JSON 데이터로 변환
            })
            .then(data => setMessage(data))  // 변환된 데이터 설정
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <h1>BookForest</h1>
            <p>Backend says: {message}</p>
        </div>
    );
};

export default Home;
