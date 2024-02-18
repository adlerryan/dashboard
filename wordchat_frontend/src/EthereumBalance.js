import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EthereumBalance.css'; // Ensure the CSS file name matches

const cryptos = [
  { name: 'ethereum', coins: 2.17372153, averageCost: 2892.95 },
  { name: 'bitcoin', coins: 0.004671, averageCost: 20769.59 },
  { name: 'cardano', coins: 419.17, averageCost: 1.22 },
  { name: 'solana', coins: 2.67, averageCost: 35.93 }
];

const CryptoBalance = () => {
  const [cryptoData, setCryptoData] = useState({});
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    cryptos.forEach(crypto => {
      fetchCryptoPrice(crypto.name);
    });
  }, []);

  const fetchCryptoPrice = async (cryptoName) => {
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoName}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`);
      setCryptoData(prevState => ({ ...prevState, [cryptoName]: response.data[cryptoName] }));
    } catch (error) {
      console.error(`Error fetching ${cryptoName} price:`, error);
    }
  };

  const renderTableData = () => {
    return cryptos.map(crypto => {
      const data = cryptoData[crypto.name];
      if (data) {
        const currentBalance = crypto.coins * data.usd;
        const totalCost = crypto.averageCost * crypto.coins;
        const profitLoss = currentBalance - totalCost;
        const profitLossPercent = (profitLoss / totalCost) * 100;
        const profitLossClass = profitLoss >= 0 ? 'profit' : 'loss';

        return (
          <tr key={crypto.name}>
            <td>{crypto.name.toUpperCase()}</td>
            <td>${parseFloat(data.usd).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
            <td>${parseFloat(currentBalance.toFixed(2)).toLocaleString()}</td>
            <td className={profitLossClass}>${parseFloat(profitLoss.toFixed(2)).toLocaleString()} ({profitLossPercent.toFixed(2)}%)</td>
            <td>{data.usd_24h_change ? `${parseFloat(data.usd_24h_change.toFixed(2)).toLocaleString()}%` : ''}</td>
          </tr>
        );
      }
      return null;
    });
  };

  const renderTotalsRow = () => {
    const totalBalance = cryptos.reduce((acc, crypto) => {
      const data = cryptoData[crypto.name];
      return data ? acc + (crypto.coins * data.usd) : acc;
    }, 0);
  
    const totalProfitLoss = cryptos.reduce((acc, crypto) => {
      const data = cryptoData[crypto.name];
      if (data) {
        const currentBalance = crypto.coins * data.usd;
        const totalCost = crypto.averageCost * crypto.coins;
        return acc + (currentBalance - totalCost);
      }
      return acc;
    }, 0);
    const totalClass = totalProfitLoss >= 0 ? 'profit' : 'loss';
  
    return (
      <tr>
        <td colSpan="2" className="total-row">Total</td>
        <td className="total-row">${parseFloat(totalBalance.toFixed(2)).toLocaleString()}</td>
        <td className={`total-row ${totalClass}`}>${parseFloat(totalProfitLoss.toFixed(2)).toLocaleString()}</td>
        <td className="total-row"></td> {/* Empty cell for the 24hr change column */}
      </tr>
    );
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className="crypto-container">
      <div className="crypto-header" onClick={toggleMinimize}>
        {isMinimized ? 'Show Crypto Portfolio' : 'Hide Crypto Portfolio'}
      </div>
      {!isMinimized && (
        <div className="crypto-balance-area">
          <table>
            <thead>
              <tr>
                <th>Coin</th>
                <th>Current Price</th>
                <th>Balance</th>
                <th>Profit/Loss</th>
                <th>24hr Change</th>
              </tr>
            </thead>
            <tbody>
              {renderTableData()}
              {renderTotalsRow()}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CryptoBalance;
