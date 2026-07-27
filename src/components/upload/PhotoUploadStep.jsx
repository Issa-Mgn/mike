import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import DomeBackground from './DomeBackground';
import './PhotoUploadStep.css';

export default function PhotoUploadStep({ participants, onPhotosSubmit, onSkip }) {
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  const handlePhotoChange = (file) => {
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContinue = () => {
    if (photoFile) {
      onPhotosSubmit({ photo: photoFile }, { photo: currentPhoto });
    }
  };

  const handleChangePhoto = () => {
    setCurrentPhoto(null);
    setPhotoFile(null);
  };

  return (
    <div className="photo-upload-step">
      {/* 1. SECTION GLOBE */}
      <div className="photo-globe-section">
        <DomeBackground />
      </div>

      {/* 2. SECTION CONTENU (Header + Boutons) */}
      <div className="photo-content-section">
        <div className="photo-content-wrapper">
          <div className="photo-header">
            <h2 className="photo-title">Ajoute une photo</h2>
            <div className="photo-header-bottom">
              <p className="photo-subtitle">Rends le rapport plus vivant (optionnel)</p>
              <button onClick={onSkip} className="photo-skip-btn-inline">
                Passer
              </button>
            </div>
          </div>

          <div className="photo-main-area">
            {!currentPhoto ? (
              <label className="photo-upload-label-main">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlePhotoChange(e.target.files[0])}
                  className="photo-input-hidden"
                />
                <span className="photo-upload-text-main">Ajouter une photo</span>
              </label>
            ) : (
              <div className="photo-preview-container">
                <div className="photo-preview-card">
                  <img 
                    src={currentPhoto} 
                    alt="Aperçu"
                    className="photo-preview-image"
                  />
                </div>
                <div className="photo-actions">
                  <button 
                    onClick={handleChangePhoto} 
                    className="photo-change-btn"
                  >
                    Changer la photo
                  </button>
                  <button 
                    onClick={handleContinue} 
                    className="photo-continue-btn"
                  >
                    Continuer
                    <ArrowRight size={20} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}