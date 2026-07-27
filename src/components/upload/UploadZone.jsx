import { useState } from 'react';
import { FileArchive } from 'lucide-react';
import './UploadZone.css';

export default function UploadZone({ onFileSelect, disabled }) {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleFileChange = (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.name.endsWith('.zip')) {
      setFile(selectedFile);
      onFileSelect(selectedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.name.endsWith('.zip')) {
      setFile(droppedFile);
      onFileSelect(droppedFile);
    }
  };

  return (
    <div
      className={`upload-zone ${dragging ? 'dragging' : ''} ${disabled ? 'disabled' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="upload-zone-content">
        <p className="upload-zone-title">Upload ton export WhatsApp</p>
        <p className="upload-zone-instruction">
          Dépose ton fichier .zip ici ou clique pour sélectionner
        </p>
        
        <input
          type="file"
          id="file-input"
          className="upload-input"
          accept=".zip"
          onChange={handleFileChange}
          disabled={disabled}
        />
        
        <button
          type="button"
          className="upload-button"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('file-input').click();
          }}
          disabled={disabled}
        >
          Sélectionner un fichier
        </button>

        {file && (
          <div className="file-selected">
            <FileArchive size={20} color="#10b981" strokeWidth={2} /> {file.name}
          </div>
        )}

        <p className="upload-zone-help">
          Comment exporter ? WhatsApp → Discussion → Menu → Plus → Exporter → Sans média
        </p>
      </div>
    </div>
  );
}