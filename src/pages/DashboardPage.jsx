import React, { useEffect, useMemo, useState } from "react";
import AddExpense from "../components/AddExpense";
import ExpenseList from "../components/ExpenseList";
import Filter from "../components/Filter";
import Summary from "../components/Summary";

const STORAGE_KEY = "expenses";
const CATEGORIES = ["Tools", "Food", "Internet", "Learning", "Entertainment", "Travel", "Other"];

function DashboardPage() {
  const [expenses, setExpenses] = useState(() => {
    try {
      const storedExpenses = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      return Array.isArray(storedExpenses) ? storedExpenses : [];
    } catch {
      return [];
    }
  });

  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (newExpense) => {
    setExpenses((prev) => [{ id: crypto.randomUUID(), ...newExpense }, ...prev]);
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  const filteredExpenses = useMemo(() => {
    if (selectedCategory === "All") return expenses;
    return expenses.filter((expense) => expense.category === selectedCategory);
  }, [expenses, selectedCategory]);

  const totalExpense = useMemo(
    () => filteredExpenses.reduce((total, item) => total + Number(item.amount), 0),
    [filteredExpenses]
  );

  const monthlySummary = useMemo(() => {
    return expenses.reduce((acc, expense) => {
      const date = new Date(expense.date);
      if (Number.isNaN(date.getTime())) return acc;
      const key = date.toLocaleString("en-IN", { month: "long", year: "numeric" });
      acc[key] = (acc[key] || 0) + Number(expense.amount);
      return acc;
    }, {});
  }, [expenses]);

  return (
    <main className="page-wrap">
      <section className="card">
        <h1>Dashboard</h1>
        <p className="subtitle">Add and monitor your developer expenses.</p>
        <AddExpense onAddExpense={addExpense} categories={CATEGORIES} />
      </section>

      <section className="card">
        <Filter
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <ExpenseList expenses={filteredExpenses} onDeleteExpense={deleteExpense} />
        <Summary total={totalExpense} monthlySummary={monthlySummary} />
      </section>
    </main>
  );
}

export default DashboardPage;
