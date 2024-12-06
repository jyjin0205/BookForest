import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Feed from './pages/Feed';
import Today from './pages/Today';
import BookContent from './pages/BookContent';

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Today />} />
                <Route path="/Feed" element={<Feed />} />
                <Route path="/BookContent/:id" element={<BookContent />} />
            </Routes>
        </Router>
    );
}

export default App;
