"use client";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "@/app/Loading";
import PokeError from "@/components/error/errorPoke";
import MissingNo from "@/components/MissingNoError/MissingNoError";

interface PokemonSoloProps {
  id: number;
  name: {
    fr: string;
    en: string;
    jp: string;
  };
  sprites: {regular : string;};
  image: string;
 
  types :Array<{
    name: string;
    image: string;
  }>
  stats: {hp: number;atk: number;def: number;spe_atk:number;spe_def:number;vit: number;};

  resistances: Array<{
    name: string;
    multiplier:number;
  }>
  generation: number;
  pokedex_id: number;

talents:Array<{
  name : string;
  image: string;
}>;
  evolution: {
    pre: Array<{
      pokedex_id: number;
      name: string;
      condition: string;
    }> | null;
    next: Array<{
      pokedex_id: number;
      name: string;
      condition: string;
    }> | null;
    mega: null; // ou la structure appropriée si les méga évolutions sont incluses
  };
}

const PokemonDetailPage = ({ params }: { params: { name: string } }) => {
  const [pokemonSolo, setPokemonSolo] = useState<PokemonSoloProps | null>(null);
  const pokemonName = decodeURIComponent(params.name);
  console.log(pokemonName);
  
  useEffect(() => {
    const fetchPokemonSolo = async (name: string) => {
      try {
        const response = await fetch(
          `https://tyradex.vercel.app/api/v1/pokemon/${name}`
        );
        if (!response.ok) {
          throw new Error(`Erreur: ${response.status}`);
        }
        const data = await response.json();
        setPokemonSolo(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };

    fetchPokemonSolo(params.name);
  }, [params.name]);

  if ( params.name === 'MissingNo.') {
    return <MissingNo/>;
  }
  if (!pokemonSolo) return <LoadingSpinner />;
  // if (!pokemonSolo.name) return <PokeError />;
  // if (!pokemonSolo || !pokemonSolo.name) {
  //   // Afficher un message de chargement ou une autre UI pour indiquer que les données sont en cours de chargement
  //   return <div>Chargement...</div>;
    
    
  // }

  return (
    <div className="max-w-2xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      <button
        onClick={() => window.history.back()}
        className="mb-5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Retour
      </button>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        {pokemonName}
      </h1>
      <h2 className="text-xl text-gray-700">
        Numéro de Pokédex n°{pokemonSolo.pokedex_id}
      </h2>
      <h3 className="text-lg text-gray-600 mb-4">
        Pokemon de génération : {pokemonSolo.generation}
      </h3>
      <img
        src={pokemonSolo?.sprites?.regular} alt={`Sprite de ${pokemonSolo?.name?.fr}`}
       
        className="mx-auto h-96 w-96 mb-2 -mt-10"
      />

      <div className="mt-4 mx-14 flex justify-around">
        {pokemonSolo?.types && pokemonSolo.types.map((type,typeIndex) => (
          <div
            key={typeIndex}
            className="inline-flex items-center mr-2 mb-2 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
          >
            <img className="w-6 h-6" src={type.image}  />
            <p className="ml-2">{type.name}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 mx-14 flex justify-around">
        <p>Talent possible :</p>
        {pokemonSolo?.talents?.map((type, typeIndex) => (
          <div
            key={typeIndex}
            className="inline-flex items-center mr-2 mb-2 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
          >
            <p>{type.name}</p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Statistique
        </h2>
        <p>
          HP: <span className="font-semibold">{pokemonSolo?.stats?.hp}</span>
        </p>
        <p>
          Attack: <span className="font-semibold">{pokemonSolo?.stats?.atk}</span>
        </p>
        <p>
          Défense:{" "}
          <span className="font-semibold">{pokemonSolo?.stats?.def}</span>
        </p>
        <p>
          Attack special:{" "}
          <span className="font-semibold">{pokemonSolo?.stats?.spe_atk}</span>
        </p>
        <p>
          Défense special:{" "}
          <span className="font-semibold">{pokemonSolo?.stats?.spe_def}</span>
        </p>
        <p>
          Vitesse:{" "}
          <span className="font-semibold">{pokemonSolo?.stats?.vit}</span>
        </p>
      </div>

      <div className="mt-6">
        {pokemonSolo.resistances?.map((resistance, typeIndex) => (
          <div key={typeIndex} className="bg-gray-100 p-4 rounded-lg mb-4">
            <span className="text-sm font-medium text-gray-700">
              Type : {resistance.name}
            </span>
            <p>
              Multiplicateur de dommage :{" "}
              <span className="font-semibold">{resistance.multiplier}</span>
            </p>
          </div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
        {/* ... Autres informations sur le Pokémon ... */}
        {pokemonSolo.evolution && (
        <div>
          {pokemonSolo.evolution.pre && pokemonSolo.evolution.pre.length > 0 && (
            <div>
              <h3 className="text-lg text-gray-600 mb-4">Pré-évolutions :</h3>
              {pokemonSolo.evolution.pre.map(evo => (
                <div key={evo.pokedex_id}>{evo.name} (au {evo.condition})</div>
              ))}
            </div>
          )}

          {pokemonSolo.evolution.next && pokemonSolo.evolution.next.length > 0 && (
            <div>
              <h3 className="text-lg text-gray-600 mb-4">Évolutions suivantes :</h3>
              {pokemonSolo.evolution.next.map(evo => (
                <div key={evo.pokedex_id}>{evo.name} (au {evo.condition})</div>
              ))}
            </div>
          )}
        </div>
      )}
      </div>
    </div>
  );
};

export default PokemonDetailPage;
