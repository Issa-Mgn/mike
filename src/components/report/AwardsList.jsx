import './AwardsList.css';

export default function AwardsList({ awards }) {
  if (!awards || awards.length === 0) return null;

  return (
    <section className="awards-section">
      <div className="awards-header-bar">
        <h2>AWARDS DU GROUPE</h2>
      </div>
      <div className="awards-grid">
        {awards.map((award, index) => (
          <div key={index} className="award-card">
            <div className="award-category">{award.categorie}</div>
            <div className="award-winner">{award.gagnant}</div>
          </div>
        ))}
      </div>
    </section>
  );
}