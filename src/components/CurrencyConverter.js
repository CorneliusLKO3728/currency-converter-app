import React, { useState, useEffect } from 'react';
import CurrencySelect from './CurrencySelect';
import './CurrencyConverter.css';
import { Loader2 } from 'lucide-react';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch exchange rates');
        }
        
        const data = await response.json();
        setExchangeRate(data.rates[toCurrency]);
        setLastUpdated(new Date().toLocaleTimeString());
      } catch (err) {
        setError('Failed to fetch exchange rates. Please try again later.');
        console.error('Error fetching exchange rates:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const convertedAmount = amount && exchangeRate 
    ? (parseFloat(amount) * exchangeRate).toFixed(2) 
    : null;

  return (
    <div className="converter-container">
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="converter-form">
        <div className="input-group">
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            step="0.01"
            placeholder="Enter amount"
          />
        </div>

        <div className="currency-group">
          <div className="currency-select">
            <label>From</label>
            <CurrencySelect
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            />
          </div>

          <button 
            className="swap-button"
            onClick={handleSwapCurrencies}
          >
            ⇄
          </button>

          <div className="currency-select">
            <label>To</label>
            <CurrencySelect
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            />
          </div>
        </div>

        <div className="result-container">
          {loading ? (
            <div className="loading">
              <Loader2 className="spinner" />
              Loading rates...
            </div>
          ) : (
            <>
              <div className="conversion-result">
                <p className="amount">{convertedAmount} {toCurrency}</p>
                <p className="rate">1 {fromCurrency} = {exchangeRate?.toFixed(4)} {toCurrency}</p>
              </div>
              {lastUpdated && (
                <p className="update-time">Last updated: {lastUpdated}</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
