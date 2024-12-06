import React, {useState} from 'react';
import HorizonBar from '../components/HorizonBar';
import LibCard from "../components/LibCard";
import '../styles/Searching.css'



const Searching = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

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
                        {searchResults.length > 0 ? (
                            searchResults.map((book) => (
                                <LibCard
                                    key={book.id}
                                    imageUrl={book.coverImg}
                                    title={book.title}
                                    author={book.author}
                                    alt={book.title}
                                />
                            ))
                        ) : (
                            <p></p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Searching;