"use client";

import { useEffect, useState } from "react";

const scanSteps = [
  {
    label: "Scope verified",
    detail: "juice-shop.local · repository + lab only",
    tag: "POLICY",
  },
  {
    label: "Trusted scanners completed",
    detail: "Semgrep · Gitleaks · OSV · ZAP",
    tag: "SCAN",
  },
  {
    label: "Findings correlated",
    detail: "8 signals → 3 unique candidates",
    tag: "TRIAGE",
  },
  {
    label: "Critical issue verified",
    detail: "Evidence captured · reproduction bounded",
    tag: "PROOF",
  },
  {
    label: "External request blocked",
    detail: "example.com is outside the signed scope",
    tag: "GUARD",
  },
];

const workflow = [
  ["01", "Authorize", "Define ownership, allowed targets, budgets, and actions before anything runs."],
  ["02", "Isolate", "Recreate the application inside a disposable lab with strict network and resource limits."],
  ["03", "Inspect", "Coordinate proven scanners instead of trying to reinvent vulnerability detection."],
  ["04", "Verify", "Turn scanner signals into reproducible, evidence-backed findings—or reject them."],
  ["05", "Remediate", "Propose a human-approved fix, retest it, and preserve the before-and-after proof."],
];

const tools = [
  ["Semgrep", "Code analysis"],
  ["Gitleaks", "Secret detection"],
  ["OSV-Scanner", "Dependencies"],
  ["OWASP ZAP", "Web testing"],
  ["OPA", "Policy decisions"],
  ["Podman", "Isolation"],
  ["SARIF", "Finding exchange"],
  ["CycloneDX", "Component evidence"],
];

