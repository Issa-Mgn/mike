import { useState, useRef } from 'react';

// Détection automatique de l'URL de l'API
const API_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.MODE === 'development' && typeof window !== 'undefined'
    ? `${window.location.protocol}//${window.location.hostname}:3001`
    : '/api');

export default function useAnalyzeConversation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const analysisPromiseRef = useRef(null);

  // Démarre l'analyse en arrière-plan sans attendre
  const startAnalysis = (file) => {
    if (!file) {
      setError('Aucun fichier sélectionné');
      return;
    }

    setAnalyzing(true);
    setError(null);
    setResults(null);

    const formData = new FormData();
    formData.append('conversation', file);

    const apiEndpoint = API_URL.startsWith('/api') 
      ? `${API_URL}/analyze` 
      : `${API_URL}/api/analyze`;

    // Lance l'analyse en arrière-plan
    analysisPromiseRef.current = fetch(apiEndpoint, {
      method: 'POST',
      body: formData,
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || data.error || 'Erreur lors de l\'analyse');
        }
        setResults(data);
        setAnalyzing(false);
        return data;
      })
      .catch((err) => {
        setError(err.message);
        setAnalyzing(false);
        throw err;
      });

    return analysisPromiseRef.current;
  };

  // Attend que l'analyse soit terminée
  const waitForAnalysis = async () => {
    if (analysisPromiseRef.current) {
      setLoading(true);
      try {
        const data = await analysisPromiseRef.current;
        return data;
      } finally {
        setLoading(false);
      }
    }
    return results;
  };

  // Méthode originale pour compatibilité
  const analyzeConversation = async (file) => {
    if (!file) {
      setError('Aucun fichier sélectionné');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    const formData = new FormData();
    formData.append('conversation', file);

    try {
      const apiEndpoint = API_URL.startsWith('/api') 
        ? `${API_URL}/analyze` 
        : `${API_URL}/api/analyze`;
        
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Erreur lors de l\'analyse');
      }

      setResults(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setLoading(false);
    setError(null);
    setResults(null);
    setAnalyzing(false);
    analysisPromiseRef.current = null;
  };

  return {
    analyzeConversation,
    startAnalysis,
    waitForAnalysis,
    loading,
    analyzing,
    error,
    results,
    reset
  };
}
