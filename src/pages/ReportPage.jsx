import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import VerdictGlobal from '../components/report/VerdictGlobal';
import ParticipantCard from '../components/report/ParticipantCard';
import AwardsList from '../components/report/AwardsList';
import VerdictFinal from '../components/report/VerdictFinal';
import './ReportPage.css';

export default function ReportPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results;
  const stats = location.state?.stats;
  const photoPreviews = location.state?.photoPreviews || {};
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!results) {
      navigate('/upload');
    }
  }, [results, navigate]);

  if (!results) {
    return null;
  }

  const { analysis } = results;
  const conversationStats = stats || results.stats;
  const photoPreview = photoPreviews.photo;

  return (
    <>
      <Header />
      <main className="report-page">
        <div className="report-page-content">
          {/* Hero section */}
          <div className="report-hero">
            <h1 className="report-title">Rapport d'analyse</h1>
            <div className="report-meta">
              <div className="meta-item">
                <span className="meta-label">Messages</span>
                <span className="meta-value">{conversationStats?.totalMessages || 'N/A'}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Participants</span>
                <span className="meta-value">{conversationStats?.participantCount || 'N/A'}</span>
              </div>
            </div>
            <Link to="/upload" className="new-analysis-button">
              Nouvelle analyse
            </Link>
          </div>


          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'overview' && (
              <div className="tab-panel">
                <VerdictGlobal 
                  verdict={analysis.verdict_global}
                  stats={conversationStats}
                  photoPreview={photoPreview}
                />
                
                {analysis.dynamiques_cachees && (
                  <section className="dynamiques">
                    <h2>DYNAMIQUES CACHÉES</h2>
                    <p>{analysis.dynamiques_cachees}</p>
                  </section>
                )}
              </div>
            )}

            {activeTab === 'participants' && (
              <div className="tab-panel">
                <div className="participants-grid">
                  {analysis.participants.map((participant, index) => (
                    <ParticipantCard 
                      key={index} 
                      participant={participant} 
                      index={index}
                      photoPreview={photoPreviews[participant.nom]}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'awards' && (
              <div className="tab-panel">
                <AwardsList awards={analysis.awards} />
                
                {analysis.verdict_final && (
                  <VerdictFinal verdict={analysis.verdict_final} />
                )}
              </div>
              
            )}
            
          {/* Tabs Navigation */}
          <div className="tabs-nav">
            <button 
              className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Vue d'ensemble
            </button>
            <button 
              className={`tab-button ${activeTab === 'participants' ? 'active' : ''}`}
              onClick={() => setActiveTab('participants')}
            >
              Participants
            </button>
            <button 
              className={`tab-button ${activeTab === 'awards' ? 'active' : ''}`}
              onClick={() => setActiveTab('awards')}
            >
              Awards & Verdict
            </button>
          </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}