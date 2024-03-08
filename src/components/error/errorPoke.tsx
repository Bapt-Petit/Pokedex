export default function PokeError() {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-blue-100">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">Le Pokémon est indisponible pour le moment.</h1>
        <img src="/image/pikachu-Triste.png" alt="Pikachu triste" className="max-w-sm mb-4" />
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retour
        </button>
      </div>
    );
  }
   