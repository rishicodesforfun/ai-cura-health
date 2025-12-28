import React from "react";

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Base dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
      
      {/* Animated Particles */}
      <div className="absolute inset-0">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Light Trails */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="neonGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <linearGradient id="neonGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        
        {/* Swirling light trails */}
        {[...Array(25)].map((_, i) => {
          const startX = Math.random() * 1920;
          const startY = Math.random() * 1080;
          const endX = Math.random() * 1920;
          const endY = Math.random() * 1080;
          const midX = (startX + endX) / 2 + (Math.random() - 0.5) * 400;
          const midY = (startY + endY) / 2 + (Math.random() - 0.5) * 400;
          
          return (
            <path
              key={i}
              d={`M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`}
              stroke={i % 2 === 0 ? "url(#neonGradient1)" : "url(#neonGradient2)"}
              strokeWidth="0.5"
              fill="none"
              opacity="0.3"
              className="animate-pulse"
              style={{
                animationDuration: `${3 + Math.random() * 5}s`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          );
        })}
        
        {/* Glowing nodes */}
        {[...Array(20)].map((_, i) => (
          <circle
            key={i}
            cx={Math.random() * 1920}
            cy={Math.random() * 1080}
            r="1.5"
            fill="#06b6d4"
            className="animate-pulse"
            style={{
              animationDuration: `${2 + Math.random() * 3}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default AnimatedBackground;
