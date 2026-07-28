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
import DailyLimitReached from '../components/upload/DailyLimitReached';
import useAnalyzeConversation from '../hooks/useAnalyzeConversation';
import './UploadPage.css';

export default function UploadPage() {
  // Récupérer l'état sauvegardé depuis localStorage
  const savedState = JSON.parse(localStorage.getItem('uploadPageState') || '{}');
  
  const [currentStep, setCurrentStep] = useState(savedState.currentStep || 'upload');
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState(savedState.selectedFileName || null);
  const [photoData, setPhotoData] = useState(savedState.photoData || { photos: {}, previews: {} });
  const [questionAnswers, setQuestionAnswers] = useState(savedState.questionAnswers || null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dailyLimitReached, setDailyLimitReached] = useState(false);
  const [limitData, setLimitData] = useState(null);
  const [checkingLimit, setCheckingLimit] = useState(true);
  
  const { startAnalysis, analyzing, results, error, analysisId } = useAnalyzeConversation();
  const navigate = useNavigate();

  // Vérifier la limite quotidienne au chargement
  useEffect(() => {
    const checkDailyLimit = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        const endpoint = apiUrl.startsWith('/api') 
          ? `${apiUrl}/can-analyze` 
          : `${apiUrl}/api/can-analyze`;

        const response = await fetch(endpoint);
        const data = await response.json();

        if (!data.allowed) {
          setDailyLimitReached(true);
          setLimitData({
            remainingTime: data.remainingTime,
            lastAnalysis: data.lastAnalysis
          });
        }
      } catch (err) {
        console.error('Erreur vérification limite:', err);
        // En cas d'erreur, autoriser l'accès
      } finally {
        setCheckingLimit(false);
      }
    };

    checkDailyLimit();
  }, []);

  // Sauvegarder l'état dans localStorage à chaque changement (sauf analyzing)
  useEffect(() => {
    if (currentStep !== 'analyzing') {
      const stateToSave = {
        currentStep,
        selectedFileName,
        photoData,
        questionAnswers
      };
      localStorage.setItem('uploadPageState', JSON.stringify(stateToSave));
    }
  }, [currentStep, selectedFileName, photoData, questionAnswers]);

  // Si on a un analysisId actif, passer à l'étape analyzing
  useEffect(() => {
    if (analysisId && analyzing && currentStep !== 'analyzing') {
      setCurrentStep('analyzing');
    }
  }, [analysisId, analyzing, currentStep]);

  // Quand les résultats arrivent, naviguer vers le rapport
  useEffect(() => {
    if (results && !analyzing) {
      console.log('✅ Résultats reçus, navigation vers le rapport');
      
      // Nettoyer localStorage
      localStorage.removeItem('uploadPageState');
      
      // Naviguer vers la page de rapport
      navigate('/report', { 
        state: { 
          results: results,
          stats: results.stats,
          photoPreviews: photoData.previews,
          questionAnswers: questionAnswers
        } 
      });
    }
  }, [results, analyzing, navigate, photoData.previews, questionAnswers]);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setSelectedFileName(file.name);
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!selectedFile || analyzing) return;

    console.log('🚀 Démarrage de l\'analyse...');

    try {
      // Démarrer l'analyse directement (le hook gère la demande de permission)
      const analysisId = await startAnalysis(selectedFile);
      
      if (analysisId === 'legacy-mode') {
        // Mode ancien backend: les résultats arrivent immédiatement
        console.log('📊 Mode legacy: résultats immédiats, skip des étapes intermédiaires');
        // Les résultats vont trigger l'effet qui navigue vers /report
      } else if (analysisId) {
        console.log('✅ Analyse démarrée avec ID:', analysisId);
        // Nouveau mode: passer aux étapes suivantes
        setCurrentStep('photos');
      } else {
        console.error('❌ Pas d\'analysisId retourné');
      }
    } catch (err) {
      console.error('❌ Erreur démarrage analyse:', err);
      
      // Vérifier si c'est une erreur 429 (limite quotidienne)
      if (err.message.includes('429') || err.message.includes('Limite')) {
        // L'erreur sera gérée par le state error du hook
        console.log('🚫 Limite quotidienne détectée');
      }
    }
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

  // Afficher le composant de limite si atteinte
  if (checkingLimit) {
    return (
      <>
        <Header />
        <main className="upload-page">
          <div className="upload-page-content">
            <p style={{ textAlign: 'center', color: '#6b7280' }}>Vérification...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (dailyLimitReached && limitData) {
    return (
      <>
        <Header />
        <DailyLimitReached 
          remainingTime={limitData.remainingTime}
          lastAnalysis={limitData.lastAnalysis}
        />
        <Footer />
      </>
    );
  }

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
              participants={[]}
              onPhotosSubmit={handlePhotosSubmit}
              onSkip={handlePhotosSkip}
            />
          )}

          {currentStep === 'questions' && (
            <AdditionalQuestionsStep
              onSubmit={handleQuestionsSubmit}
            />
          )}

          {currentStep === 'analyzing' && (
            <AnalyzingState 
              message="Vous pouvez fermer cette page, vous recevrez une notification quand l'analyse sera prête !"
            />
          )}
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
