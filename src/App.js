import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Feed from './pages/Feed';
import Today from './pages/Today';

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Feed" element={<Feed />} />
                <Route path="/Today" element={<Today />} />
            </Routes>
        </Router>
    );
}

export default App;
