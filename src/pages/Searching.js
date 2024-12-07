import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import HorizonBar from '../components/HorizonBar';
import LibCard from "../components/LibCard";
import '../styles/Searching.css'



const Searching = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searched, setSearched] = useState(false);

    const navigate = useNavigate();


    const handleSearch = async() =>{
        if(searchQuery.trim()){
            try{
                const response = await fetch(`http://localhost:3001/api/books/search?userinput=${searchQuery}`, {
                    method: 'GET',
                    headers: {'Content-Type':'application/json'},
                    credentials: 'include', 
                });
                if (response.ok) {
                    const data = await response.json();
                    setSearchResults(data.books || []);
                }
            }catch(error){
                console.error("Search error");
            } finally {
                setSearched(true);
            }
        }
    }


    return(
        <>
            <HorizonBar />
            <div className="document">
            <div className="search-header">
                    <h1>Searching</h1>
                </div>

                <div className="search-container">
                    <div className="search-box">
                        <input 
                            type="text" 
                            placeholder="Search for books..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)} 
                        />
                        <button className="search-button" onClick={handleSearch}>Search</button>
                    </div>
                    
                    <div className="search-results">
                        {searchResults.length === 0 && searched ? (
                            <div className="search-no-result">No result</div>
                        ) : (
                            searchResults.map((book) => (
                                <LibCard
                                    key={book._id}
                                    imageUrl={book.coverImg}
                                    title={book.title}
                                    author={book.author}
                                    alt={book.title}
                                    onClick={() => navigate(`/Detail/${book._id}`)}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Searching;