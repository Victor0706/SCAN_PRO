import React from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/About.css';
import about_picture from "../assets/about_picture.svg"

const About = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const handleRequestDataClick = () => {
    if (isLoggedIn) {
      navigate('/search');
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="about-block">
      <div className="about-info-block">
        <h1 className="about-h1-box">Сервис по поиску<br />публикаций <br />о компании<br />по его ИНН</h1>
        <p className="about-p-box">Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.</p>
        {isLoggedIn && <button className="button" id="requestDataButton" onClick={handleRequestDataClick}>Запросить данные</button>}
      </div>
      <img className="about-image" src={about_picture} alt="About Scan image" />
    </div>
  )
}


export default About



            
            