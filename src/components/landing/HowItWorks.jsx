import { useState } from 'react';
import './HowItWorks.css';

// Composant de l'animation de démonstration WhatsApp
function ExportTutorialDemo() {
  return (
    <div
      className="export-tutorial-wrapper"
      role="img"
      aria-label="Comment exporter une discussion WhatsApp"
    >
      <div className="export-tutorial-card">
        <div className="export-tutorial-stage">
          {/* Scene 1: Liste des conversations */}
          <div className="export-tutorial-scene export-tutorial-scene1">
            <div className="export-tutorial-listTitle">WhatsApp</div>
            <div className="export-tutorial-listRows">
              <div className="export-tutorial-listRow">
                <div className="export-tutorial-dotAvatar"></div>
                <div className="export-tutorial-listRowContent">
                  <div className="export-tutorial-rowName">Issa(Vous)</div>
                  <div className="export-tutorial-bar export-tutorial-barLong"></div>
                </div>
                <div className="export-tutorial-rowTime">14:02</div>
              </div>
              <div className="export-tutorial-listRow export-tutorial-listRowTarget">
                <div className="export-tutorial-dotAvatar"></div>
                <div className="export-tutorial-listRowContent">
                  <div className="export-tutorial-rowName">Trio</div>
                  <div className="export-tutorial-bar export-tutorial-barLong"></div>
                </div>
                <div className="export-tutorial-rowTime">13:47</div>
              </div>
              <div className="export-tutorial-listRow">
                <div className="export-tutorial-dotAvatar"></div>
                <div className="export-tutorial-listRowContent">
                  <div className="export-tutorial-rowName">Papa</div>
                  <div className="export-tutorial-bar export-tutorial-barMid"></div>
                </div>
                <div className="export-tutorial-rowTime">12:31</div>
              </div>
              <div className="export-tutorial-listRow">
                <div className="export-tutorial-dotAvatar"></div>
                <div className="export-tutorial-listRowContent">
                  <div className="export-tutorial-rowName">Belmonde</div>
                  <div className="export-tutorial-bar export-tutorial-barMid"></div>
                </div>
                <div className="export-tutorial-rowTime">11:08</div>
              </div>
            </div>
          </div>

          {/* Scene 2: Discussion ouverte */}
          <div className="export-tutorial-scene export-tutorial-scene2">
            <div className="export-tutorial-chatHeader">
              <div className="export-tutorial-chatHeaderBack"></div>
              <div className="export-tutorial-dotAvatar"></div>
              <div className="export-tutorial-chatHeaderText">
                <div className="export-tutorial-chatHeaderName">Trio</div>
                <div className="export-tutorial-chatHeaderSub">appuyez ici pour les infos du groupe</div>
              </div>
            </div>
            <div className="export-tutorial-chatBody">
              <div className="export-tutorial-msg export-tutorial-msgThem">
                <div className="export-tutorial-msgSender">Gloria</div>
                <div className="export-tutorial-bubble export-tutorial-bubbleThem">
                  <div className="export-tutorial-bubbleLine" style={{ width: '118px' }}></div>
                  <div className="export-tutorial-bubbleLine" style={{ width: '72px' }}></div>
                </div>
              </div>
              <div className="export-tutorial-msg export-tutorial-msgMe">
                <div className="export-tutorial-bubble export-tutorial-bubbleMe">
                  <div className="export-tutorial-bubbleLine" style={{ width: '64px' }}></div>
                </div>
              </div>
              <div className="export-tutorial-msg export-tutorial-msgThem">
                <div className="export-tutorial-msgSender">Emilien</div>
                <div className="export-tutorial-bubble export-tutorial-bubbleThem">
                  <div className="export-tutorial-bubbleLine" style={{ width: '96px' }}></div>
                </div>
              </div>
              <div className="export-tutorial-msg export-tutorial-msgMe">
                <div className="export-tutorial-bubble export-tutorial-bubbleMe">
                  <div className="export-tutorial-bubbleLine" style={{ width: '48px' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Scene 3: Menu d'informations du groupe */}
          <div className="export-tutorial-scene export-tutorial-scene3">
            <div className="export-tutorial-menuScreen">
              <div className="export-tutorial-groupInfoTop">
                <div className="export-tutorial-backControl">
                  <div className="export-tutorial-backArrow"></div>
                </div>
                <div className="export-tutorial-infoActions">
                  <div className="export-tutorial-qrControl">
                    <div className="export-tutorial-qrGlyph"></div>
                  </div>
                  <div className="export-tutorial-overflowControl export-tutorial-menuOverflowTarget">
                    <div className="export-tutorial-overflowDots">
                      <span></span><span></span><span></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="export-tutorial-groupInfoHero">
                <div className="export-tutorial-groupAvatar"></div>
                <div className="export-tutorial-groupTitle">Trio</div>
                <div className="export-tutorial-groupSubtitle">Membres: 3</div>
              </div>
              <div className="export-tutorial-actionCards">
                <div className="export-tutorial-actionCard">Audio</div>
                <div className="export-tutorial-actionCard">Vidéo</div>
                <div className="export-tutorial-actionCard">Ajouter</div>
                <div className="export-tutorial-actionCard">Rechercher</div>
              </div>
              <div className="export-tutorial-memberPreview">
                <div className="export-tutorial-sectionTitle">Membres: 3</div>
                <div className="export-tutorial-memberCard">
                  <div className="export-tutorial-memberRow">
                    <div className="export-tutorial-dotAvatar export-tutorial-dotAvatarTiny"></div>
                    <div className="export-tutorial-memberName">Vous</div>
                  </div>
                  <div className="export-tutorial-memberRow">
                    <div className="export-tutorial-dotAvatar export-tutorial-dotAvatarTiny"></div>
                    <div className="export-tutorial-memberName">Emilien</div>
                  </div>
                  <div className="export-tutorial-memberRow">
                    <div className="export-tutorial-dotAvatar export-tutorial-dotAvatarTiny"></div>
                    <div className="export-tutorial-memberName">Gloria</div>
                  </div>
                </div>
              </div>
              <div className="export-tutorial-overflowMenu">
                <div className="export-tutorial-overflowMenuRow">
                  <div className="export-tutorial-editIcon"></div>
                  <div className="export-tutorial-overflowMenuLabel">Modifier le nom et la photo</div>
                </div>
                <div className="export-tutorial-overflowMenuRow">
                  <div className="export-tutorial-editBoxIcon"></div>
                  <div className="export-tutorial-overflowMenuLabel">Modifier la description</div>
                </div>
                <div className="export-tutorial-overflowMenuRow export-tutorial-menuRowTarget">
                  <div className="export-tutorial-exportIcon"></div>
                  <div className="export-tutorial-overflowMenuLabel">Exporter la discussion</div>
                </div>
              </div>
            </div>
          </div>

          {/* Scene 4: Modal d'options d'exportation */}
          <div className="export-tutorial-scene export-tutorial-scene4">
            <div className="export-tutorial-modalBackdrop"></div>
            <div className="export-tutorial-modal">
              <div className="export-tutorial-modalGrip"></div>
              <div className="export-tutorial-modalTitle">Exporter la discussion</div>
              <div className="export-tutorial-modalNotice">Joindre les médias créera une archive de discussion plus lourde.</div>
              <div className="export-tutorial-modalOption">
                <div className="export-tutorial-modalIcon"></div>
                <div className="export-tutorial-menuLabel">Joindre les médias</div>
              </div>
              <div className="export-tutorial-modalOption export-tutorial-modalOptionTarget">
                <div className="export-tutorial-modalIcon"></div>
                <div className="export-tutorial-menuLabel">Sans les médias</div>
              </div>
            </div>
          </div>

          {/* Scene 5: Partage / Sauvegarde */}
          <div className="export-tutorial-scene export-tutorial-scene5">
            <div className="export-tutorial-shareBackdrop"></div>
            <div className="export-tutorial-shareSheet">
              <div className="export-tutorial-shareGrip"></div>
              <div className="export-tutorial-shareFileRow">
                <div className="export-tutorial-zipIcon">
                  <div className="export-tutorial-zipIconLabel">ZIP</div>
                </div>
                <div className="export-tutorial-shareFileText">
                  <div className="export-tutorial-bar export-tutorial-barLong"></div>
                  <div className="export-tutorial-bar export-tutorial-barShort"></div>
                </div>
                <div className="export-tutorial-shareClose">
                  <div className="export-tutorial-shareCloseX"></div>
                </div>
              </div>
              <div className="export-tutorial-shareContactRow">
                <div className="export-tutorial-shareContact">
                  <div className="export-tutorial-dotAvatar export-tutorial-shareAvatar"></div>
                  <div className="export-tutorial-shareContactBadge"></div>
                </div>
                <div className="export-tutorial-shareContact">
                  <div className="export-tutorial-dotAvatar export-tutorial-shareAvatar"></div>
                  <div className="export-tutorial-shareContactBadge"></div>
                </div>
                <div className="export-tutorial-shareContact">
                  <div className="export-tutorial-dotAvatar export-tutorial-shareAvatar"></div>
                  <div className="export-tutorial-shareContactBadge"></div>
                </div>
                <div className="export-tutorial-shareContact">
                  <div className="export-tutorial-dotAvatar export-tutorial-shareAvatar"></div>
                  <div className="export-tutorial-shareContactBadge"></div>
                </div>
              </div>
              <div className="export-tutorial-shareAppRow">
                <div className="export-tutorial-shareApp export-tutorial-shareApp1"></div>
                <div className="export-tutorial-shareApp export-tutorial-shareApp2"></div>
                <div className="export-tutorial-shareApp export-tutorial-shareApp3"></div>
                <div className="export-tutorial-shareApp export-tutorial-shareApp4">
                  <div className="export-tutorial-shareAppMoreDot"></div>
                  <div className="export-tutorial-shareAppMoreDot"></div>
                  <div className="export-tutorial-shareAppMoreDot"></div>
                </div>
              </div>
              <div className="export-tutorial-shareActionRow">
                <div className="export-tutorial-shareAction">
                  <div className="export-tutorial-shareActionIcon export-tutorial-copyIcon"></div>
                  <div className="export-tutorial-bar export-tutorial-barTiny"></div>
                </div>
                <div className="export-tutorial-shareAction">
                  <div className="export-tutorial-shareActionIcon export-tutorial-noteIcon"></div>
                  <div className="export-tutorial-bar export-tutorial-barTiny"></div>
                </div>
                <div className="export-tutorial-shareAction export-tutorial-shareActionTarget">
                  <div className="export-tutorial-shareActionIcon export-tutorial-folderIcon"></div>
                  <div className="export-tutorial-shareActionLabel">Enregistrer dans Fichiers</div>
                </div>
              </div>
            </div>
          </div>

          {/* Doigt animé */}
          <div className="export-tutorial-fingerPos">
            <div className="export-tutorial-fingerRipple"></div>
            <div className="export-tutorial-finger"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      number: 1,
      title: 'Upload',
      description: 'Exporte ta conversation WhatsApp (sans média) et dépose le fichier .zip'
    },
    {
      number: 2,
      title: 'Analyse',
      description: 'Mike lit TOUS les messages et extrait les moments notables, tics de langage, contradictions'
    },
    {
      number: 3,
      title: 'Rapport',
      description: 'Reçois un dossier complet sur chaque personne : notes, awards, dynamiques cachées'
    }
  ];

  return (
    <section className="how-it-works">
      <h2 className="how-it-works-title">Comment ça marche</h2>
      
      <div className="how-it-works-main">
        {/* Démo à gauche */}
        <div className="demo-container-left">
          <ExportTutorialDemo />
        </div>

        {/* Zone des étapes à droite */}
        <div className="steps-container-right">
         

          {/* Affichage de l'étape active */}
          <div className="active-step-display">
            {steps.map((step) => (
              <div 
                key={step.number} 
                className={`step-content ${activeStep === step.number ? 'active' : ''}`}
              >
                <div className="step-number-large">{step.number.toString().padStart(2, '0')}</div>
                <h3 className="step-title-large">{step.title}</h3>
                <p className="step-description-large">{step.description}</p>
              </div>
            ))}
            
          </div>
           {/* Radio selector pour les étapes */}
          <div className="steps-radio-wrapper">
            <div className="radio-input">
              {steps.map((step) => (
                <label key={step.number}>
                  <input
                    type="radio"
                    name="step-radio"
                    value={step.number}
                    checked={activeStep === step.number}
                    onChange={() => setActiveStep(step.number)}
                  />
                  <span>{step.number}</span>
                </label>
              ))}
              <span className="selection" />
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
