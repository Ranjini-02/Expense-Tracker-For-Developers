import React from "react";

const posts = [
  {
    title: "How to Budget for Dev Tools",
    description: "Set a fixed monthly budget for subscriptions and review renewals every quarter."
  },
  {
    title: "Learning Spend Strategy",
    description: "Track your course purchases and map them to skills you actively apply at work."
  },
  {
    title: "Cut Hidden Expenses",
    description: "Audit small recurring payments like cloud trials and plugin add-ons."
  }
];

function ContentPage() {
  return (
    <main className="page-wrap">
      <section className="card">
        <h1>Content</h1>
        <p className="subtitle">Developer finance tips and budgeting ideas.</p>
        <div className="content-grid">
          {posts.map((post) => (
            <article className="content-card" key={post.title}>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default ContentPage;
