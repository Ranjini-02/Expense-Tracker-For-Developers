import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const elements = Array.from(document.querySelectorAll("[data-reveal]"));
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );

    for (const element of elements) {
      element.classList.add("reveal");
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <main className="page-wrap lp">
      <section className="hero lp-hero" data-reveal>
        <div className="lp-hero-grid">
          <div className="lp-hero-copy">
            <p className="eyebrow">Expense Tracker for Developers</p>
            <h1>Track every rupee, without breaking flow.</h1>
            <p className="lp-lede">
              Subscriptions, snacks, internet, courses, and tools: keep it all in one clean dashboard built
              for dev life.
            </p>

            <div className="hero-actions">
              <Link className="btn btn-primary" to="/register">
                Create Account
              </Link>
              <Link className="btn btn-secondary" to="/dashboard">
                Open Dashboard
              </Link>
              <a className="btn btn-ghost" href="#features">
                See Features
              </a>
            </div>

            <nav className="lp-mini-nav" aria-label="Landing page sections">
              <a href="#features">Features</a>
              <a href="#workflow">Workflow</a>
              <a href="#faq">FAQ</a>
            </nav>

            <div className="lp-metrics" aria-label="Product highlights">
              <div className="lp-metric">
                <div className="lp-metric-k">7</div>
                <div className="lp-metric-l">built-in categories</div>
              </div>
              <div className="lp-metric">
                <div className="lp-metric-k">Local</div>
                <div className="lp-metric-l">stores in your browser</div>
              </div>
              <div className="lp-metric">
                <div className="lp-metric-k">Monthly</div>
                <div className="lp-metric-l">auto rollups</div>
              </div>
            </div>
          </div>

          <div className="lp-mock" aria-hidden="true">
            <div className="lp-mock-card">
              <div className="lp-mock-head">
                <div className="lp-mock-title">This month</div>
                <div className="lp-mock-pill">Local-first</div>
              </div>

              <div className="lp-mock-kpi">
                <div className="lp-ring" />
                <div>
                  <div className="lp-kpi">Rs. 6,780</div>
                  <div className="lp-kpi-sub">Total spend tracked</div>
                </div>
              </div>

              <ul className="lp-mock-list">
                <li>
                  <span className="lp-dot lp-dot-1" />
                  <span>Tools</span>
                  <strong>799</strong>
                </li>
                <li>
                  <span className="lp-dot lp-dot-2" />
                  <span>Learning</span>
                  <strong>1,499</strong>
                </li>
                <li>
                  <span className="lp-dot lp-dot-3" />
                  <span>Internet</span>
                  <strong>799</strong>
                </li>
                <li>
                  <span className="lp-dot lp-dot-4" />
                  <span>Food</span>
                  <strong>1,220</strong>
                </li>
              </ul>

              <div className="lp-mock-foot">
                <div className="lp-chip">Filter: Tools</div>
                <div className="lp-chip">Rollup: Monthly</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="lp-strip card" data-reveal>
        <p className="lp-strip-title">Perfect for the small-but-constant stuff</p>
        <div className="lp-strip-row" aria-label="Common developer expenses">
          <span className="lp-tag">GitHub Copilot</span>
          <span className="lp-tag">Cloud credits</span>
          <span className="lp-tag">Cafes</span>
          <span className="lp-tag">Courses</span>
          <span className="lp-tag">Domain renewals</span>
          <span className="lp-tag">Plugins</span>
        </div>
      </section>

      <section id="features" className="lp-section" data-reveal>
        <header className="lp-section-head">
          <h2>Everything you need, nothing you don’t</h2>
          <p className="subtitle">Capture spend fast, filter it cleanly, and see totals instantly.</p>
        </header>

        <div className="lp-feature-grid">
          <article className="card lp-feature">
            <div className="lp-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2v6m0 8v6M4 12h6m4 0h6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h3>Fast add</h3>
            <p>Add an expense with title, amount, category, and date. No clutter.</p>
          </article>

          <article className="card lp-feature">
            <div className="lp-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 7h16M7 12h10M10 17h4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h3>Category filters</h3>
            <p>Slice spend by Tools, Food, Internet, Learning, and more.</p>
          </article>

          <article className="card lp-feature">
            <div className="lp-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 19V5m0 14h16M8 15l3-3 3 2 4-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3>Monthly rollups</h3>
            <p>See your spending by month to spot patterns and adjust budgets.</p>
          </article>

          <article className="card lp-feature">
            <div className="lp-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 8h10M7 12h10M7 16h6M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h3>Readable lists</h3>
            <p>Clean expense rows with date + category so it’s easy to audit.</p>
          </article>

          <article className="card lp-feature">
            <div className="lp-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 6v6l4 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3>Quick habits</h3>
            <p>Designed to be used daily: add in seconds, review in minutes.</p>
          </article>

          <article className="card lp-feature">
            <div className="lp-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 1l3 6 7 .8-5 4.6 1.5 6.9L12 16.9 5.5 19.3 7 12.4 2 7.8 9 7l3-6Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3>Lightweight</h3>
            <p>No heavy setup. Your data stays in your browser (localStorage).</p>
          </article>
        </div>
      </section>

      <section id="workflow" className="lp-section" data-reveal>
        <header className="lp-section-head">
          <h2>A workflow that actually sticks</h2>
          <p className="subtitle">Three steps: capture, filter, review. Repeat.</p>
        </header>

        <ol className="lp-steps">
          <li className="card lp-step">
            <div className="lp-step-n">1</div>
            <div className="lp-step-body">
              <h3>Capture quickly</h3>
              <p>Add an expense as soon as you buy a tool, course, or meal.</p>
            </div>
          </li>
          <li className="card lp-step">
            <div className="lp-step-n">2</div>
            <div className="lp-step-body">
              <h3>Filter with intent</h3>
              <p>Check a category like Learning to see where your budget goes.</p>
            </div>
          </li>
          <li className="card lp-step">
            <div className="lp-step-n">3</div>
            <div className="lp-step-body">
              <h3>Review monthly</h3>
              <p>Use monthly totals to plan renewals, upgrades, and next purchases.</p>
            </div>
          </li>
        </ol>
      </section>

      <section className="lp-section" data-reveal>
        <header className="lp-section-head">
          <h2>Built for dev realities</h2>
          <p className="subtitle">Subscriptions stack up. Learning never ends. This keeps it visible.</p>
        </header>

        <div className="lp-quote-grid">
          <figure className="card lp-quote">
            <blockquote>
              “I finally stopped underestimating my ‘tiny’ spend. The monthly rollups make renewals obvious.”
            </blockquote>
            <figcaption>
              <span className="lp-quote-name">Frontend dev</span>
              <span className="lp-quote-meta">Tracking tools + learning</span>
            </figcaption>
          </figure>
          <figure className="card lp-quote">
            <blockquote>“Fast enough that I actually use it. I add expenses while my coffee is brewing.”</blockquote>
            <figcaption>
              <span className="lp-quote-name">Student</span>
              <span className="lp-quote-meta">Courses + cafes</span>
            </figcaption>
          </figure>
          <figure className="card lp-quote">
            <blockquote>“Clean list, clear totals. It’s the simplest way to keep my dev budget honest.”</blockquote>
            <figcaption>
              <span className="lp-quote-name">Indie builder</span>
              <span className="lp-quote-meta">Plugins + renewals</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="faq" className="lp-section" data-reveal>
        <header className="lp-section-head">
          <h2>FAQ</h2>
          <p className="subtitle">Short answers to the common questions.</p>
        </header>

        <div className="lp-faq-grid">
          <details className="card lp-faq">
            <summary>Where is my data stored?</summary>
            <p>In your browser via localStorage. It stays on your device.</p>
          </details>
          <details className="card lp-faq">
            <summary>Does it work offline?</summary>
            <p>Yes. Once loaded, you can add and review expenses without an internet connection.</p>
          </details>
          <details className="card lp-faq">
            <summary>Can I delete an entry?</summary>
            <p>Yes. Every expense row has a delete button.</p>
          </details>
          <details className="card lp-faq">
            <summary>Is there a best way to use it?</summary>
            <p>Track daily, filter weekly, and do a quick monthly review for renewals and upgrades.</p>
          </details>
        </div>
      </section>

      <section className="lp-cta" data-reveal>
        <div className="lp-cta-inner">
          <h2>Start tracking today</h2>
          <p className="lp-cta-sub">
            Spend 2 minutes setting up, then get instant clarity on your developer budget.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/register">
              Create Account
            </Link>
            <Link className="btn btn-secondary" to="/dashboard">
              Open Dashboard
            </Link>
            <Link className="btn btn-ghost" to="/content">
              Read Tips
            </Link>
          </div>
        </div>
      </section>

      <footer className="lp-footer">
        <div className="lp-footer-grid">
          <div>
            <div className="brand lp-brand">DevExpense</div>
            <p className="lp-footnote">
              A lightweight expense tracker for developers. Local-first and built to stay out of your way.
            </p>
          </div>
          <nav className="lp-footnav" aria-label="Footer links">
            <a href="#features">Features</a>
            <a href="#workflow">Workflow</a>
            <a href="#faq">FAQ</a>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/content">Content</Link>
          </nav>
        </div>

        <p className="lp-copy">© {new Date().getFullYear()} DevExpense</p>
      </footer>
    </main>
  );
}

export default LandingPage;
