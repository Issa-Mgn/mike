import './ParticipantCard.css';

export default function ParticipantCard({ participant, index, photoPreview }) {
  const isHighNote = participant.note_sur_10 >= 6;

  return (
    <article className="participant-card">
      {/* En-tête de la carte */}
      <div className="card-top-bar">
        <span className="dossier-tag">
          DOSSIER N°{String(index + 1).padStart(2, '0')}
        </span>
        <div className={`score-badge ${isHighNote ? 'high' : 'low'}`}>
          <span className="score-num">{participant.note_sur_10}</span>
          <span className="score-max">/10</span>
        </div>
      </div>

      <div className="participant-identity">
        {photoPreview && (
          <div className="participant-photo">
            <img src={photoPreview} alt={participant.nom} />
          </div>
        )}
        <h3 className="participant-name">{participant.nom}</h3>
        <p className="participant-subtitle">« {participant.titre} »</p>
      </div>

      {/* Grid d'informations clés */}
      <div className="info-grid">
        <div className="info-block">
          <span className="info-label">Rôle dans le groupe</span>
          <p className="info-value role-text">{participant.role}</p>
        </div>

        <div className="info-block">
          <span className="info-label">Ratio Initiateur / Répondeur</span>
          <div className="ratio-pill">
            <span className="ratio-value">{participant.ratio_initiateur_repondeur}</span>
          </div>
        </div>
      </div>

      {/* Tics de langage sous forme de Chips/Tags */}
      {participant.tics_de_langage && participant.tics_de_langage.length > 0 && (
        <div className="info-block">
          <span className="info-label">Tics de langage récurrents</span>
          <div className="tics-chips">
            {participant.tics_de_langage.map((tic, i) => (
              <span key={i} className="chip">{tic}</span>
            ))}
          </div>
        </div>
      )}

      {/* Moment Révélateur / Citation */}
      {participant.moment_revelateur && (
        <div className="info-block">
          <span className="info-label">Moment Révélateur</span>
          <blockquote className="quote-box">
            <span className="quote-mark">“</span>
            {participant.moment_revelateur}
          </blockquote>
        </div>
      )}

      {/* Inferences / Ce que le groupe pense & Justification */}
      <div className="analysis-footer">
        {participant.prediction_avis_groupe && (
          <div className="analysis-item">
            <span className="info-label">Ce que le groupe pense</span>
            <p className="analysis-text">{participant.prediction_avis_groupe}</p>
          </div>
        )}

        <div className="analysis-item">
          <span className="info-label">Justification de la note</span>
          <p className="analysis-text muted">{participant.justification_note}</p>
        </div>
      </div>
    </article>
  );
}