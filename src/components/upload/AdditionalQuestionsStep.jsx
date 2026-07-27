import { useState } from 'react';
import { 
  Laugh, 
  Drama, 
  Zap, 
  MessageCircle, 
  Flame, 
  Heart, 
  Users, 
  TrendingUp, 
  Sparkles,
  Target,
  ArrowRight
} from 'lucide-react';
import './AdditionalQuestionsStep.css';

export default function AdditionalQuestionsStep({ onSubmit }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({
    humor_level: 5,
    drama_level: 5,
    chaos_level: 5,
    intimacy_level: 5,
    intensity_level: 5,
    affection_level: 5,
    engagement_level: 5,
    activity_level: 5,
    vibe_level: 5,
    connection_level: 5
  });

  const questions = [
    {
      key: 'humor_level',
      label: 'Niveau d\'humour',
      icon: Laugh,
      color: '#f59e0b',
      min: 'Sérieux',
      max: 'Hilarant'
    },
    {
      key: 'drama_level',
      label: 'Niveau de drama',
      icon: Drama,
      color: '#8b5cf6',
      min: 'Zen',
      max: 'Explosif'
    },
    {
      key: 'chaos_level',
      label: 'Niveau de chaos',
      icon: Zap,
      color: '#ef4444',
      min: 'Organisé',
      max: 'Anarchie'
    },
    {
      key: 'intimacy_level',
      label: 'Niveau d\'intimité',
      icon: MessageCircle,
      color: '#3b82f6',
      min: 'Formel',
      max: 'Intime'
    },
    {
      key: 'intensity_level',
      label: 'Intensité émotionnelle',
      icon: Flame,
      color: '#f97316',
      min: 'Calme',
      max: 'Intense'
    },
    {
      key: 'affection_level',
      label: 'Niveau d\'affection',
      icon: Heart,
      color: '#ec4899',
      min: 'Neutre',
      max: 'Affectueux'
    },
    {
      key: 'engagement_level',
      label: 'Engagement du groupe',
      icon: Users,
      color: '#10b981',
      min: 'Passif',
      max: 'Très actif'
    },
    {
      key: 'activity_level',
      label: 'Fréquence d\'activité',
      icon: TrendingUp,
      color: '#06b6d4',
      min: 'Occasionnel',
      max: 'Constant'
    },
    {
      key: 'vibe_level',
      label: 'Ambiance générale',
      icon: Sparkles,
      color: '#a855f7',
      min: 'Morne',
      max: 'Électrique'
    },
    {
      key: 'connection_level',
      label: 'Niveau de connexion',
      icon: Target,
      color: '#14b8a6',
      min: 'Distant',
      max: 'Fusionnel'
    }
  ];

  const handleSliderChange = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: parseInt(value) }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onSubmit(answers);
    }
  };

  const question = questions[currentQuestion];
  const IconComponent = question.icon;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="additional-questions-step">
      <div className="questions-header">
        <h2 className="questions-title">Quelques questions sur la conversation</h2>
        <p className="questions-description">
          Question {currentQuestion + 1} sur {questions.length}
        </p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="question-card-single">
        <div className="question-header">
          <IconComponent 
            className="question-icon" 
            size={48} 
            color={question.color}
            strokeWidth={2}
          />
          <h3 className="question-label">{question.label}</h3>
        </div>
        
        <div className="slider-container">
          <input
            type="range"
            min="1"
            max="10"
            value={answers[question.key]}
            onChange={(e) => handleSliderChange(question.key, e.target.value)}
            className="slider"
            style={{
              '--slider-color': question.color
            }}
          />
          <div className="slider-value-display">
            {answers[question.key]}/10
          </div>
        </div>

        <div className="slider-labels">
          <span className="slider-label-min">{question.min}</span>
          <span className="slider-label-max">{question.max}</span>
        </div>
      </div>

      <button onClick={handleNext} className="questions-next-btn">
        {currentQuestion < questions.length - 1 ? (
          <>
            Suivant <ArrowRight size={20} strokeWidth={2.5} />
          </>
        ) : (
          'Terminer'
        )}
      </button>
    </div>
  );
}
