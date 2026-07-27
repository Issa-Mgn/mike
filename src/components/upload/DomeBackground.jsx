import { useEffect, useRef } from 'react';
import DomeGallery from './DomeGallery';

export default function App() {
  const rotationRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const animate = () => {
      rotationRef.current += 0.1; // ⚙️ VITESSE DE ROTATION
      
      const sphere = document.querySelector('.sphere');
      if (sphere) {
        sphere.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(0deg) rotateY(${rotationRef.current}deg)`;
      }
      
      rafRef.current = requestAnimationFrame(animate);
    };
    
    rafRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', background: '#e6e8ec' }}>
      <DomeGallery
        fit={0.28}                   // 🎯 Réduit à 0.28 pour que la sphère entière rentre sans être rognée
        minRadius={250}              // 📏 Rayon minimal ajusté
        maxVerticalRotationDeg={90}  
        segments={34}               
        dragDampening={0}          
        grayscale
        overlayBlurColor="#e6e8ec"
        autoRotate={false}          
      />
    </div>
  );
}