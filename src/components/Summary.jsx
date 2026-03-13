import React from "react";

function Summary({ total, monthlySummary }) {
  const monthEntries = Object.entries(monthlySummary).sort((a, b) => {
    const [aMonth] = a;
    const [bMonth] = b;
    return new Date(`1 ${bMonth}`).getTime() - new Date(`1 ${aMonth}`).getTime();
  });

  return (
    <section className="summary">
      <h2>Summary</h2>
      <p className="total">
        Filtered Total: <strong>Rs. {total.toLocaleString("en-IN")}</strong>
      </p>

      <h3>Monthly Spending</h3>
      {monthEntries.length === 0 ? (
        <p className="empty-state">No monthly data yet.</p>
      ) : (
        <ul className="month-list">
          {monthEntries.map(([month, amount]) => (
            <li key={month}>
              <span>{month}</span>
              <strong>Rs. {amount.toLocaleString("en-IN")}</strong>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Summary;