export default function Home() {
  const [run, setRun] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let index = reducedMotion ? scanSteps.length - 1 : 0;
    const resetTimer = window.setTimeout(() => setActiveStep(index), 0);
    if (reducedMotion) return () => window.clearTimeout(resetTimer);

    const timer = window.setInterval(() => {
      index += 1;
      setActiveStep(Math.min(index, scanSteps.length - 1));
      if (index >= scanSteps.length - 1) window.clearInterval(timer);
    }, 720);

    return () => {
      window.clearTimeout(resetTimer);
      window.clearInterval(timer);
    };
  }, [run]);

  return (
    <main>
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className="site-header" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Vitality home">
          <span>Vitality</span>
        </a>
        <nav>
          <a href="#product">Product</a>
          <a href="#workflow">Workflow</a>
          <a href="#architecture">Architecture</a>
          <a href="#stack">Open source</a>
        </nav>
        <a className="nav-cta" href="/app">Open the app <span aria-hidden="true">↗</span></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="hero-copy" id="main-content">
          <div className="eyebrow"><span /> Authorized environments only</div>
          <h1>Security testing that can prove it stayed in bounds.</h1>
          <p className="hero-lede">
            Vitality coordinates trusted security tools inside an isolated lab,
            verifies what they find, and retests human-approved fixes—without
            giving an AI unrestricted access.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="/app">Launch Vitality <span aria-hidden="true">↗</span></a>
            <a className="button button-secondary" href="#architecture">View architecture</a>
          </div>
          <div className="trust-row" aria-label="Product safeguards">
            <span><i aria-hidden="true">✓</i> No public scanning</span>
            <span><i aria-hidden="true">✓</i> Approval-gated changes</span>
            <span><i aria-hidden="true">✓</i> Evidence for every claim</span>
          </div>
        </div>

        <div className="hero-product" id="demo" aria-label="Vitality validation run preview">
          <div className="window-bar">
            <div className="window-dots" aria-hidden="true"><span /><span /><span /></div>
            <span>Validation run</span>
            <span className="run-complete"><i /> Complete</span>
          </div>
          <div className="product-head">
            <div>
              <span className="micro-label">ENGAGEMENT / LAB-042</span>
              <h2>Juice Shop validation</h2>
            </div>
            <div className="score-ring" aria-label="Security score 82 out of 100">
              <strong>82</strong><small>/100</small>
            </div>
          </div>
          <div className="scope-strip">
            <span className="scope-icon" aria-hidden="true">⌁</span>
            <div><small>Signed scope</small><strong>juice-shop.local</strong></div>
            <span className="verified-chip">Verified</span>
          </div>
          <div className="scan-list" aria-live="polite">
            {scanSteps.map((step, index) => (
              <div className={`scan-row ${index <= activeStep ? "is-complete" : ""}`} key={step.label}>
                <span className="step-state" aria-hidden="true">{index <= activeStep ? "✓" : ""}</span>
                <div className="scan-copy"><strong>{step.label}</strong><small>{step.detail}</small></div>
                <span className="scan-tag">{step.tag}</span>
              </div>
            ))}
          </div>
          <div className="progress-track" aria-hidden="true"><span style={{ width: `${((activeStep + 1) / scanSteps.length) * 100}%` }} /></div>
          <div className="product-footer">
            <div className="result-summary">
              <span><strong>1</strong> verified</span>
              <span><strong>2</strong> candidates</span>
              <span><strong>0</strong> violations</span>
            </div>
            <button className="replay-button" type="button" onClick={() => setRun((value) => value + 1)}>
              <span aria-hidden="true">↻</span> Replay
            </button>
          </div>
        </div>
      </section>

      <section className="statement section-shell" id="product">
        <p className="section-kicker">The product</p>
        <h2>A control layer for security validation. <span>Not another scanner.</span></h2>
        <p className="statement-copy">
          Mature tools already detect vulnerabilities. Vitality makes their work safer and more useful by connecting authorization, execution, evidence, remediation, and retesting in one auditable path.
        </p>
        <div className="value-grid">
          <article>
            <span className="value-number">01</span>
            <h3>Orchestrates</h3>
            <p>Selects the right established tool for each approved check and keeps every run within budget.</p>
          </article>
          <article>
            <span className="value-number">02</span>
            <h3>Verifies</h3>
            <p>Separates scanner guesses from findings that have reproducible evidence and a clear confidence state.</p>
          </article>
          <article>
            <span className="value-number">03</span>
            <h3>Closes the loop</h3>
            <p>Proposes a reviewable fix, retests it, and records whether the issue was fixed, regressed, or accepted.</p>
          </article>
        </div>
      </section>

      <section className="workflow-section" id="workflow">
        <div className="section-shell workflow-layout">
          <div className="workflow-intro">
            <p className="section-kicker light">One authorized path</p>
            <h2>From permission to proof.</h2>
            <p>Every stage has an entry condition, an action budget, an expected output, and a safe stop.</p>
            <div className="policy-note">
              <span className="policy-pulse" />
              <div><strong>Policy before intelligence</strong><small>The model can request actions. It cannot grant them.</small></div>
            </div>
          </div>
          <div className="workflow-list">
            {workflow.map(([number, title, copy], index) => (
              <article className="workflow-card" key={title}>
                <span>{number}</span>
                <div><h3>{title}</h3><p>{copy}</p></div>
                <i aria-hidden="true">{index === workflow.length - 1 ? "✓" : "↓"}</i>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="evidence section-shell">
        <div className="evidence-copy">
          <p className="section-kicker">Evidence over confidence</p>
          <h2>A finding earns its status.</h2>
          <p>Vitality never promotes a scanner alert to a confirmed vulnerability without proof. Every issue moves through an explicit evidence lifecycle.</p>
          <div className="evidence-states" aria-label="Finding evidence lifecycle">
            <span>Observed</span><i>→</i><span>Candidate</span><i>→</i><span className="active">Verified</span><i>→</i><span>Retested</span>
          </div>
        </div>
        <div className="finding-card">
          <div className="finding-top">
            <span className="severity">HIGH</span>
            <span className="finding-id">F-001 · CWE-79</span>
            <span className="proof-chip">Verified</span>
          </div>
          <h3>Stored cross-site scripting</h3>
          <p>User-controlled review content is rendered without output encoding.</p>
          <div className="finding-code">
            <span>evidence/request.http</span>
            <code>POST /api/Reviews<br />content={"<b>payload</b>"}</code>
          </div>
          <div className="finding-meta">
            <span><small>Corroborated by</small><strong>ZAP + source trace</strong></span>
            <span><small>Retest</small><strong className="success-text">Passed after fix</strong></span>
          </div>
        </div>
      </section>

      <section className="architecture-section" id="architecture">
        <div className="section-shell">
          <div className="section-heading">
            <div><p className="section-kicker">High-level architecture</p><h2>Intelligence inside hard boundaries.</h2></div>
            <p>The deterministic controller owns permission, execution, and state. AI helps interpret results—but never receives raw shell or network authority.</p>
          </div>
          <div className="architecture-map">
            <div className="arch-column arch-input">
              <span className="arch-label">Human control</span>
              <div className="arch-node"><i>01</i><div><strong>Engagement</strong><small>Scope, ownership, budget</small></div></div>
              <div className="arch-node"><i>02</i><div><strong>Approval</strong><small>Review consequential actions</small></div></div>
            </div>
            <div className="arch-connector" aria-hidden="true"><span>→</span></div>
            <div className="arch-column arch-control">
              <span className="arch-label">Control plane</span>
              <div className="arch-node featured"><i>03</i><div><strong>Policy gateway</strong><small>OPA + typed action catalog</small></div><em>DECIDES</em></div>
              <div className="arch-node"><i>04</i><div><strong>Workflow engine</strong><small>Deterministic state machine</small></div></div>
              <div className="arch-node"><i>05</i><div><strong>Constrained analyst</strong><small>Explain, correlate, remediate</small></div></div>
            </div>
            <div className="arch-connector" aria-hidden="true"><span>→</span></div>
            <div className="arch-column arch-execution">
              <span className="arch-label">Isolated execution</span>
              <div className="arch-node"><i>06</i><div><strong>Lab runner</strong><small>Rootless · internal network</small></div></div>
              <div className="tool-cluster"><span>Semgrep</span><span>Gitleaks</span><span>OSV</span><span>ZAP</span></div>
              <div className="arch-node evidence-node"><i>07</i><div><strong>Evidence store</strong><small>Signed artifacts + audit trail</small></div></div>
            </div>
          </div>
          <div className="architecture-rule"><span aria-hidden="true">⊘</span><strong>Non-negotiable:</strong> more compute may improve analysis, but it can never expand permissions.</div>
        </div>
      </section>

      <section className="safety section-shell">
        <div className="section-heading compact">
          <div><p className="section-kicker">Action boundaries</p><h2>Predictable by design.</h2></div>
          <p>The same policy is applied every time, independently of what a model recommends.</p>
        </div>
        <div className="safety-grid">
          <article className="safety-card safe">
            <span className="safety-icon">✓</span><small>AUTOMATIC</small><h3>Low-risk checks</h3>
            <ul><li>Static code analysis</li><li>Dependency review</li><li>Passive lab testing</li></ul>
          </article>
          <article className="safety-card review">
            <span className="safety-icon">⌁</span><small>HUMAN APPROVAL</small><h3>Bounded side effects</h3>
            <ul><li>Authenticated scanning</li><li>Patch application</li><li>State-changing verification</li></ul>
          </article>
          <article className="safety-card blocked">
            <span className="safety-icon">×</span><small>ALWAYS BLOCKED</small><h3>Outside the mission</h3>
            <ul><li>Third-party targets</li><li>Destructive exploitation</li><li>Persistence or credential theft</li></ul>
          </article>
        </div>
      </section>

      <section className="stack-section" id="stack">
        <div className="section-shell stack-layout">
          <div className="stack-copy">
            <p className="section-kicker light">Open by construction</p>
            <h2>Built around tools security teams already understand.</h2>
            <p>Vitality adds the authorization and evidence layer. Detection remains grounded in proven, inspectable open-source projects.</p>
            <a href="#architecture">See how the pieces connect <span aria-hidden="true">→</span></a>
          </div>
          <div className="tool-grid">
            {tools.map(([name, role], index) => (
              <div className="tool-card" key={name}>
                <span className={`tool-mark mark-${(index % 4) + 1}`} aria-hidden="true">{name.slice(0, 1)}</span>
                <div><strong>{name}</strong><small>{role}</small></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fit section-shell">
        <div className="fit-title"><p className="section-kicker">Where it fits</p><h2>Honest about the job.</h2></div>
        <div className="comparison">
          <article><span>Traditional scanner</span><h3>Finds signals</h3><p>Deep detection and broad integrations, but results often remain disconnected from proof and remediation.</p></article>
          <article className="comparison-featured"><span>Vitality Harness</span><h3>Governs the loop</h3><p>Coordinates tools, enforces scope, verifies important findings, and proves what happened from scan to retest.</p></article>
          <article><span>Autonomous pentest agent</span><h3>Explores broadly</h3><p>Potentially flexible, but harder to make predictable, auditable, and safe enough for repeatable workflows.</p></article>
        </div>
      </section>

      <section className="final-cta section-shell">
        <div className="cta-glow" />
        <p className="section-kicker light">The first milestone</p>
        <h2>One app. One verified issue.<br />One fix proven by retest.</h2>
        <p>That complete, trustworthy loop is the MVP.</p>
        <a className="button button-white" href="/app">Open the authorized workspace <span aria-hidden="true">↗</span></a>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top"><span>Vitality</span></a>
        <p>Authorized agentic security validation.</p>
        <span>Designed for evidence, restraint, and control.</span>
      </footer>
    </main>
  );
}
