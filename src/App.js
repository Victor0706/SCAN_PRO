import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import './App.css';


import './fonts/ferry.otf';
import './fonts/InterRegular.ttf';
import './fonts/InterMedium.ttf';
import './fonts/InterBold.ttf';

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import Authorization from './components/Authorization';
import Search from './components/Search';
import SearchResults from './components/SearchResults';
import user_pic_example from './assets/user_pic_example.png';

function App() {
  const { isLoggedIn, checkAuthStatus } = useAuth();
  const [userTariff, setUserTariff] = useState('beginner');
  const [userName, setUserName] = useState('');
  const [userPicture, setUserPicture] = useState(user_pic_example);
  
  useEffect(() => {
    if (!isLoggedIn) {
        console.log("Пользователь не залогинен, обновите UI");
      }
  }, [isLoggedIn]);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return (
    <Router>
      <div className="app-container">
        <Header isLoggedIn={isLoggedIn} userName={userName} setUserName={setUserName} userPicture={userPicture} setUserPicture={setUserPicture} />
        <Routes>
          <Route path="/" element={<Main isLoggedIn={isLoggedIn} userTariff={userTariff} />} /> 
          <Route path="/auth" element={<Authorization />} />
          <Route path="/search" element={isLoggedIn ? <Search /> : <Authorization redirectBack="/search" />} />
          <Route path="/results" element={isLoggedIn ? <SearchResults /> : <Authorization redirectBack="/results" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

