import React from 'react';

import React, { useState } from 'react';

const TransactionTable = ({ transactions, onDelete }) => {
  const [sortConfig, setSortConfig] = useState(null);

  const sortedTransactions = React.useMemo(() => {
    let sortableTransactions = [...transactions];
    if (sortConfig !== null) {
      sortableTransactions.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableTransactions;
  }, [transactions, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <table>
      <thead>
        <tr>
          <th>
            <button type="button" onClick={() => requestSort('description')}>
              Description
            </button>
          </th>
          <th>
            <button type="button" onClick={() => requestSort('category')}>
              Category
            </button>
          </th>
          <th>Amount</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortedTransactions.map((transaction) => (
          <tr key={transaction.id}>
            <td>{transaction.description}</td>
            <td>{transaction.category}</td>
            <td>{transaction.amount}</td>
            <td>
              <button onClick={() => onDelete(transaction.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;
