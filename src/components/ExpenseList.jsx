import React from "react";
import ExpenseItem from "./ExpenseItem";

function ExpenseList({ expenses, onDeleteExpense }) {
  if (expenses.length === 0) {
    return <p className="empty-state">No expenses found for this filter.</p>;
  }

  return (
    <ul className="expense-list">
      {expenses.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} onDeleteExpense={onDeleteExpense} />
      ))}
    </ul>
  );
}

export default ExpenseList;
