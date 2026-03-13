import React from "react";

function ExpenseItem({ expense, onDeleteExpense }) {
  const date = new Date(expense.date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  return (
    <li className="expense-item">
      <div>
        <p className="title">{expense.title}</p>
        <p className="meta">
          {expense.category} | {date}
        </p>
      </div>
      <div className="amount-wrap">
        <span className="amount">Rs. {Number(expense.amount).toLocaleString("en-IN")}</span>
        <button type="button" className="delete-btn" onClick={() => onDeleteExpense(expense.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default ExpenseItem;
