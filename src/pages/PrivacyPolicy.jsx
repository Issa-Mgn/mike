import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="privacy-container">
      <style>{`
        .privacy-container {
          max-width: 800px;
          margin: 4rem auto;
          padding: 2.5rem;
          background:#e6e8ec ;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          color: #0f172a;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
        }

        .privacy-header {
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 1.5rem;
          margin-bottom: 2rem;
        }

        .privacy-title {
          font-size: 2rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 0.5rem 0;
          text-transform: uppercase;
        }

        .privacy-date {
          font-size: 0.875rem;
          color: #64748b;
          margin: 0;
        }

        .privacy-section {
          margin-bottom: 1.75rem;
        }

        .privacy-section-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.75rem;
        }

        .privacy-text {
          font-size: 0.975rem;
          color: #475569;
          margin: 0 0 0.75rem 0;
        }

        .privacy-list {
          padding-left: 1.25rem;
          margin: 0.5rem 0 1rem 0;
          color: #475569;
        }

        .privacy-list li {
          margin-bottom: 0.5rem;
          font-size: 0.975rem;
        }

        .privacy-badge {
          display: inline-block;
          background: #eff6ff;
          color: #2563eb;
          padding: 0.25rem 0.75rem;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.85rem;
          margin-bottom: 1rem;
        }

        .privacy-contact {
          background: #f8fafc;
          padding: 1.25rem;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          margin-top: 2rem;
        }

        .privacy-contact p {
          margin: 0;
          font-weight: 500;
          color: #334155;
        }
      `}</style>

      <div className="privacy-header">
        <span className="privacy-badge">Confidentialité & IA Zero-Data</span>
        <h1 className="privacy-title">Politique de Confidentialité</h1>
        <p className="privacy-date">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
      </div>

      <div className="privacy-section">
        <p className="privacy-text">
          Nous appliquons un principe fondamental de <strong>zéro rétention de données</strong>. Notre architecture est conçue dès le départ pour que ni l'Intelligence Artificielle ni notre plateforme ne conservent vos données ou vos fichiers.
        </p>
      </div>

      <div className="privacy-section">
        <h2 className="privacy-section-title">1. Aucun Entraînement sur vos Données</h2>
        <p className="privacy-text">
          L'Intelligence Artificielle utilisée pour traiter vos requêtes et analyser vos fichiers ne stocke <strong>aucune information</strong> :
        </p>
        <ul className="privacy-list">
          <li>Vos documents, messages et données ne sont jamais utilisés pour entraîner ou améliorer les modèles d'IA.</li>
          <li>Chaque analyse est effectuée en mémoire vive (RAM) de manière totalement volatile.</li>
          <li>Une fois le traitement terminé et le rapport généré, les données transmises à l'IA sont immédiatement purgées.</li>
        </ul>
      </div>

      <div className="privacy-section">
        <h2 className="privacy-section-title">2. Suppression Automatique des Logs</h2>
        <p className="privacy-text">
          Pour garantir la sécurité et la haute disponibilité du service sans compromettre votre vie privée :
        </p>
        <ul className="privacy-list">
          <li>Les journaux de connexion et logs serveur sont temporaires et <strong>supprimés automatiquement</strong>.</li>
          <li>Aucun historique de vos contenus ou de vos fichiers n'est conservé dans nos bases de données.</li>
          <li>Les identifiants de session expirés sont purgés à intervalles réguliers par nos scripts automatisés.</li>
        </ul>
      </div>

      <div className="privacy-section">
        <h2 className="privacy-section-title">3. Traitement Éphémère des Fichiers</h2>
        <p className="privacy-text">
          Lorsque vous uploadez un fichier pour analyse :
        </p>
        <ul className="privacy-list">
          <li>Le fichier est traité instantanément par notre moteur.</li>
          <li>Dès que le rendu ou le rapport vous est délivré, le fichier temporaire est définitivement effacé du serveur.</li>
          <li>Aucune copie de sauvegarde ou archive n'est créée.</li>
        </ul>
      </div>

      <div className="privacy-section">
        <h2 className="privacy-section-title">4. Sécurité du Transit</h2>
        <p className="privacy-text">
          Même si vos données sont éphémères, leur transit est entièrement sécurisé par un chiffrement SSL/TLS de bout en bout afin d'empêcher toute interception intermédiaire lors de l'envoi vers nos serveurs.
        </p>
      </div>

      <div className="privacy-contact">
        <p>Pour toute question sur notre politique de confidentialité et la suppression de vos données : <strong>privacy@votre-domaine.com</strong></p>
      </div>
    </div>
  );
}