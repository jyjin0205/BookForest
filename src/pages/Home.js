import React, { Component } from 'react';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '', // 초기 상태 설정
        };
    }

    componentDidMount() {
        // 컴포넌트가 마운트될 때 fetch 호출
        fetch('/api/users')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // JSON 데이터로 변환
            })
            .then((data) => {
                this.setState({ message: data }); // 상태 업데이트
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    render() {
        return (
            <div>
                <h1>BookForest</h1>
                <p>Backend says: {this.state.message}</p>
            </div>
        );
    }
}

export default Home;
