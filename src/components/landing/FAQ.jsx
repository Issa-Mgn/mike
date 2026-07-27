import { useState } from 'react';
import './FAQ.css';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'C\'est quoi Mike ?',
      answer: 'Mike est un analyseur IA qui lit toute ta conversation WhatsApp et génère un rapport complet, drôle et sans filtre sur chaque personne du groupe. Tics de langage, contradictions, moments gênants, dynamiques cachées — tout y passe.'
    },
    {
      question: 'Ça marche avec quel type de conversations ?',
      answer: 'N\'importe quelle conversation de groupe ou discussion privée exportée depuis WhatsApp. Plus il y a de messages, plus l\'analyse est précise et détaillée.'
    },
    {
      question: 'Mes données sont-elles conservées ?',
      answer: 'Non. Le fichier est analysé en temps réel et supprimé immédiatement après. Rien n\'est stocké sur nos serveurs.'
    },
    {
      question: 'Combien ça coûte ?',
      answer: 'Gratuit pour le moment. On utilise des quotas gratuits de providers LLM — si la demande explose, on ajoutera un modèle payant.'
    },
    {
      question: 'Comment exporter ma conversation WhatsApp ?',
      answer: 'Ouvre la discussion → Menu (⋮) → Plus → Exporter → Sans média. Ça génère un fichier .zip que tu peux uploader ici.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq">
      <h2 className="faq-title">Questions fréquentes</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <button
              className="faq-question"
              onClick={() => toggleFAQ(index)}
              aria-expanded={openIndex === index}
            >
              <span>{faq.question}</span>
              <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
            </button>
            {openIndex === index && (
              <div className="faq-answer">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
