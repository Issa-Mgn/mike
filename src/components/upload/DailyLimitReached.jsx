import { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import './DailyLimitReached.css';

export default function DailyLimitReached({ remainingTime, lastAnalysis }) {
  const [timeLeft, setTimeLeft] = useState(remainingTime);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1000) {
          // Temps écoulé, recharger la page
          window.location.reload();
          return 0;
        }
        return prev - 1000;
      });
      // Mettre à jour l'heure actuelle chaque seconde
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Calculer heures, minutes, secondes du compte à rebours
  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  
  // Calculer les angles des aiguilles pour l'heure ACTUELLE
  const currentHours = currentTime.getHours() % 12;
  const currentMinutes = currentTime.getMinutes();
  const currentSeconds = currentTime.getSeconds();
  
  const secondAngle = (currentSeconds / 60) * 360;
  const minuteAngle = ((currentMinutes + currentSeconds / 60) / 60) * 360;
  const hourAngle = ((currentHours + currentMinutes / 60) / 12) * 360;
  
  // Date de la prochaine analyse
  const nextAnalysisDate = new Date(Date.now() + timeLeft);
  const formattedDate = nextAnalysisDate.toLocaleString('fr-FR', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  return (
    <div className="daily-limit-container">
      <div className="daily-limit-card">
        {/* Horloge réaliste avec aiguilles animées à l'heure actuelle */}
        <div className="realistic-clock">
          <div className="clock-face">
            <div className="glass-cover" />
            <div 
              className="hour hand" 
              style={{ transform: `translateX(-50%) rotate(${hourAngle}deg)` }}
            />
            <div 
              className="minute hand" 
              style={{ transform: `translateX(-50%) rotate(${minuteAngle}deg)` }}
            />
            <div 
              className="second hand" 
              style={{ transform: `translateX(-50%) rotate(${secondAngle}deg)` }}
            />
            <div className="center-circle" />
            <div className="clock-numbers">
              <p style={{top: '10px', left: '50%', transform: 'translateX(-50%)'}} className="number">12</p>
              <p style={{top: '50%', right: '15px', transform: 'translateY(-50%)'}} className="number">3</p>
              <p style={{bottom: '10px', left: '50%', transform: 'translateX(-50%)'}} className="number">6</p>
              <p style={{top: '50%', left: '15px', transform: 'translateY(-50%)'}} className="number">9</p>
            </div>
          </div>
        </div>
        
        <h2 className="daily-limit-title">Limite quotidienne atteinte</h2>
        
        <p className="daily-limit-text">
          Vous avez déjà effectué votre analyse gratuite aujourd'hui. 
          Pour protéger nos ressources, nous limitons à <strong>1 analyse par jour</strong>.
        </p>
        
        <div className="daily-limit-timer">
          <div className="timer-label">Prochaine analyse disponible dans:</div>
          
          <div className="timer-display">
            <div className="timer-unit">
              <div className="timer-value">{String(hours).padStart(2, '0')}</div>
              <div className="timer-unit-label">heures</div>
            </div>
            
            <div className="timer-separator">:</div>
            
            <div className="timer-unit">
              <div className="timer-value">{String(minutes).padStart(2, '0')}</div>
              <div className="timer-unit-label">minutes</div>
            </div>
            
            <div className="timer-separator">:</div>
            
            <div className="timer-unit">
              <div className="timer-value">{String(seconds).padStart(2, '0')}</div>
              <div className="timer-unit-label">secondes</div>
            </div>
          </div>
          
          <div className="timer-next-date">
            Disponible le {formattedDate}
          </div>
        </div>
        
        <div className="daily-limit-info">
          <AlertCircle size={16} />
          <span>Cette page se rechargera automatiquement quand vous pourrez analyser à nouveau</span>
        </div>
      </div>
    </div>
  );
}
