import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Feed from './pages/Feed';
import Today from './pages/Today';

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Feed" element={<Feed />} />
                <Route path="/Today" element={<Today />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element= {<SignupPage />}/>
            </Routes>
        </Router>
    );
}

export default App;
