"use client";

import { useRouter } from "next/navigation";
import { useFavorites } from "./FavoriteContext";

export default function ProductCard({ meal }) {
  const router = useRouter();
  const { addFavorite, removeFavorite, favorites } = useFavorites();

  const handleClick = () => {
    router.push(`/productDetail?id=${meal.idMeal}`);
  };

  const isFavorite = favorites.some((fav) => fav.idMeal === meal.idMeal);

  return (
    <div className="max-w-xs bg-white p-4 rounded-lg shadow-lg flex flex-col justify-between h-200">
      {/* Área clicável que leva aos detalhes */}
      <div className="cursor-pointer" onClick={handleClick}>
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full rounded-lg"
        />
        <h3 className="text-xl font-semibold mt-3">{meal.strMeal}</h3>
        <p className="text-gray-600 text-sm">
          {meal.strCategory} - {meal.strArea}
        </p>
      </div>
      {/* Botão para adicionar/remover favoritos */}
      <button
        onClick={() =>
          isFavorite ? removeFavorite(meal.idMeal) : addFavorite(meal)
        }
        className={`mt-4 px-4 py-2 rounded-lg text-white w-full ${
          isFavorite
            ? "bg-red-500 hover:bg-red-600" // Estilo para remover
            : "bg-green-500 hover:bg-green-600" // Estilo para adicionar
        }`}
      >
        {isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
      </button>
    </div>
  );
}
