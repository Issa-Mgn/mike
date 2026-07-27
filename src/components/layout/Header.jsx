import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import logo from '../../assets/logo.jpg';
import './Header.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleAnchorClick = (e, targetId) => {
    e.preventDefault();
    closeMenu();
    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const openDonationModal = () => {
    setIsDonationModalOpen(true);
    closeMenu();
  };

  const closeDonationModal = () => {
    setIsDonationModalOpen(false);
  };

  const handleWhatsAppDonation = () => {
    // Remplace ce numéro par le tien (format international sans +)
    const phoneNumber = '2290156103458'; // Exemple: pays + numéro
    const message = encodeURIComponent('Bonjour ! Je souhaiterais faire un don pour soutenir Mike 🙏');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  // Empêche le défilement de la page quand le menu plein écran est ouvert
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Empêche le défilement quand le modal est ouvert
  useEffect(() => {
    if (isDonationModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isDonationModalOpen]);

  return (
    <header className="header-wrapper">
      <div className="header-pill">
        <Link to="/" className="header-brand" onClick={closeMenu}>
          <div className="logo-box">
            <img src={logo} alt="Mike" className="header-logo" />
          </div>
          <span className="header-title">MIKE</span>
        </Link>

        {/* Navigation Desktop */}
        <nav className="header-nav">
          <a href="#how-it-works" className="header-nav-link" onClick={(e) => handleAnchorClick(e, 'how-it-works')}>Comment ça marche</a>
          <a href="#examples" className="header-nav-link" onClick={(e) => handleAnchorClick(e, 'examples')}>Exemples</a>
          <a href="#faq" className="header-nav-link" onClick={(e) => handleAnchorClick(e, 'faq')}>FAQ</a>
          <button onClick={openDonationModal} className="header-nav-link header-donation-btn">
            <Heart size={18} strokeWidth={2} fill="currentColor" /> Faire un don
          </button>
        </nav>

        {/* CTA Desktop */}
        <Link to="/upload" className="header-cta desktop-only">
          Analyser maintenant
        </Link>

        {/* Bouton Hamburger Mobile */}
        <button 
          className="hamburger-btn"
          onClick={toggleMenu}
          aria-label="Ouvrir le menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>

      {/* Menu Mobile Plein Écran (Glissement Droite -> Gauche) */}
      <div className={`mobile-fullscreen-menu ${isMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-header">
          <div className="header-brand">
            <div className="logo-box">
              <img src={logo} alt="Mike" className="header-logo" />
            </div>
            <span className="header-title">MIKE</span>
          </div>

          {/* Bouton Croix Néomorphique */}
          <button 
            className="close-btn-neumorphism" 
            onClick={closeMenu}
            aria-label="Fermer le menu"
          >
            <X size={24} strokeWidth={2.5} />
          </button>
        </div>

        <nav className="mobile-fullscreen-nav">
          <a href="#how-it-works" className="mobile-nav-item" onClick={(e) => handleAnchorClick(e, 'how-it-works')}>
            Comment ça marche
          </a>
          <a href="#examples" className="mobile-nav-item" onClick={(e) => handleAnchorClick(e, 'examples')}>
            Exemples
          </a>
          <a href="#faq" className="mobile-nav-item" onClick={(e) => handleAnchorClick(e, 'faq')}>
            FAQ
          </a>
          <button onClick={openDonationModal} className="mobile-nav-item mobile-donation-btn">
            <Heart size={18} strokeWidth={2} fill="currentColor" /> Faire un don
          </button>
          
          <div className="mobile-cta-wrapper">
            <Link to="/upload" className="mobile-fullscreen-cta" onClick={closeMenu}>
              Analyser maintenant
            </Link>
          </div>
        </nav>
      </div>

      {/* Modal de donation */}
      {isDonationModalOpen && (
        <div className="donation-modal-overlay" onClick={closeDonationModal}>
          <div className="donation-modal" onClick={(e) => e.stopPropagation()}>
            <button className="donation-modal-close" onClick={closeDonationModal}>
              <X size={24} strokeWidth={2} />
            </button>
            
            <div className="donation-modal-content">
              <div className="donation-modal-icon"></div>
              <h2 className="donation-modal-title">Soutenir Mike</h2>
              <p className="donation-modal-text">
                Mike est un projet gratuit et open-source créé avec passion. 
                Si tu apprécies ce service, tu peux nous soutenir en faisant un don.
              </p>
              <p className="donation-modal-subtext">
                Chaque contribution, petite ou grande, nous aide à maintenir et améliorer Mike ! 🙏
              </p>
              
              <button className="donation-whatsapp-btn" onClick={handleWhatsAppDonation}>
                <span className="whatsapp-icon"></span>
                Continuer
              </button>
              
              <button className="donation-cancel-btn" onClick={closeDonationModal}>
                Peut-être plus tard
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}