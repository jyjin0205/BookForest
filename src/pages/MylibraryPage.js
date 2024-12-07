import React, {useEffect, useState} from 'react';
import LibCard from "../components/LibCard";
import HorizonBar from '../components/HorizonBar';
import { useNavigate } from 'react-router-dom';

import '../styles/MylibraryPage.css'

const MylibraryPage = () => {

    const [books, setBooks] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        
        const fetchBooks = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/mylibrary", {
                    method: 'GET',
                    headers: {'Content-Type':'application/json'},
                    credentials: 'include', // cookie inculde
                });
    
                if(response.ok)
                {
                    const data = await response.json();
                    if(data.books)
                        setBooks(data.books);
                }
    
            } catch(error) {
                console.error('Error submitting form:',error);
            }
        };

        fetchBooks();
    }, []);

    const handleNavigate = () =>{
        navigate("/Searching");
    };

    return(
        <>
            <HorizonBar />
            <div className="document">
                <div className="my-library-header">
                    <h1>My Library</h1>
                    <button className="add-book-button" onClick={handleNavigate}>Search</button>
                </div>
                <div className='book-storage'>
                    <div className="book-grid">
                        {books.map((book)=>(
                            <LibCard
                                key={book._id}
                                imageUrl = {book.coverImg}
                                title = {book.title}
                                author = {book.author}
                                alt = {book.title}
                                onClick = {() => {navigate(`../BookContent/${book._id}`);}}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </>
    );
}

export default MylibraryPage;