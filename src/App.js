import React, {useState} from 'react';
import LoginPage from './components/LoginPage';
import LogoutPage from './components/LogoutPage';
import MainPage from './components/MainPage';
import { BrowserRouter as Router, Route, Routes, Redirect, Navigate } from 'react-router-dom';
import './App.css';
import EbookPage from './components/EbookPage';
import QuizPage from './components/QuizPage';
import PageNotFound from './components/PageNotFound';
import Pdf from './components/Pdf';
import Dashboard from './components/Dashboard';
import Ebook from './components/Ebook';

const App = () => {
    const [dashboardButton, setDashboardButton] = useState('')
  return (
    <div className="App">
      <Routes>
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/ebook/:title' element={<Ebook dashboardButton={dashboardButton}/>} />
          <Route path='/ebook' element={<EbookPage setDashboardButton={setDashboardButton}/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/quiz' element={<QuizPage dashboardButton={dashboardButton}/>} />
          <Route path='/logout' element={<LogoutPage/>} />
          <Route path="/404" element={<PageNotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
    </div>
  );
}

export default App;