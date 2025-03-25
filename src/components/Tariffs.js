import React from 'react';
import TariffCard from './TariffCard';
import '../styles/Tariffs.css';

import tariffs_icon_lamp from "../assets/tariffs_icon_lamp.svg"
import tariffs_icon_laptop from "../assets/tariffs_icon_laptop.svg"
import tariffs_icon_target from "../assets/tariffs_icon_target.svg"

const Tariffs = ({ isLoggedIn, userTariff }) => {
  return (
    <div className="tariffs-block">
      <h2>Наши тарифы</h2>
      <div className="tariffs-cards">
      <TariffCard
          name="Beginner"
          description="Для небольшого исследования"
          icon={tariffs_icon_lamp}
          colorClass="tariff-beginner-yellow"
          activeColorClass="tariff-beginner-yellow-active"
          isActive={userTariff === 'beginner'}
          isLoggedIn={isLoggedIn}
          textColorClass="black"
          price="799 ₽"
          oldPrice="1200 ₽"
          installmentText="или 150 ₽/мес. при рассрочке на 24 мес."
          features={["Безлимитная история запросов", "Безопасная сделка", "Поддержка 24/7"]}
      />
      <TariffCard
          name="Pro"
          description="Для HR и фрилансеров"
          icon={tariffs_icon_target}
          colorClass="tariff-pro-light-blue"
          activeColorClass="tariff-pro-light-blue-active"
          isActive={userTariff === 'pro'}
          isLoggedIn={isLoggedIn}
          textColorClass="black"
          price="1 299 ₽"
          oldPrice="2 600 ₽"
          installmentText="или 279 ₽/мес. при рассрочке на 24 мес."
          features={["Все пункты тарифа Beginner", "Экспорт истории", "Рекомендации по приоритетам"]}
      />
      <TariffCard
          name="Business"
          description="Для корпоративных клиентов"
          icon={tariffs_icon_laptop}
          colorClass="tariff-business-black"
          activeColorClass="tariff-business-black-active"
          isActive={userTariff === 'business'}
          isLoggedIn={isLoggedIn}
          textColorClass="white"
          price="2 379 ₽"
          oldPrice="3 700 ₽"
          installmentText=""
          features={["Все пункты тарифа Pro", "Безлимитное количество запросов", "Приоритетная поддержка"]}
      />
      </div>
    </div>
  )
}

export default Tariffs