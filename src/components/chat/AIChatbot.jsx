import { useState, useRef, useEffect } from 'react';
import { Bot, Send, X } from 'lucide-react';
import './AIChatbot.css';

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Salut ! Je suis l\'assistant Mike. Comment puis-je t\'aider ?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // URLs des avatars
  const botAvatarUrl = "https://i.pinimg.com/736x/c8/b8/52/c8b852f41c10ef1830dda72bc8f69aca.jpg";
  const userAvatarUrl = "https://i.pinimg.com/736x/28/bc/64/28bc645764c0022f393b6e842d1b6d85.jpg";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Appel à l'API backend
      const apiUrl = `http://${window.location.hostname}:3001/api/chat`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la requête');
      }

      const data = await response.json();
      
      const botResponse = {
        role: 'assistant',
        content: data.response
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Erreur chat:', error);
      const errorResponse = {
        role: 'assistant',
        content: 'Désolé, une erreur s\'est produite. Réessaie dans un instant ! 😅'
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Bouton flottant */}
      <button 
        className="chatbot-trigger"
        onClick={toggleChat}
        aria-label="Ouvrir le chat"
      >
        <img 
          src={botAvatarUrl} 
          alt="Assistant IA"
          className="chatbot-avatar"
        />
      </button>

      {/* Arrière-plan sombre (Backdrop) */}
      <div 
        className={`chatbot-overlay ${isOpen ? 'open' : ''}`}
        onClick={toggleChat}
      />

      {/* Fenêtre de chat (Modal Bottom-Sheet) */}
      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <div className="chatbot-header-content">
            <img 
              src={botAvatarUrl} 
              alt="Assistant"
              className="chatbot-header-avatar"
            />
            <div>
              <h3 className="chatbot-title">Assistant Mike</h3>
              <p className="chatbot-status">En ligne</p>
            </div>
          </div>
          <button 
            className="chatbot-close"
            onClick={toggleChat}
            aria-label="Fermer"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`chat-message ${msg.role}`}
            >
              <img 
                src={msg.role === 'assistant' ? botAvatarUrl : userAvatarUrl} 
                alt={msg.role === 'assistant' ? 'Bot' : 'Utilisateur'}
                className="message-avatar"
              />
              <div className="message-bubble">
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="chat-message assistant">
              <img 
                src={botAvatarUrl} 
                alt="Bot"
                className="message-avatar"
              />
              <div className="message-bubble typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="chatbot-input-form" onSubmit={handleSubmit}>
          {/* Avatar de l'utilisateur à gauche de l'input */}
          <img 
            src={userAvatarUrl} 
            alt="Utilisateur"
            className="message-avatar"
          />
          <input
            type="text"
            className="chatbot-input"
            placeholder="Pose ta question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <button 
            type="submit" 
            className="chatbot-send"
            disabled={loading || !input.trim()}
          >
            <Send size={18} strokeWidth={2} />
          </button>
        </form>
      </div>
    </>
  );
}