import Loader from './Loader';
import './AnalyzingState.css';

export default function AnalyzingState() {
  return (
    <div className="analyzing-state">
      <Loader />
      <p className="analyzing-title">Mike analyse la conversation...</p>
      <p className="analyzing-subtitle">
        Ça peut prendre jusqu'à 5 minutes sur des conversations longues
      </p>
    </div>
  );
}
