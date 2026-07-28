import { useState, useRef, useEffect, useCallback } from 'react';

// Détection automatique de l'URL de l'API
const API_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.MODE === 'development' && typeof window !== 'undefined'
    ? `${window.location.protocol}//${window.location.hostname}:3001`
    : '/api');

const POLLING_INTERVAL = 3000; // 3 secondes
const STORAGE_KEY = 'mike_analysis_id';

export default function useAnalyzeConversation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisId, setAnalysisId] = useState(() => {
    // Récupérer l'analysisId depuis localStorage au démarrage
    return localStorage.getItem(STORAGE_KEY) || null;
  });
  const pollingIntervalRef = useRef(null);
  const notificationPermissionGranted = useRef(false);

  // Demander la permission pour les notifications
  const requestNotificationPermission = useCallback(async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      try {
        const permission = await Notification.requestPermission();
        notificationPermissionGranted.current = permission === 'granted';
        return permission === 'granted';
      } catch (error) {
        console.warn('Erreur permission notification:', error);
        return false;
      }
    }
    notificationPermissionGranted.current = Notification.permission === 'granted';
    return Notification.permission === 'granted';
  }, []);

  // Afficher une notification
  const showNotification = useCallback((title, body) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        const notification = new Notification(title, {
          body,
          icon: '/logo.svg',
          badge: '/logo.svg',
          tag: 'mike-analysis',
          requireInteraction: false
        });
        
        // Fermer automatiquement après 10 secondes
        setTimeout(() => notification.close(), 10000);
        
        // Focus sur la fenêtre quand on clique sur la notification
        notification.onclick = () => {
          window.focus();
          notification.close();
        };
      } catch (error) {
        console.warn('Erreur affichage notification:', error);
      }
    }
  }, []);

  // Vérifier le statut de l'analyse
  const checkAnalysisStatus = useCallback(async (id) => {
    try {
      const apiEndpoint = API_URL.startsWith('/api') 
        ? `${API_URL}/analysis/${id}/status` 
        : `${API_URL}/api/analysis/${id}/status`;

      const response = await fetch(apiEndpoint);
      
      if (!response.ok) {
        if (response.status === 404) {
          // Analyse expirée ou introuvable
          localStorage.removeItem(STORAGE_KEY);
          setAnalysisId(null);
          setAnalyzing(false);
          setError('Analyse expirée ou introuvable');
          return null;
        }
        throw new Error('Erreur lors de la vérification du statut');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Erreur check status:', err);
      return null;
    }
  }, []);

  // Récupérer les résultats de l'analyse
  const fetchAnalysisResult = useCallback(async (id) => {
    try {
      const apiEndpoint = API_URL.startsWith('/api') 
        ? `${API_URL}/analysis/${id}/result` 
        : `${API_URL}/api/analysis/${id}/result`;

      const response = await fetch(apiEndpoint);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la récupération des résultats');
      }

      const data = await response.json();
      
      // Nettoyer localStorage
      localStorage.removeItem(STORAGE_KEY);
      setAnalysisId(null);
      setAnalyzing(false);
      setResults(data);
      
      // Afficher notification
      showNotification(
        '🎉 Analyse terminée !',
        'Votre rapport Mike est prêt à être consulté.'
      );
      
      return data;
    } catch (err) {
      console.error('Erreur fetch result:', err);
      setError(err.message);
      localStorage.removeItem(STORAGE_KEY);
      setAnalysisId(null);
      setAnalyzing(false);
      throw err;
    }
  }, [showNotification]);

  // Démarrer le polling
  const startPolling = useCallback((id) => {
    // Arrêter le polling précédent s'il existe
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
    }

    console.log('🔄 Démarrage du polling pour:', id);

    pollingIntervalRef.current = setInterval(async () => {
      const status = await checkAnalysisStatus(id);
      
      if (!status) {
        // Erreur ou analyse introuvable, arrêter le polling
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
        return;
      }

      console.log(`📊 Statut analyse ${id}:`, status.status);

      if (status.status === 'completed') {
        // Analyse terminée, récupérer les résultats
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
        await fetchAnalysisResult(id);
      } else if (status.status === 'error') {
        // Erreur pendant l'analyse
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
        localStorage.removeItem(STORAGE_KEY);
        setAnalysisId(null);
        setAnalyzing(false);
        setError('Erreur lors de l\'analyse');
      }
      // Si status === 'pending' ou 'processing', continuer le polling
    }, POLLING_INTERVAL);
  }, [checkAnalysisStatus, fetchAnalysisResult]);

  // Arrêter le polling
  const stopPolling = useCallback(() => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
  }, []);

  // Démarrer une nouvelle analyse
  const startAnalysis = useCallback(async (file) => {
    if (!file) {
      setError('Aucun fichier sélectionné');
      return null;
    }

    console.log('📤 startAnalysis appelé avec fichier:', file.name);

    // Demander la permission pour les notifications
    await requestNotificationPermission();

    setAnalyzing(true);
    setError(null);
    setResults(null);

    const formData = new FormData();
    formData.append('conversation', file);

    try {
      const apiEndpoint = API_URL.startsWith('/api') 
        ? `${API_URL}/analyze` 
        : `${API_URL}/api/analyze`;

      console.log('🌐 Appel API:', apiEndpoint);

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        body: formData,
      });

      console.log('📥 Réponse reçue, status:', response.status);

      const data = await response.json();
      console.log('📦 Data reçue:', data);

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Erreur lors de l\'analyse');
      }

      // Récupérer l'analysisId
      let newAnalysisId = data.analysisId;
      
      // COMPATIBILITÉ: Si l'ancien backend retourne directement les résultats
      if (!newAnalysisId && data.success && data.analysis) {
        console.log('⚠️ Backend ancien format détecté, utilisation directe des résultats');
        setAnalyzing(false);
        setResults(data);
        return 'legacy-mode'; // Indique qu'on a les résultats immédiatement
      }
      
      if (!newAnalysisId) {
        throw new Error('ID d\'analyse manquant dans la réponse');
      }

      console.log('✅ Analyse démarrée avec ID:', newAnalysisId);

      // Sauvegarder dans localStorage et state
      localStorage.setItem(STORAGE_KEY, newAnalysisId);
      setAnalysisId(newAnalysisId);

      // Démarrer le polling
      startPolling(newAnalysisId);

      return newAnalysisId;
    } catch (err) {
      console.error('Erreur startAnalysis:', err);
      setError(err.message);
      setAnalyzing(false);
      throw err;
    }
  }, [requestNotificationPermission, startPolling]);

  // Reprendre le polling si un analysisId existe au chargement
  useEffect(() => {
    if (analysisId && !pollingIntervalRef.current) {
      console.log('📥 Reprise du polling pour:', analysisId);
      setAnalyzing(true);
      startPolling(analysisId);
    }

    // Cleanup au démontage
    return () => {
      stopPolling();
    };
  }, [analysisId, startPolling, stopPolling]);

  const reset = useCallback(() => {
    stopPolling();
    setLoading(false);
    setError(null);
    setResults(null);
    setAnalyzing(false);
    setAnalysisId(null);
    localStorage.removeItem(STORAGE_KEY);
  }, [stopPolling]);

  return {
    startAnalysis,
    analyzing,
    error,
    results,
    analysisId,
    reset
  };
}
