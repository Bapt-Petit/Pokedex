import React, { useState } from 'react';

interface FlipCardProps {
  frontContent: React.ReactNode; // Contenu de la face avant de la carte
  backContent: React.ReactNode; // Contenu de la face arrière de la carte
}

const FlipCard: React.FC<FlipCardProps> = ({ frontContent, backContent }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="perspective">
      <div
        className={`w-full h-full transition-transform duration-700 ease-in-out ${isFlipped ? 'rotate-y-180' : ''}`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className="absolute w-full h-full backface-hidden">
          {frontContent}
        </div>
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          {backContent}
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
