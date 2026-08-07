import Link from "next/link";

const handoffFiles = [
  ["manifest.json", "Run identity, timestamps, schema version, and file inventory"],
  ["findings.json", "Normalized findings prepared by the backend ingestion pipeline"],
  ["events.json", "Ordered policy, scanner, verification, and approval events"],
  ["evidence.zip", "Evidence capsule with hashes and provenance"],
];

export default function AppPage() {
  return (
    <main className="console-shell">
      <aside className="console-sidebar">
        <Link className="console-brand" href="/" aria-label="Back to Vitality home">
          <span className="brand-mark">V</span>
          <div><strong>Vitality</strong><small>Frontend workspace</small></div>
        </Link>
        <nav aria-label="Workspace sections">
          <button className="active" type="button"><span>⌂</span>Handoff</button>
          <button disabled type="button"><span>◎</span>Runs</button>
          <button disabled type="button"><span>◇</span>Findings</button>
          <button disabled type="button"><span>▱</span>Evidence</button>
        </nav>
        <div className="sidebar-spacer" />
        <div className="truth-card">
          <span>NO LIVE CONNECTIONS</span>
          <p>This repository contains no API client, authentication provider, event stream, database binding, or cloud-storage SDK.</p>
        </div>
      </aside>

      <section className="console-main">
        <header className="console-header">
          <div>
            <p className="console-kicker">S3 ARTIFACT HANDOFF</p>
            <h1>Frontend workspace</h1>
          </div>
          <div className="system-pills" aria-label="Connection status">
            <span><i className="status-dot" /> API disconnected</span>
            <span><i className="status-dot" /> Auth disconnected</span>
            <span><i className="status-dot" /> Storage disconnected</span>
          </div>
        </header>

        <div className="workspace-alert console-alert" role="status">
          <span>○</span>
          <strong>Waiting for backend-delivered files</strong>
          <small>Ingestion is owned by the backend team.</small>
        </div>

        <div className="launch-grid">
          <article className="scope-card">
            <div className="card-heading">
              <div><p className="console-kicker">BOUNDARY</p><h2>S3 delivery contract</h2></div>
              <span className="step-chip">FRONTEND ONLY</span>
            </div>
            <p className="handoff-lede">
              The backend owns bucket access, validation, decompression, normalization, and ingestion. The frontend only renders already-prepared artifacts supplied through the deployment boundary.
            </p>
            <div className="handoff-grid">
              {handoffFiles.map(([name, description]) => (
                <div className="handoff-file" key={name}>
                  <span>FILE</span>
                  <div><code>{name}</code><p>{description}</p></div>
                </div>
              ))}
            </div>
          </article>

          <aside className="stack-card">
            <div className="card-heading"><div><p className="console-kicker">OWNERSHIP</p><h3>Separation of concerns</h3></div></div>
            <div className="handoff-steps">
              <div><span>01</span><p><strong>Backend delivers</strong><small>S3 access and ingestion remain server-side.</small></p></div>
              <div><span>02</span><p><strong>Pipeline prepares</strong><small>Files are validated and normalized before exposure.</small></p></div>
              <div><span>03</span><p><strong>Frontend renders</strong><small>The browser receives presentation-ready data only.</small></p></div>
            </div>
          </aside>
        </div>

        <section className="findings-panel disconnected-panel">
          <div className="panel-heading">
            <div><p className="console-kicker">CURRENT STATE</p><h2>No artifacts loaded</h2></div>
            <span className="step-chip">DISCONNECTED</span>
          </div>
          <p>Runs, findings, evidence, and approvals will remain empty until the backend delivery contract is implemented. No browser request is attempted.</p>
        </section>

        <footer className="console-footer">
          <span>Vitality frontend · standalone repository</span>
          <code>transport: none</code>
        </footer>
      </section>
    </main>
  );
}
