import React, { useState, useEffect } from 'react';
import '../styles/UserActions.css';
import loading_icon from '../assets/loading_icon.svg';

const UserActions = () => {
    const [usedCompanyCount, setUsedCompanyCount] = useState(0);
    const [companyLimit, setCompanyLimit] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchCompanyInfo = async () => {
            setIsLoading(true); 
            const url = 'https://gateway.scan-interfax.ru/api/v1/account/info';
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setUsedCompanyCount(data.eventFiltersInfo.usedCompanyCount);
                setCompanyLimit(data.eventFiltersInfo.companyLimit);
            } catch (error) {
                console.error("Ошибка при получении информации о компаниях:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCompanyInfo();
        
         const intervalId = setInterval(fetchCompanyInfo, 60000);

         
         return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="user-actions-rectangle">
            {isLoading ? (
                <img src={loading_icon} alt="Loading" className="loading-icon" />
            ) : (
                <div className="user-actions-data">
                    <div className="action-item">Использовано компаний</div>
                    <div className="number-item used-companies-number">{usedCompanyCount}</div>
                    <div className="action-item">Лимит по компаниям</div>
                    <div className="number-item limit-companies-number">{companyLimit}</div>
                </div>
            )}
        </div>
    );
};

export default UserActions;
