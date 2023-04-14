import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () =>{
    const navigate = useNavigate();
    const pagenotfoundHandler = ()=>{
        navigate('/login');
    }
    return (
        <div>
            <h1>Oops !</h1>
            <h2>404</h2>
            <h4>Page Not Found</h4>
            <p>The page you're looking for doesn't exist.</p>
            <button 
            onClick={pagenotfoundHandler}
            className="page-not-found-button"
            >Go to Login Page</button>
        </div>
    )
};

export default PageNotFound;