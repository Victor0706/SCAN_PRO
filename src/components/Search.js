import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

import '../styles/Search.css';
import CompanyINN from './CompanyINN';
import Tonality from './Tonality';
import DocumentCount from './DocumentCount';
import DateInput from './DateInput';
import CheckboxBlock from './CheckboxBlock';

import search_page_large_picture from "../assets/search_page_large_picture.svg"
import search_page_small_picture_folders from "../assets/search_page_small_picture_folders.svg"
import search_page_small_picture_sheet from "../assets/search_page_small_picture_sheet.svg"

const Search = () => {
  const [companyINN, setCompanyINN] = useState('');
  const [tonality, setTonality] = useState('Любая');
  const [documentCount, setDocumentCount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [checkboxStates, setCheckboxStates] = useState({
    maxCompleteness: false,
    businessMentions: false,
    mainRole: false,
    riskFactorsOnly: false,
    includeMarketNews: true, 
    includeAnnouncements: true,
    includeNewsSummaries: true,
  });

  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/auth');
    }
  }, [isLoggedIn, navigate]);

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    
    const isValid = companyINN && documentCount && startDate && endDate;
    setIsFormValid(isValid);
  }, [companyINN, documentCount, startDate, endDate, checkboxStates]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxStates(prevState => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    let apiTonality;
    switch (tonality) {
      case 'Любая':
        apiTonality = 'any';
        break;
      case 'Позитивная':
        apiTonality = 'positive';
        break;
      case 'Негативная':
        apiTonality = 'negative';
        break;
      default:
        apiTonality = 'any';
    }
  
    if (isFormValid) {
      
      const searchParams = {
        issueDateInterval: {
          startDate: `${startDate}T00:00:00+03:00`,
          endDate: `${endDate}T23:59:59+03:00`
        },
        searchContext: {
          targetSearchEntitiesContext: {
            targetSearchEntities: [{
              type: "company",
              inn: companyINN,
              maxFullness: checkboxStates.maxCompleteness,
            }],
            onlyMainRole: checkboxStates.mainRole,
            tonality: apiTonality,
            onlyWithRiskFactors: checkboxStates.riskFactorsOnly,
          }
        },
        attributeFilters: {
          excludeTechNews: !checkboxStates.includeMarketNews,
          excludeAnnouncements: !checkboxStates.includeAnnouncements,
          excludeDigests: !checkboxStates.includeNewsSummaries,
        },
        limit: Number(documentCount),
        sortType: "sourceInfluence",
        sortDirectionType: "desc",
        intervalType: "month",
        histogramTypes: ["totalDocuments", "riskFactors"]
      };
  
      console.log('Отправка запроса на сервер с данными:', searchParams);
  
      navigate('/results', { state: { searchParams: searchParams } });
    } else {
      console.log('Форма не валидна, перенаправление не выполнено.');
    }
  };
  

  return (
    <div className="search-content">

      <div className="search-title-block">
        <div className="search-title-text">
          <h1 className="h1-search-page">Найдите необходимые <br />данные в пару кликов.</h1>
          <p className="p-search-page-title-block">Задайте параметры поиска. <br />Чем больше заполните, тем точнее поиск</p>
        </div>
        <img className="search-page-small-picture-sheet" src={search_page_small_picture_sheet} alt="Paper image" />
        <img className="search-page-small-picture-folders" src={search_page_small_picture_folders} alt="Folderds image" />
      </div>

      <div className="search-block">
        <form onSubmit={handleSubmit} className="search-form">

          <div className="left-part-search-form">
            <CompanyINN companyINN={companyINN} setCompanyINN={setCompanyINN} />
            <Tonality tonality={tonality} setTonality={setTonality} />
            <DocumentCount documentCount={documentCount} setDocumentCount={setDocumentCount} />
            <DateInput startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
          </div>

          <div className="right-part-search-form">
            <CheckboxBlock checkboxStates={checkboxStates} handleCheckboxChange={handleCheckboxChange} />
            <div className="right-part-submit-button-block">
              <button className="button2" type="submit" disabled={!isFormValid}>Поиск</button>
              <p className="star-message">* Обязательные к заполнению поля</p>
            </div>
          </div>

        </form>

        <img className="search-page-large-picture" src={search_page_large_picture} alt="Search image" />
      </div>  
    </div>
  );
};

export default Search;