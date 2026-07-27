import './VerdictFinal.css';

export default function VerdictFinal({ verdict }) {
  return (
    <section className="verdict-final-card">
      <div className="verdict-badge">
        <span>VERDICT FINAL</span>
      </div>
      <blockquote className="verdict-quote">
        “{verdict}”
      </blockquote>
    </section>
  );
}