import React from 'react';
import '../styles/Main.css';
import About from "./About";
import WhyUs from "./WhyUs";
import Tariffs from "./Tariffs";

const Main = ({ isLoggedIn, userTariff }) => {
  return (
    <div className="main-content">
        <About isLoggedIn={isLoggedIn} />
        <WhyUs />
        <Tariffs isLoggedIn={isLoggedIn} userTariff={userTariff} />
    </div>
  )
}

export default Main