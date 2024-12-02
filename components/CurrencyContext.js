import React, { createContext, useState, useContext } from 'react';
import { getExchangeRates } from './currencyApi'; 
const CurrencyContext = createContext();
export const useCurrency = () => useContext(CurrencyContext);


export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('USD'); 
  const [exchangeRates, setExchangeRates] = useState(null);

  const changeCurrency = async (newCurrency) => {
    setCurrency(newCurrency); 
    try {
      const rates = await getExchangeRates(newCurrency); 
      setExchangeRates(rates);
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, changeCurrency, exchangeRates }}>
      {children}
    </CurrencyContext.Provider>
  );
};
