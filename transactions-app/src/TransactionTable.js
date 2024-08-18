import React from 'react';

const TransactionTable = ({ transactions, onDelete, onSort, sortConfig }) => {
  const getSortDirection = (key) => {
    if (!sortConfig || sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? '▲' : '▼';
  };

  return (
    <table>
      <thead>
        <tr>
          <th>
            <button type="button" onClick={() => onSort('description')}>
              Description {getSortDirection('description')}
            </button>
          </th>
          <th>
            <button type="button" onClick={() => onSort('category')}>
              Category {getSortDirection('category')}
            </button>
          </th>
          <th>Amount</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
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
