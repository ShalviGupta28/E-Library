import React, {useState} from "react";
import Header from "./Header";
import LoginPage from "./LoginPage";
import SubscriptionForm from './SubscriptionForm';
import {useNavigate} from "react-router-dom";




const LogoutPage = (props)=>{
    const navigate = useNavigate();
    const [show, setShow] = useState(false)
    const logoutHandler = (event)=>{
        event.preventDefault();
        console.log("logout")
        navigate('/login')
        setShow(true);
    }
 
    return (
        <div className="logout">
            {!show ? <>
                <Header/>
            <p className="logout-message">You have successfully Logged out, Thank You !</p>
            <button onClick={logoutHandler} className="logout-button">Go Back To Login</button></> 
            : ''} 
        </div>
    );
}

export default LogoutPage;