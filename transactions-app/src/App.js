import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import TransactionTable from './TransactionTable';
import TransactionForm from './TransactionForm';
import SearchBar from './SearchBar';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:8001/transactions')
      .then((response) => response.json())
      .then((data) => setTransactions(data));
  }, []);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div>
      <h1>Transactions</h1>
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      <TransactionForm onAddTransaction={addTransaction} />
      <TransactionTable transactions={filteredTransactions} onDelete={deleteTransaction} />
    </div>
  );
};

export default App;
