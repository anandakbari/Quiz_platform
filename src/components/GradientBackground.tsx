import React from 'react';

const GradientBackground = () => {
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
      const x3 = Math.random() * 1000;

      curves.push({
        path: `M${-100} ${y1} C ${x1} ${y2}, ${x2} ${y3}, ${1100} ${y4}`,
        opacity: 0.1 + Math.random() * 0.3,
        strokeWidth: 1 + Math.random() * 3,
        delay: Math.random() * 5,
        color: Math.random() > 0.5 ? "rgb(224, 231, 255)" : "rgb(199, 210, 254)"
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
        opacity: 0.05 + Math.random() * 0.15,
        strokeWidth: 0.5 + Math.random() * 2,
        delay: Math.random() * 8,
        color: "rgb(238, 242, 255)"
      });
    }
    
    return curves;
  };

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Background layer of curves */}
      <svg
        className="absolute w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1000 1000"
      >
        {generateCurves(20).map((curve, index) => (
          <path
            key={`bg-${index}`}
            d={curve.path}
            stroke={curve.color}
            strokeWidth={curve.strokeWidth}
            fill="none"
            opacity={curve.opacity}
            className="animate-pulse"
            style={{
              animationDuration: `${8 + curve.delay}s`,
              animationDelay: `${curve.delay}s`
            }}
          />
        ))}
      </svg>
      
      {/* Foreground layer of curves */}
      <svg
        className="absolute w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1000 1000"
      >
        {generateCurves(15).map((curve, index) => (
          <path
            key={`fg-${index}`}
            d={curve.path}
            stroke={curve.color}
            strokeWidth={curve.strokeWidth}
            fill="none"
            opacity={curve.opacity}
            className="animate-pulse"
            style={{
              animationDuration: `${10 + curve.delay}s`,
              animationDelay: `${curve.delay + 2}s`
            }}
          />
        ))}
      </svg>
      
      {/* Extra subtle short curves */}
      <svg
        className="absolute w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1000 1000"
      >
        {generateCurves(10).map((curve, index) => (
          <path
            key={`accent-${index}`}
            d={curve.path}
            stroke={curve.color}
            strokeWidth={curve.strokeWidth * 0.5}
            fill="none"
            opacity={curve.opacity * 0.7}
            className="animate-pulse"
            style={{
              animationDuration: `${6 + curve.delay}s`,
              animationDelay: `${curve.delay + 4}s`
            }}
          />
        ))}
      </svg>

      {/* Subtle gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/5 to-transparent" />
    </div>
  );
};

export default GradientBackground;