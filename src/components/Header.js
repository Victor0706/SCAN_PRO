import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


import Navbar from './Navbar';
import UserBlock from './UserBlock';
import { useAuth } from '../context/AuthContext';

import '../styles/Header.css';

import useWindowSize from './useWindowSize';

import scan_logo_green from '../assets/scan_logo_green.svg';
import scan_logo_white from '../assets/scan_logo_white.svg';
import fallout_menu_icon from '../assets/fallout_menu_icon.svg';
import close_icon from '../assets/closing-icon.png';

const Header = ({ isLoggedIn, userName, userPicture, setUserName, setUserPicture }) => {
    const { setIsLoggedIn } = useAuth();
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const { width } = useWindowSize();
    const isMobile = width <= 1360;

    const toggleMenuVisibility = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/auth');
    };

    const handleLoginAndCloseMenu = () => {
        handleLoginClick(); 
        setIsMenuVisible(false);
    };

    useEffect(() => {
        const interval = setInterval(() => {
          const tokenExpire = localStorage.getItem('tokenExpire');
          const now = new Date();
      
          if (!tokenExpire || new Date(tokenExpire) <= now) {
            setIsLoggedIn(false);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('tokenExpire');
          }
        }, 1000 * 60);
      
        return () => clearInterval(interval);
      }, []);

    return (
        <header className={isMenuVisible && isMobile ? 'menu-visible' : ''}>
            <div className="header-content">
                <img className="scan-logo" src={isMenuVisible && isMobile ? scan_logo_white : scan_logo_green} alt="Scan logo" />

                {!isMobile && <Navbar />}

                {!isMobile && isLoggedIn && (
                    <div className="right-section">
                        <UserBlock 
                            isLoggedIn={isLoggedIn} 
                            userName={userName} 
                            userPicture={userPicture} 
                            setUserName={setUserName}
                            setUserPicture={setUserPicture}
                        />
                    </div>
                )}

                {isMobile && !isMenuVisible && (
                    <UserBlock 
                        isLoggedIn={isLoggedIn} 
                        userName={userName} 
                        userPicture={userPicture} 
                        setUserName={setUserName}
                        setUserPicture={setUserPicture}
                        isMenuVisible={isMenuVisible}
                        isMobile={isMobile}
                    />
                )}

                {isMobile && (
                    <img src={isMenuVisible ? close_icon : fallout_menu_icon} 
                    alt="Menu" className="menu-icon" 
                    onClick={toggleMenuVisibility} />
                )}

                {!isLoggedIn && !isMobile && (
                    <div className="right-section">
                        <div className="reg-block">
                            <a href="/auth" className="reg-link login">Зарегистрироваться</a>
                            <div className="vertical-divider"></div>
                            <button className="login-button" id="loginButton" onClick={handleLoginClick}>Войти</button>
                        </div>
                    </div>    
                )}
            </div>
            
            {isMenuVisible && isMobile && (
                <div className="dropdown-menu-page">
                    <Navbar />
                    {isLoggedIn ? (
                        <UserBlock 
                            isLoggedIn={isLoggedIn} 
                            userName={userName} 
                            userPicture={userPicture} 
                            setUserName={setUserName}
                            setUserPicture={setUserPicture}
                            isMenuVisible={isMenuVisible}
                            isMobile={isMobile}
                        />
                    ) : (
                        <div className="reg-block">
                            <a href="/auth" className="reg-link login">Зарегистрироваться</a>
                            <button className="login-button" id="loginButton" onClick={handleLoginAndCloseMenu}>Войти</button>
                        </div>
                    )}  
                </div> 
            )} 
                  
                  
        </header>
    );
};


export default Header;
