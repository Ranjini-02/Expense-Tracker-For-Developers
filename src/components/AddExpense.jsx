import React from "react";
import { useState } from "react";

const initialState = {
  title: "",
  amount: "",
  category: "Tools",
  date: ""
};

function AddExpense({ onAddExpense, categories }) {
  const [expense, setExpense] = useState(initialState);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setExpense((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const amountValue = Number(expense.amount);

    if (!expense.title.trim() || !expense.date || !expense.category || amountValue <= 0) {
      setError("Enter valid title, amount, category, and date.");
      return;
    }

    onAddExpense({
      title: expense.title.trim(),
      amount: amountValue,
      category: expense.category,
      date: expense.date
    });

    setExpense(initialState);
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <label>
        Expense Name
        <input
          type="text"
          name="title"
          value={expense.title}
          onChange={handleChange}
          placeholder="VS Code Extension"
        />
      </label>

      <label>
        Amount (INR)
        <input
          type="number"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
          placeholder="500"
          min="1"
        />
      </label>

      <label>
        Category
        <select name="category" value={expense.category} onChange={handleChange}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <label>
        Date
        <input type="date" name="date" value={expense.date} onChange={handleChange} />
      </label>

      {error ? <p className="error">{error}</p> : null}
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default AddExpense;
