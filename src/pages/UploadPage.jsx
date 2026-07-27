import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, HelpCircle, X } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import UploadZone from '../components/upload/UploadZone';
import PhotoUploadStep from '../components/upload/PhotoUploadStep';
import AdditionalQuestionsStep from '../components/upload/AdditionalQuestionsStep';
import AnalyzingState from '../components/upload/AnalyzingState';
import ExportDemo from '../components/upload/ExportDemo';
import useAnalyzeConversation from '../hooks/useAnalyzeConversation';
import './UploadPage.css';

export default function UploadPage() {
  // Récupérer l'état sauvegardé depuis localStorage
  const savedState = JSON.parse(localStorage.getItem('uploadPageState') || '{}');
  
  // Si on était en train d'analyser et qu'on refresh, retourner à upload
  const initialStep = savedState.currentStep === 'analyzing' ? 'upload' : (savedState.currentStep || 'upload');
  
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState(savedState.selectedFileName || null);
  const [conversationStats, setConversationStats] = useState(savedState.conversationStats || null);
  const [participants, setParticipants] = useState(savedState.participants || []);
  const [photoData, setPhotoData] = useState(savedState.photoData || { photos: {}, previews: {} });
  const [questionAnswers, setQuestionAnswers] = useState(savedState.questionAnswers || null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { startAnalysis, waitForAnalysis, analyzing, error } = useAnalyzeConversation();
  const navigate = useNavigate();

  // Sauvegarder l'état dans localStorage à chaque changement
  useEffect(() => {
    const stateToSave = {
      currentStep,
      selectedFileName,
      conversationStats,
      participants,
      photoData,
      questionAnswers
    };
    localStorage.setItem('uploadPageState', JSON.stringify(stateToSave));
  }, [currentStep, selectedFileName, conversationStats, participants, photoData, questionAnswers]);

  // Nettoyer localStorage quand on quitte la page
  useEffect(() => {
    return () => {
      // Ne pas nettoyer si on est en train d'analyser
      if (currentStep !== 'analyzing') {
        localStorage.removeItem('uploadPageState');
      }
    };
  }, [currentStep]);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setSelectedFileName(file.name);
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!selectedFile || analyzing) return;

    // Démarrer l'analyse en arrière-plan
    startAnalysis(selectedFile);
    
    // Passer directement aux étapes suivantes
    setCurrentStep('photos');
  };

  const handleDetailsContinue = () => {
    setCurrentStep('photos');
  };

  const handlePhotosSubmit = (photos, previews) => {
    setPhotoData({ photos, previews });
    setCurrentStep('questions');
  };

  const handlePhotosSkip = () => {
    setPhotoData({ photos: {}, previews: {} });
    setCurrentStep('questions');
  };

  const handleQuestionsSubmit = (answers) => {
    setQuestionAnswers(answers);
    setCurrentStep('analyzing');
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Quand on arrive à l'étape analyzing, on attend la fin de l'analyse
  useEffect(() => {
    if (currentStep === 'analyzing' && analyzing) {
      waitForAnalysis().then((data) => {
        if (data) {
          // Récupérer les stats depuis la réponse de l'analyse
          if (data.stats) {
            setConversationStats(data.stats);
            setParticipants(data.stats.participants || []);
          }
          
          // Nettoyer localStorage avant de naviguer
          localStorage.removeItem('uploadPageState');
          
          // Naviguer vers la page de rapport
          navigate('/report', { 
            state: { 
              results: data,
              stats: data.stats,
              photoPreviews: photoData.previews,
              questionAnswers: questionAnswers
            } 
          });
        }
      }).catch((err) => {
        console.error('Erreur analyse:', err);
        localStorage.removeItem('uploadPageState');
        setCurrentStep('upload');
      });
    }
  }, [currentStep, analyzing, waitForAnalysis, navigate, photoData.previews, questionAnswers]);

  return (
    <>
      <Header />
      <main className="upload-page">
        <div className="upload-page-content">
          {currentStep === 'upload' && (
            <>
              <div className="upload-header">
                <h1 className="upload-page-title">Analyse de conversation</h1>
                <p className="upload-page-description">
                  Téléchargez votre archive de conversation WhatsApp pour obtenir une analyse détaillée de vos échanges.
                </p>
              </div>

              <div className="upload-main-section">
                <UploadZone 
                  onFileSelect={handleFileSelect}
                  disabled={analyzing}
                />

                {/* <button 
                  type="button" 
                  className="help-export-btn"
                  onClick={openModal}
                >
                  <HelpCircle size={20} strokeWidth={2} />
                  Comment exporter ?
                </button> */}

                {selectedFile && (
                  <button
                    type="button"
                    className="analyze-button"
                    onClick={handleAnalyze}
                    disabled={analyzing}
                    onTouchStart={(e) => e.currentTarget.classList.add('touch-active')}
                    onTouchEnd={(e) => e.currentTarget.classList.remove('touch-active')}
                  >
                    Lancer l'analyse
                  </button>
                )}

                {error && (
                  <div className="upload-error">
                    <AlertTriangle size={20} strokeWidth={2} /> {error}
                  </div>
                )}
              </div>
            </>
          )}

          {currentStep === 'photos' && (
            <PhotoUploadStep
              participants={participants}
              onPhotosSubmit={handlePhotosSubmit}
              onSkip={handlePhotosSkip}
            />
          )}

          {currentStep === 'questions' && (
            <AdditionalQuestionsStep
              onSubmit={handleQuestionsSubmit}
            />
          )}

          {currentStep === 'analyzing' && <AnalyzingState />}
        </div>
      </main>
      <Footer />

      {/* Modal ExportDemo */}
      {isModalOpen && (
        <div className="export-modal-overlay" onClick={closeModal}>
          <div className="export-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="export-modal-close" onClick={closeModal}>
              <X size={24} strokeWidth={2} />
            </button>
            <ExportDemo />
          </div>
        </div>
      )}
    </>
  );
}
