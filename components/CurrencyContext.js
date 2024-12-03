import React, { createContext, useState, useContext } from 'react';
import { getExchangeRates } from './currencyApi'; // Your currency API

// Create Currency Context
const CurrencyContext = createContext();

// Custom hook to use the currency context
export const useCurrency = () => useContext(CurrencyContext);

// CurrencyProvider component to wrap the app and provide currency globally
export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('USD'); // Default currency is USD
  const [exchangeRates, setExchangeRates] = useState(null);

  const changeCurrency = async (newCurrency) => {
    setCurrency(newCurrency); // Update global currency
    try {
      const rates = await getExchangeRates(newCurrency); // Fetch exchange rates using the selected currency
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
