import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Header from "./Header";
import Profile from "./../icons/profile";
import { ReactComponent as Dashboard } from "./../icons/dashboard.svg";
import { ReactComponent as Ebook } from "./../icons/ebook.svg";
import { ReactComponent as Quiz } from "./../icons/timer.svg";
import { ReactComponent as Notificationbell } from "./../icons/notificationbell.svg";
import { useLocation } from "react-router-dom";

const MainPage = ({ dashboardButton, ebook }) => {
  const [visible, setVisible] = useState(2);
  const [disabled, setDisabled] = useState(false);
  const { pathname } = useLocation();
  console.log("pathname", pathname);
  console.log("ebook", ebook);
  return (
    <div>
      <div className="main-page-header">
            <Header pathname={pathname}/>
            <Profile />
        {/* <Notificationbell className="header-notificatgionbell"/> */}
      </div>
      <div className="main-page-body">
        <div className="main-page-left-panel">
          <button
          style={{backgroundColor:"#282c34", color:"white", border:"none", marginBottom:"10px", marginTop:"20px"}} 
          className={dashboardButton ? dashboardButton === "Preview" || "Subscribe" ? "" : "active" : pathname=="/dashboard" ? "active" : ""}
          onClick={(e) => {e.preventDefault(); setVisible(1)}}>
            <Dashboard/>
            <Link
              to="/dashboard"
              style={{ textDecoration: "none" }}
              className="main-page-button"
            >
              Dashboard
            </Link>
          </button>

          <button
            style={{backgroundColor:"#282c34", color:"white", border:"none", marginBottom:"10px"}}
            className={dashboardButton ? dashboardButton === "Preview" || "Subscribe" ? "active" : "" : pathname=="/ebook" ? "active" : ""}
            onClick={(e) => {e.preventDefault(); setVisible(2)}}>
            <Ebook/>
            <Link
              to="/ebook"
              style={{ textDecoration: "none", fontSize:"12.2px" }}
              className="main-page-button">
              Surf e-books
            </Link>
          </button>

          <button
            style={{backgroundColor:"#282c34", color:"white", border:"none", marginBottom:"10px"}}
            className={dashboardButton ? dashboardButton !== "Preview" || "Subscribe" ? "" : "active" : pathname=="/quiz" ? "active" : ""}
            onClick={(e) => {e.preventDefault(); setVisible(3)}}>
            <Quiz />
            <Link to="/quiz" 
            style={{ textDecoration: "none" }}
            className="main-page-button">Take Quiz</Link>
          </button>
        </div>

      </div>
    </div>
  );
};

export default MainPage;
