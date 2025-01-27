"use client";

import { useFavorites } from "../components/FavoriteContext"; // Importação do contexto de favoritos
import NavBar from "../components/navBar"; // Importa a NavBar

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites(); // Hook para acessar e remover favoritos

  return (
    <div>
      <NavBar /> {/* Mantém a navbar no topo */}
      <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Receitas Favoritas
        </h1>

        {favorites.length === 0 ? (
          <p className="text-gray-500 text-lg">Nenhuma receita adicionada aos favoritos.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favorites.map((recipe) => (
              <div
                key={recipe.idMeal}
                className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden"
              >
                {/* Imagem da Receita */}
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  className="w-full h-48 object-cover"
                />
                {/* Detalhes da Receita */}
                <div className="p-4">
                  <h2 className="text-xl font-bold">{recipe.strMeal}</h2>
                  <p className="text-gray-500">{recipe.strCategory}</p>
                </div>
                {/* Botão para remover dos favoritos */}
                <div className="p-4 flex justify-center">
                  <button
                    onClick={() => removeFavorite(recipe.idMeal)} // Remove o item dos favoritos
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Remover dos Favoritos
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
