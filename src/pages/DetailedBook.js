import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import HorizonBar from '../components/HorizonBar';
import '../styles/DetailedBook.css'


const DetailedBook = () => {

    const {id} = useParams();
    const [book, setBook] = useState(null);

    //User Login
    const [exists, setExists] = useState(false); 
    const [userId, setUserId] = useState(null);

    //Already Assigned
    const [isassign, setIsAssign] = useState(false);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/users/detail/${id}`, {
                    method: "GET",
                    credentials: "include", 
                });
    
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setExists(data.exists);
                    setUserId(data.userId);
                    setBook(data.book);
                } else {
                    console.error("Failed to fetch userInfo");
                }
            } catch (error) {
                console.error("Error fetching userInfo:", error);
            }
        };

    
        fetchUserInfo();
    }, [id]);
    
    useEffect(() => {
        const isAlreadyAssigned = async () => {
            if (!userId || !book) return;
    
            try {
                const response = await fetch("http://localhost:3001/api/users/alreadyassign", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ userId, bookId: id }),
                });
                if (response.ok) {
                    const data = await response.json();
                    if(data.assigned === true)
                        setIsAssign(true);
                }
            } catch (error) {
                console.error(error);
            }
        };
    
        isAlreadyAssigned();
    }, [userId, book, id]);

    const handleAssign = async () => {
        if(!userId)
            return "No User";
        
        try{
            const response = await fetch("http://localhost:3001/api/users/assign",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({userId:userId, bookId:id}),
            });

            if(response.ok){
                alert("Assigned");
            }
        }catch(error)
        {
            return "Error assigning book";
        }

    }


    return(
        <>
            <HorizonBar />
            {book ? (
                <div className="book-detail-container">
                    <div className = "book-detail-cover">
                        <img src={book.coverImg} alt={book.title}></img>
                    </div>
                    <div className = "book-detail-info">
                        <div className="book-detail-title">{book.title}</div>
                        <div className="book-detail-author">{book.author}</div>
                        {book.description ? (<div className="book-detail-description">
                            {book.description}
                        </div>) : (<></>)}
                        {exists ? (
                            <>
                                {isassign ? (
                                    <div className ="Assigned-detail">Assigned</div>
                                ):(<button className="book-detail-assign" onClick={()=>handleAssign()}>Assign To Me</button>)}
                            </>) : 
                        (<></>)}
                    </div>
                </div>
            ):(
                <p> Loading ... </p>
            )}

        </>
    );
}

export default DetailedBook;