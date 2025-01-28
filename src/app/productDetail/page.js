"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import NavBar from "../components/navBar";
import { useFavorites } from "../components/FavoriteContext"; // Importação do contexto de favoritos

export default function ProductDetails() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Obtém o ID do produto da URL
  const [product, setProduct] = useState(null); // Estado para armazenar o produto
  const { favorites, addFavorite, removeFavorite } = useFavorites(); // Hook para gerenciar favoritos

  // Verifica se o produto atual já está nos favoritos
  const isFavorited = favorites.some((fav) => fav.idMeal === id);

  useEffect(() => {
    async function fetchData() {
      if (id) {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await res.json();
        setProduct(data.meals[0]); // Define o produto no estado
      }
    }
    fetchData();
  }, [id]);

  // Renderização enquanto o produto está sendo carregado
  if (!product) {
    return (
      <p className="text-center text-gray-500 text-xl mt-20">Carregando...</p>
    );
  }

  // Renderização do componente
  return (
    <div>
      <NavBar />
      <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
        <div className="max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Imagem do produto */}
          <img
            src={product.strMealThumb}
            alt={product.strMeal}
            className="w-full h-80 object-cover"
          />
          <div className="p-6">
            {/* Nome do prato */}
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {product.strMeal}
            </h1>
            {/* Categoria e Área */}
            <p className="text-gray-600 text-lg">
              <strong>Categoria:</strong> {product.strCategory}
            </p>
            <p className="text-gray-600 text-lg">
              <strong>Área:</strong> {product.strArea}
            </p>
            {/* Instruções */}
            <p className="text-gray-700 text-md mt-4 leading-relaxed">
              {product.strInstructions}
            </p>
            {/* Vídeo do YouTube */}
            <div className="mt-6 flex justify-center">
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${
                  product.strYoutube.split("v=")[1]
                }`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            {/* Botão de Favoritos */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={() =>
                  isFavorited
                    ? removeFavorite(product.idMeal) // Remove dos favoritos
                    : addFavorite(product) // Adiciona aos favoritos
                }
                className={`px-4 py-2 rounded-lg text-white ${
                  isFavorited
                    ? "bg-red-500 hover:bg-red-600" // Estilo para remover
                    : "bg-green-500 hover:bg-green-600" // Estilo para adicionar
                }`}
              >
                {isFavorited ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
