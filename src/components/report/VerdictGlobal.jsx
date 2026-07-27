import './VerdictGlobal.css';

export default function VerdictGlobal({ verdict, stats, photoPreview }) {
  return (
    <section className="verdict-global-card">
      <div className="verdict-global-header">
        <h2>VERDICT GLOBAL</h2>
      </div>
      
      {/* Stats de la conversation */}
      {stats && (
        <div className="conversation-stats">
          {stats.durationMonths > 0 && (
            <div className="stat-item">
              <span className="stat-label">Durée</span>
              <span className="stat-value">{stats.durationMonths} mois</span>
            </div>
          )}
          {stats.dateRange && (
            <div className="stat-item stat-item-wide">
              <span className="stat-label">Période</span>
              <span className="stat-value-small">{stats.dateRange.start} - {stats.dateRange.end}</span>
            </div>
          )}
        </div>
      )}
      
      <p className="verdict-text">{verdict}</p>
      
      {/* Photo si disponible */}
      {photoPreview && (
        <div className="verdict-photo-container">
          <img 
            src={photoPreview} 
            alt="Photo de groupe" 
            className="verdict-photo"
          />
        </div>
      )}
    </section>
  );
}