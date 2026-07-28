import { Bell, X } from 'lucide-react';
import './NotificationPermissionModal.css';

export default function NotificationPermissionModal({ onAccept, onDecline }) {
  return (
    <div className="notification-modal-overlay">
      <div className="notification-modal">
        <button className="notification-modal-close" onClick={onDecline}>
          <X size={20} />
        </button>
        
        <div className="notification-modal-icon">
          <Bell size={48} strokeWidth={1.5} />
        </div>
        
        <h2 className="notification-modal-title">Activer les notifications</h2>
        
        <p className="notification-modal-text">
          Mike vous enverra une notification quand l'analyse sera terminée. 
          Vous pourrez fermer cette page et revenir plus tard !
        </p>
        
        <div className="notification-modal-actions">
          <button 
            className="notification-modal-btn notification-modal-accept"
            onClick={onAccept}
          >
            Activer les notifications
          </button>
        </div>
      </div>
    </div>
  );
}
