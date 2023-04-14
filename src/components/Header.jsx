import React from "react";
import {ReactComponent as Capgemini} from './../icons/capgemini.svg';
import Elibrary from './../icons/elibrary.png'
const Header = ({pathname}) =>{
    console.log("pathnameeeeee", pathname)
    return (
        <div className="header">
            
             <img src={Elibrary} 
             className={pathname === "/dashboard" || pathname === "/ebook" || pathname === "/quiz"  
             ? "header-elibrary-icon-deq" : "header-elibrary-icon"}/>
             <Capgemini 
             className={pathname === "/dashboard" || pathname === "/ebook" || pathname === "/quiz" ? "capgemini-icon-deq" : "capgemini-icon"} />
        <h1 className={pathname === "/dashboard" || pathname === "/ebook" || pathname === "/quiz" ? "e-library-deq" : "e-library"}>
            
        {pathname === "/dashboard" || pathname === "/ebook" || pathname === "/quiz"  ? "e-Library" : "E-Library"}</h1>
        <h4 className={pathname === "/dashboard" || pathname === "/ebook" || pathname === "/quiz" ? "powered_by-deq" : "powered_by"}>powered by</h4>
        <h5 className={pathname === "/dashboard" || pathname === "/ebook" || pathname === "/quiz" ? "capgemini-deq" : "capgemini"}>Capgemini</h5>
        
        </div>
    );
}

export default Header;