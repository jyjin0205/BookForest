import React, {useEffect, useState} from 'react';
import LibCard from "../components/LibCard";

const MylibraryPage = () => {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        
        const fetchBooks = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/mylibrary", {
                    method: 'GET',
                    headers: {'Content-Type':'application/json'},
                    credentials: 'include', // cookie inculde
                });
    
                if(response.ok)
                {
                    const data = await response.json();
                    setBooks(data);
                }
    
            } catch(error) {
                console.error('Error submitting form:',error);
            }
        };

        fetchBooks();
    }, []);

    return(
        <>
            <div className="document">
                <div class="book-grid">
                    <div class="book-img">
                        {books.map((book)=>(
                            <LibCard
                                imageUrl = {book.coverImg}
                                title = {book.title}
                                author = {book.author}
                                alt = {book.title}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default MylibraryPage;