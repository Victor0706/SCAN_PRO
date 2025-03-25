import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

import '../styles/Authorization.css';
import authorization_icon_facebook from "../assets/authorization_icon_facebook.svg";
import authorization_icon_google from "../assets/authorization_icon_google.svg";
import authorization_icon_lock from "../assets/authorization_icon_lock.svg";
import authorization_icon_yandex from "../assets/authorization_icon_yandex.svg";
import authorization_large_picture from "../assets/authorization_large_picture.svg";

const Authorization = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth(); 

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch('https://gateway.scan-interfax.ru/api/v1/account/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          login: username,
          password: password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('tokenExpire', data.expire);
        setIsLoggedIn(true);
        navigate('/');
      } else {
        throw new Error(data.message || 'Ошибка при входе');
      }
    } catch (error) {
      console.error('Ошибка аутентификации:', error);
      setUsernameError(true);
      setPasswordError(true);
    }
  };


  const validateUsername = (input) => {
    setUsernameError(false);
  };

  const validatePassword = (input) => {
    setPasswordError(false);
  };

  const handleUsernameChange = (e) => {
    const input = e.target.value;
    setUsername(input);
    validateUsername(input);
  };

  const handlePasswordChange = (e) => {
    const input = e.target.value;
    setPassword(input);
    validatePassword(input);
  };


  return (
    <div className="auth-content">
      <div className="text-and-picture">
        <h1 className="h1-auth-page">Для оформления подписки <br />на тариф, необходимо <br />авторизоваться.</h1>
        <img className="auth-large-image-desktop" src={authorization_large_picture} alt="People with key image" />
      </div>


      <div className="auth-block">
        <img className="auth-icon-lock" src={authorization_icon_lock} alt="Key image" />
        <div className="auth-form">
          <div className="tabs">
            <div className="tab active">Войти</div>
            <div className="tab"><a className="inactive" href="#">Зарегистрироваться</a></div>
          </div>

          <form onSubmit={handleLogin}>
            <div className="input">
              <label htmlFor="username">Логин или номер телефона:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleUsernameChange}
                required
                style={{ borderColor: usernameError ? 'red' : '' }}
              />
              {usernameError && <div className="auth-form-error">Введите корректные данные</div>}
            </div>

            <div className="input">
              <label htmlFor="password">Пароль:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                autocomplete="current-password" 
                required
                style={{ borderColor: passwordError ? 'red' : '' }}
              />
              {passwordError && <div className="auth-form-error">Введите правильный пароль</div>}
            </div>  

            <div className="auth-button-div">
              <button className="button auth-button" type="submit" disabled={!username || !password}>Войти</button>
            </div>  

            <a href="#" className="reset-password">Восстановить пароль</a>

          </form>

          <div className="auth-social-media">
            <p className="enter-with">Войти через:</p>
            <div className="social-buttons">
              <button><img src={authorization_icon_google} alt="Google" /></button>
              <button><img src={authorization_icon_facebook} alt="Facebook" /></button>
              <button><img src={authorization_icon_yandex} alt="Yandex" /></button>
            </div>
          </div>
        </div>
      </div>
      <img className="auth-large-image-mobile" src={authorization_large_picture} alt="People with key image" />
    </div>
  )
}


export default Authorization;
