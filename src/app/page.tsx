"use client"
import Image from "next/image";
import PokemonPage from "@/components/main";
import ToggleDarkMode from "@/components/DarkMode/DarkMode";


export default function Home() {
  return (
    <main className="dark:bg-gray-800">
         <PokemonPage></PokemonPage>
    </main>
  );
}

