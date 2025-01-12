import React from 'react';
import CurrencyConverter from './components/CurrencyConverter';
import './App.css';

function App() {
  return (
    <div className="app">
      <header>
        <h1>Currency Converter</h1>
      </header>
      <main>
        <CurrencyConverter />
      </main>
      <footer>
        <p>Exchange rates updated every hour</p>
      </footer>
    </div>
  );
}

export default App;