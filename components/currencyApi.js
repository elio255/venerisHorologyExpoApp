import axios from 'axios';

const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD'; // Replace USD with your desired base currency if needed

/**
 * Fetch the latest exchange rates
 * @returns {Promise<object>} - Returns exchange rates
 */
export const getExchangeRates = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.rates; // Return the rates object
  } catch (error) {
    console.error('Error fetching currency exchange rates:', error);
    throw error;
  }
};
