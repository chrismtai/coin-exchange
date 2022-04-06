import React, { useState, useEffect } from "react";
import CoinList from "./components/CoinList/CoinList";
import AccountBalance from "./components/AccountBalance/AccountBalance";
import ExchangeHeader from "./components/ExchangeHeader/ExchangeHeader";
import styled from "styled-components";
import axios from "axios";

const Div = styled.div`
  text-align: center;
  background-color: rgb(33, 63, 109);
  color: white;
`;

const COIN_COUNT = 10;
const formatPrice = (price) => parseFloat(Number(price).toFixed(4));

export default function App(props) {
  const [balance, setBalance] = useState(10000);
  const [showBalance, setShowbalance] = useState(true);
  const [coinData, setCoinData] = useState([]);

  const componentDidMount = async () => {
    const response = await axios.get("https://api.coinpaprika.com/v1/coins/");
    const coinIds = response.data.slice(0, COIN_COUNT).map((coin) => coin.id);
    // retrieve the prices
    const tickerUrl = "https://api.coinpaprika.com/v1/tickers/";
    const promises = coinIds.map((id) => axios.get(tickerUrl + id));
    const coinData = await Promise.all(promises);
    const coinPriceData = coinData.map(function (response) {
      const coin = response.data;
      return {
        key: coin.id,
        name: coin.name,
        ticker: coin.symbol,
        balance: 0,
        price: formatPrice(coin.quotes.USD.price),
      };
    });

    setCoinData(coinPriceData);
  };

  // componentDidMount and componentDidUpdate
  useEffect(function () {
    if (coinData.length == 0) {
      componentDidMount();
    }
  });

  const handleBalance = () => {
    setShowbalance((oldValue) => !oldValue);
  };

  const handleRefresh = async (tickerId) => {
    const response = await axios.get(
      `https://api.coinpaprika.com/v1/tickers/${tickerId}` // use back ticks instead
    );

    const newCoinData = coinData.map((values) => {
      let newValues = { ...values };
      if (tickerId === values.key) {
        newValues.price = parseFloat(
          formatPrice(response.data.quotes.USD.price)
        );
      }
      return newValues;
    });

    setCoinData(newCoinData);
  };

  return (
    <Div>
      <ExchangeHeader />
      <AccountBalance
        amount={balance}
        showBalance={showBalance}
        handleBalance={handleBalance}
      />
      <CoinList
        coinData={coinData}
        handleRefresh={handleRefresh}
        showBalance={showBalance}
      />
    </Div>
  );
}
