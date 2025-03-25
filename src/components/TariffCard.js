import React from 'react';
import '../styles/TariffCard.css';
import tariffs_green_checkbox_icon from "../assets/tariffs_green_checkbox_icon.svg";

const TariffCard = ({ 
    name, 
    description, 
    icon, 
    colorClass, 
    activeColorClass, 
    isActive,
    isLoggedIn,
    textColorClass,
    price, 
    oldPrice, 
    installmentText,
    features 
}) => {
    return (
        <div className={`tariff-card ${isActive && isLoggedIn ? activeColorClass : ''}`}>
            
            <div className={`tariff-colored-block ${colorClass}`}>
                <div className="tariff-name-block">
                    <h3 style={{ color: `var(--scan-${textColorClass})` }}>{name}</h3>
                    <p style={{ color: `var(--scan-${textColorClass})` }} >{description}</p>
                </div>
                <div className="tarif-icon-block">
                    <img className="tariff-icon" src={icon} alt={`${name} icon`} />
                </div>
            </div>

            <div className="your-tariff-block">
                {isActive && isLoggedIn && (
                    <div className="your-tariff-badge">Текущий тариф</div>
                )}    
            </div>

            <div className="tariff-card-text-block">
                <div className="tariff-price-block">
                    <div className="tariff-prices">
                        <h3>{price}</h3>
                        <p className="last-price-tag">{oldPrice}</p>
                    </div>
                </div>
                <p className="installment-text">{installmentText}</p>
            </div>    
            

            <div className="tariff-to-include">
                <p className="card-text-20px">В тариф входит:</p>
                {features.map((feature, index) => (
                    <div key={index} className="tariff-to-include-lines">
                        <img className="green-checkbox" src={tariffs_green_checkbox_icon} alt="checkbox" />
                        <p className="card-text">{feature}</p>
                    </div>
                ))}
                <div className='tariff-button-div'>
                {isActive && isLoggedIn 
                    ? <button className="button-tariffs grey center" id="requestDataButton">Перейти в личный кабинет</button>
                    : <button className="button-tariffs center" id="requestDataButton">Подробнее</button>
                }
                </div>
            </div>
        </div>
    );
};

export default TariffCard;