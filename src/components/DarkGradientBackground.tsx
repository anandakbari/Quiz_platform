import React from 'react';

const DarkGradientBackground = () => {
  // Generate two types of curves for more variety
  const generateCurves = (count: number) => {
    const curves = [];
    
    // Long flowing curves
    for (let i = 0; i < count; i++) {
      const y1 = Math.random() * 1000;
      const y2 = Math.random() * 1000;
      const y3 = Math.random() * 1000;
      const y4 = Math.random() * 1000;
      
      const x1 = Math.random() * 300;
      const x2 = 300 + Math.random() * 400;

      curves.push({
        path: `M${-100} ${y1} C ${x1} ${y2}, ${x2} ${y3}, ${1100} ${y4}`,
        opacity: 0.03 + Math.random() * 0.04,
        strokeWidth: 1.5 + Math.random() * 1.5,
        delay: Math.random() * 5,
        duration: 20 + Math.random() * 10
      });
    }
    
    // Shorter accent curves
    for (let i = 0; i < count/2; i++) {
      const startX = Math.random() * 300;
      const startY = Math.random() * 1000;
      const endX = startX + 400 + Math.random() * 300;
      const endY = startY + (Math.random() - 0.5) * 400;
      
      const controlX1 = startX + (Math.random() * 200);
      const controlY1 = startY + (Math.random() - 0.5) * 200;
      const controlX2 = endX - (Math.random() * 200);
      const controlY2 = endY + (Math.random() - 0.5) * 200;

      curves.push({
        path: `M${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`,
        opacity: 0.02 + Math.random() * 0.03,
        strokeWidth: 0.5 + Math.random() * 1.5,
        delay: Math.random() * 8,
        duration: 15 + Math.random() * 10
      });
    }
    
    return curves;
  };

  // Generate floating particles
  const generateParticles = () => {
    const particles = [];
    for (let i = 0; i < 25; i++) {
      particles.push({
        x: Math.random() * 1000,
        y: Math.random() * 1000,
        size: 1 + Math.random() * 2,
        opacity: 0.1 + Math.random() * 0.2,
        delay: Math.random() * 5
      });
    }
    return particles;
  };

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Pure black background */}
      <div className="absolute inset-0 bg-black" />
      
      <svg
        className="absolute w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1000 1000"
      >
        <defs>
          <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="rgb(67, 56, 202)" stopOpacity="0.05" />
          </linearGradient>
          
          <linearGradient id="lineGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="rgb(129, 140, 248)" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        
        {/* Flowing lines layer */}
        {generateCurves(20).map((curve, index) => (
          <path
            key={`flow-${index}`}
            d={curve.path}
            stroke="url(#lineGlow)"
            strokeWidth={curve.strokeWidth}
            fill="none"
            opacity={curve.opacity}
            className="animate-pulse"
            style={{
              animationDuration: `${curve.duration}s`,
              animationDelay: `${curve.delay}s`
            }}
          />
        ))}
        
        {/* Floating particles */}
        {generateParticles().map((particle, index) => (
          <circle
            key={`particle-${index}`}
            cx={particle.x}
            cy={particle.y}
            r={particle.size}
            fill="rgb(99, 102, 241)"
            opacity={particle.opacity}
            className="animate-pulse"
            style={{
              animationDuration: '8s',
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}
      </svg>
      
      {/* Subtle vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.5) 100%)',
          mixBlendMode: 'multiply'
        }}
      />
    </div>
  );
};

export default DarkGradientBackground;