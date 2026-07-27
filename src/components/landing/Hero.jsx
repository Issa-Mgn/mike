import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Globe from './Globe';
import heroBackground from '../../assets/hero.png';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" style={{ backgroundImage: `url(${heroBackground})` }}>
      <div className="hero-content">
        <motion.div 
          className="hero-text"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="hero-title">
            Découvrez ce que cachent vraiment vos conversations
          </h1>
          <p className="hero-description">
            Upload ton export WhatsApp (groupe ou conversation privée). Mike lit chaque message 
            et génère un rapport complet, drôle et sans filtre.
          </p>
          <Link to="/upload" className="hero-cta">
            Analyser ma conversation
          </Link>
        </motion.div>

        <div className="hero-visual">
          <div className="globe-wrapper">
            <Globe scale={9} />
          </div>
        </div>
      </div>
    </section>
  );
}