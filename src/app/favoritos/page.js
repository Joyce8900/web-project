"use client";

import { useFavorites } from "../components/FavoriteContext"; // Importação do contexto de favoritos
import NavBar from "../components/navBar"; // Importa a NavBar
import ProductCard from "../components/productCard";

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
            {favorites.map((recipe, index) => (
             <ProductCard key={index} meal={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
