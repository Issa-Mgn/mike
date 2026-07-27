import { Users, MessageCircle, Calendar, Clock } from 'lucide-react';
import './ConversationDetailsStep.css';

export default function ConversationDetailsStep({ stats, onContinue }) {
  return (
    <div className="conversation-details-step">
      <div className="details-header">
        <h2 className="details-title">Aperçu de la conversation</h2>
        <p className="details-description">
          Voici un résumé de votre conversation avant de commencer l'analyse
        </p>
      </div>

      <div className="details-cards">
        <div className="detail-card">
          <div className="detail-icon" style={{ background: '#3b82f6' }}>
            <MessageCircle size={32} strokeWidth={2.5} color="#fff" />
          </div>
          <div className="detail-content">
            <div className="detail-value">{stats.totalMessages.toLocaleString()}</div>
            <div className="detail-label">Messages</div>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-icon" style={{ background: '#10b981' }}>
            <Users size={32} strokeWidth={2.5} color="#fff" />
          </div>
          <div className="detail-content">
            <div className="detail-value">{stats.participantCount}</div>
            <div className="detail-label">Participants</div>
          </div>
        </div>

        {stats.durationMonths > 0 && (
          <div className="detail-card">
            <div className="detail-icon" style={{ background: '#f59e0b' }}>
              <Clock size={32} strokeWidth={2.5} color="#fff" />
            </div>
            <div className="detail-content">
              <div className="detail-value">
                {stats.durationMonths} {stats.durationMonths > 1 ? 'mois' : 'mois'}
              </div>
              <div className="detail-label">Durée</div>
            </div>
          </div>
        )}

        {stats.dateRange && (
          <div className="detail-card">
            <div className="detail-icon" style={{ background: '#8b5cf6' }}>
              <Calendar size={32} strokeWidth={2.5} color="#fff" />
            </div>
            <div className="detail-content">
              <div className="detail-value-small">
                {stats.dateRange.start} - {stats.dateRange.end}
              </div>
              <div className="detail-label">Période</div>
            </div>
          </div>
        )}
      </div>

      {stats.participants && stats.participants.length > 0 && (
        <div className="participants-list">
          <h3 className="participants-title">Participants</h3>
          <div className="participants-grid">
            {stats.participants.map((participant, index) => (
              <div key={index} className="participant-chip">
                <div className="participant-avatar">
                  {participant.charAt(0).toUpperCase()}
                </div>
                <span className="participant-name">{participant}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <button onClick={onContinue} className="details-continue-btn">
        Continuer
      </button>
    </div>
  );
}
