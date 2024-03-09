
import React, { useEffect, useState } from "react";
import Link from "next/link";
import LoadingSpinner from "@/app/Loading"; // Assurez-vous que le chemin d'accès est correct
import ToggleDarkMode from "@/components/DarkMode/DarkMode";

interface PokemonProps {
  id: number;
  // name: string;
  sprites: {regular : string;};
  image: string;
  types: { name: string; image: string }[];
  pokedex_id: number;
   
  name: {
    fr: string;
    en: string;
    jp: string;
  };
}

interface TypesProps {
  name: string;
  image: string;
}

export default function PokemonPage() {
  const [pokemons, setPokemon] = useState<PokemonProps[]>([]);
  const [types, setTypes] = useState<TypesProps[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [filteredPokemons, setFilteredPokemons] = useState<PokemonProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 20;

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch(`https://tyradex.vercel.app/api/v1/pokemon`);
      const data = await response.json();

      setPokemon(data);

      const extractedTypes = new Set<string>();
      data.forEach((pokemon: PokemonProps) => {
        pokemon.types?.forEach((type) => {
          if (type && typeof type.name === "string") {
            extractedTypes.add(type.name);
          }
        });
      });

      const typesArray: TypesProps[] = Array.from(extractedTypes).map(
        (typeName) => ({
          name: typeName, // TypeScript sait maintenant que typeName est une string
          image: "", // Ajustez si vous avez l'image des types
        })
      );

      setTypes(typesArray);

      setIsLoading(false);
    };

    fetchPokemon();
  }, []);

  useEffect(() => {
    if (selectedType) {
      setFilteredPokemons(
        pokemons.filter((pokemon) =>
          pokemon.types?.some((type) => type.name === selectedType)
        )
      );
    } else {
      setFilteredPokemons(pokemons);
    }
  }, [selectedType, pokemons]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
    setCurrentPage(1); // Reset to page 1 on type change
  };

  const totalPages = Math.ceil(filteredPokemons.length / pokemonsPerPage);
  const maxPagesToShow = 5; // Nombre max de pages à afficher
  let startPage = Math.max(currentPage - 2, 1);
  let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = filteredPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  const getPaginatedNumbers = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = [];
  for (let page = startPage; page <= endPage; page++) {
    pageNumbers.push(page);
  }


  const goToPreviousPage = () =>
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  const goToNextPage = () =>
    setCurrentPage((currentPage) => Math.min(currentPage + 1, totalPages));

  if (isLoading) {
    return <LoadingSpinner />; // Assurez-vous que ce composant est correctement importé ou implémenté
  }

  return (
    <div className="mx-8 dark:dark:bg-gray-800 dark:text-gray-200">
      <div className="mb-4">
        <h1 className="text-center text-5xl mb-6 mt-3 dark:text-white">
          Bienvenue dans mon Pokédex
        </h1>

        <ToggleDarkMode />
    
        <select
          onChange={handleSelectChange}
          defaultValue=""
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
          <option value="">Tous les types</option>
          {types.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {currentPokemons.map((pokemon, index) => (
    <Link href={`/pokemon/${encodeURIComponent(pokemon.pokedex_id)}`} key={index} legacyBehavior >
      <a className="flex flex-col justify-center items-center bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden hover:bg-blue-50 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-blue-600">
        <h3 className="text-xl font-semibold tracking-tight text-gray-900 p-4 dark:text-white">
          {pokemon.name.fr} n°{pokemon.pokedex_id}
        </h3>
        <img
          className="w-44 h-44 object-cover object-center"
          src={pokemon.sprites.regular}
          alt={`Sprite de ${pokemon.name.fr}`}
        />
        <div className="mt-4 mx-14 flex justify-around">
          {pokemon.types?.map((type) => (
            <div key={type.name} className="inline-flex items-center mr-2 mb-2 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full dark:bg-blue-700 dark:text-blue-300">
              <img className="w-6 h-6" src={type.image} alt={type.name} />
              <p className="ml-2">
                {type.name}
              </p>
            </div>
          ))}
        </div>
      </a>
    </Link>
  ))}
</div>


      <div className="flex justify-center items-center space-x-2 my-4">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-md bg-white text-blue-500 hover:bg-blue-500 hover:text-white disabled:bg-gray-200 disabled:text-gray-500 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:disabled:bg-gray-800 dark:disabled:text-gray-600"
        >
          Précédent
        </button>

        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`px-4 py-2 border rounded-md ${
              currentPage === number
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500 hover:bg-blue-500 hover:text-white"
            }`}
          >
            {number}
          </button>
        ))}

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded-md bg-white text-blue-500 hover:bg-blue-500 hover:text-white disabled:bg-gray-200 disabled:text-gray-500"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
