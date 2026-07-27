import React from 'react';

export default function TermsOfService() {
  return (
    <div className="legal-container">
      <style>{`
        .legal-container {
          max-width: 800px;
          margin: 4rem auto;
          padding: 2.5rem;
          background: #e6e8ec;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          color: #0f172a;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
        }

        .legal-header {
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 1.5rem;
          margin-bottom: 2rem;
        }

        .legal-title {
          font-size: 2rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 0.5rem 0;
          text-transform: uppercase;
        }

        .legal-date {
          font-size: 0.875rem;
          color: #64748b;
          margin: 0;
        }

        .legal-section {
          margin-bottom: 1.75rem;
        }

        .legal-section-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.75rem;
        }

        .legal-text {
          font-size: 0.975rem;
          color: #475569;
          margin: 0 0 0.75rem 0;
        }

        .legal-list {
          padding-left: 1.25rem;
          margin: 0.5rem 0 1rem 0;
          color: #475569;
        }

        .legal-list li {
          margin-bottom: 0.5rem;
          font-size: 0.975rem;
        }

        .legal-contact {
          background: #f8fafc;
          padding: 1.25rem;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          margin-top: 2rem;
        }

        .legal-contact p {
          margin: 0;
          font-weight: 500;
          color: #334155;
        }
      `}</style>

      <div className="legal-header">
        <h1 className="legal-title">Conditions Générales d'Utilisation</h1>
        <p className="legal-date">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
      </div>

      <div className="legal-section">
        <p className="legal-text">
          Bienvenue sur notre plateforme. En accédant à nos services ou en les utilisant, vous acceptez d'être lié par les présentes Conditions Générales d'Utilisation.
        </p>
      </div>

      <div className="legal-section">
        <h2 className="legal-section-title">1. Objet</h2>
        <p className="legal-text">
          Les présentes conditions ont pour objet de définir les modalités d'accès et d'utilisation des services fournis sur notre site et notre application.
        </p>
      </div>

      <div className="legal-section">
        <h2 className="legal-section-title">2. Accès au Service</h2>
        <p className="legal-text">
          L'accès à la plateforme est réservé à un usage personnel et conforme aux lois en vigueur. Nous nous réservons le droit de suspendre ou de restreindre l'accès à tout ou partie du service à tout moment, notamment pour des raisons de maintenance ou de sécurité.
        </p>
      </div>

      <div className="legal-section">
        <h2 className="legal-section-title">3. Utilisation et Engagements</h2>
        <p className="legal-text">En utilisant notre service, vous vous engagez à :</p>
        <ul className="legal-list">
          <li>Ne pas importer de contenus illégaux, diffamatoires ou violant les droits d'auteur.</li>
          <li>Ne pas tenter de contourner ou d'altérer la sécurité du système.</li>
          <li>Utiliser la plateforme de manière équitable et responsable.</li>
        </ul>
      </div>

      <div className="legal-section">
        <h2 className="legal-section-title">4. Propriété Intellectuelle</h2>
        <p className="legal-text">
          Tous les éléments composant cette plateforme (textes, interfaces, graphismes, codes sources) sont protégés par la législation sur la propriété intellectuelle et demeurent notre propriété exclusive.
        </p>
      </div>

      <div className="legal-section">
        <h2 className="legal-section-title">5. Limitation de Responsabilité</h2>
        <p className="legal-text">
          Le service est fourni "en l'état". Nous ne pouvons garantir une disponibilité ininterrompue et déclinons toute responsabilité pour d'éventuelles pertes de données ou interruptions de service.
        </p>
      </div>

      <div className="legal-contact">
        <p>Pour toute question concernant ces CGU, vous pouvez nous contacter à : <strong>support@votre-domaine.com</strong></p>
      </div>
    </div>
  );
}