import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './WelcomeModal.css';

export default function WelcomeModal() {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Ne pas afficher le modal sur les pages terms et privacy
    const isTermsOrPrivacy = location.pathname === '/terms' || location.pathname === '/privacy';
    
    if (isTermsOrPrivacy) {
      setIsVisible(false);
      return;
    }

    // Vérifier si l'utilisateur a déjà accepté
    const hasAccepted = localStorage.getItem('termsAccepted');
    if (!hasAccepted) {
      setIsVisible(true);
    }
  }, [location.pathname]);

  const handleAccept = () => {
    localStorage.setItem('termsAccepted', 'true');
    setIsVisible(false);
  };

  const handleRefuse = () => {
    // Fermer l'onglet/la fenêtre
    window.close();
    
    // Si window.close() ne fonctionne pas (certains navigateurs le bloquent),
    // rediriger vers une page vide
    setTimeout(() => {
      window.location.href = 'about:blank';
    }, 100);
  };

  if (!isVisible) return null;

  return (
    <div className="welcome-modal-overlay">
      <div className="welcome-modal-content">
        <h2 className="welcome-modal-title">Bienvenue sur Mike</h2>
        <p className="welcome-modal-text">
          Avant de commencer, veuillez prendre connaissance de nos conditions d'utilisation et de notre politique de confidentialité.
        </p>
        <p className="welcome-modal-text">
          En continuant, vous acceptez nos{' '}
          <Link to="/terms" className="welcome-modal-link" target="_blank" rel="noopener noreferrer">
            Conditions d'utilisation
          </Link>{' '}
          et notre{' '}
          <Link to="/privacy" className="welcome-modal-link" target="_blank" rel="noopener noreferrer">
            Politique de confidentialité
          </Link>.
        </p>
        
        <div className="welcome-modal-actions">
          <button 
            className="welcome-modal-refuse-btn" 
            onClick={handleRefuse}
          >
            Refuser
          </button>
          <button 
            className="welcome-modal-accept-btn" 
            onClick={handleAccept}
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
