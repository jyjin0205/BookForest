import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import HorizonBar from '../components/HorizonBar';


const DetailedBook = () => {

    const {id} = useParams();
    const [book, setBook] = useState(null);

    //User Login
    const [exists, setExists] = useState(false); 
    const [userId, setUserId] = useState(null);

    //Already Assigned
    const [isassign, setIsAssign] = useState(false);


    useEffect(()=>{
        const fetchUserInfo = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/users/userInfo", {
                    method: "GET",
                    credentials: "include", 
                });

                if (response.ok) {
                    const data = await response.json();
                    setExists(data.exists);
                    setUserId(data.userId);
                } else {
                    console.error("Failed to fetch userInfo");
                }
            } catch (error) {
                console.error("Error fetching userInfo:", error);
            }
        }; 

        const findBook = async () => {
            try{
                const response = await fetch(`http://localhost:3001/api/books/${id}`);
                if(response.ok){
                    const data = await response.json();
                    setBook(data);
                }
            }catch(error)
            {
                console.error(error);
            }finally
            {
                console.log(book);
            }
        };

        const isAlreadyAssigned = async() => {
            try{
                const response = await fetch(`http://localhost:3001/api/users/alreadlyassign`,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({userId:userId, bookId:id}),
                });
                if(response.ok){
                    const data = await response.json();
                    if(data.assigned === true)
                        setIsAssign(true);
                }
            }catch(error)
            {
                console.error(error);
            }
        }

        findBook();
        fetchUserInfo();

        if(userId && book)
            isAlreadyAssigned();

    },[]);

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
                <div>
                    <div>{book.title}</div>
                    <div>{book.author}</div>
                    {book.description ? (<div>
                        {book.description}
                    </div>) : (<></>)}
                    <img src={book.coverImg} alt={book.title}></img>
                    {exists ? (
                        <>
                            {isassign ? (
                                <div>Assigned</div>
                            ):(<button onClick={()=>handleAssign()}>Assign To Me</button>)}
                        </>) : 
                    (<></>)}
                </div>
            ):(
                <p> Loading ... </p>
            )}

        </>
    );
}

export default DetailedBook;