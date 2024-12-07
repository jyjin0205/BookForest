import React, { useEffect, useState } from 'react';
import { ReactReader } from 'react-reader';
import './BookContent.css'; 
import { useParams , useNavigate} from 'react-router-dom';
import axios from "axios";

function BookContent() {
    const { id } = useParams();
    const [bookFile, setBookFile] = useState(null); 
    const [location, setLocation] = useState(null); 
    const [error, setError] = useState(null); 
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/api/books/${id}`)
            .then((response) => {
                const file = response.data.file;
                if (!file || file.trim() === "") {
                    setError("There's no book yet.");
                } else {
                    setBookFile(file);
                }
            })
            .catch((error) => {
                console.error("Error fetching book file:", error);
                setError("Failed to fetch the book.");
            });
    }, [id]);

    if (error) {
        return (
            <div>
                <button id="back-button"  onClick={() => navigate("/")}>Go Back</button>
                <div id="center">
                     <p>{error}</p>
                </div>
            </div>

        );
    }

    if (!bookFile) {
        return (
            <div>
                <button id="back-button"  onClick={() => navigate("/")}>Go Back</button>
                <div id="center">
                <p>Loading book...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
             <button id="back-button"  onClick={() => navigate("/")}>Go Back</button>
            <div style={{ height: "100vh" }}>
                <ReactReader
                    url={bookFile}
                    location={location}
                    locationChanged={(epubcfi) => setLocation(epubcfi)}
                />
            </div>
        </div>
    );
}

export default BookContent;
