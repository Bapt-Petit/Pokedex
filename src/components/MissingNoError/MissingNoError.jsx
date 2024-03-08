import React from 'react';

export default function MissingNo() {
  const glitchStyles = {
    textShadow: `3px 3px 0px #FF0000, -3px -3px 0px #0000FF`,
  };

  return (
    <div className="bg-black text-white h-screen overflow-hidden p-10">
      <h1 className="text-5xl font-bold animate-pulse" style={glitchStyles}>
        404 - Pokémon Not Found
      </h1>
      <h2 className="text-2xl mt-4 mb-8">
        Oh non! Il semblerait que MissingNo. ait corrompu cette page !
      </h2>
      <p className="text-lg mt-8">
        Veuillez <button onClick={() => window.history.back()} className="underline z-10 absolute">retourner en lieu sûr</button>.
      </p>      
      <div className="animate-bounce">
        <img src="/image/MissingNo.svg.png" alt="MissingNo" className="opacity-50 max-w-xs mx-auto" />
      </div>

      <div className="absolute top-0 right-0 bottom-0 left-0 pointer-events-none">
        <div className="glitch" aria-hidden="true"></div>
      </div>
      
      <style jsx>{`
        .glitch {
          animation: glitch-animation 2s infinite;
        }

        @keyframes glitch-animation {
          0% {
            clip: rect(42px, 9999px, 14px, 0);
            transform: skew(0.27deg);
          }
          5% {
            clip: rect(88px, 9999px, 47px, 0);
            transform: skew(0.27deg);
          }
          10% {
            clip: rect(5px, 9999px, 75px, 0);
            transform: skew(0.27deg);
          }
          /* ... */
          95% {
            clip: rect(85px, 9999px, 70px, 0);
            transform: skew(0.27deg);
          }
          100% {
            clip: rect(30px
, 9999px, 65px, 0);
transform: skew(0.27deg);
}
}
`}</style>
</div>
);
}