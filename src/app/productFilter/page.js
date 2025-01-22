'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const getCategorias = async () => {
  try {
    const res = await fetch(`${BASE_URL}/list.php?c=list`);
    if (!res.ok) {
      throw new Error("Erro ao buscar categorias.");
    }
    const data = await res.json();
    return data.meals || [];
  } catch (error) {
    console.error("Erro na API:", error.message);
    return [];
  }
};

export default function ProductFilter() {
  const [categorias, setCategorias] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategorias = async () => {
      const categories = await getCategorias();
      setCategorias(categories);
    };

    fetchCategorias();
  }, []);

  const handleClick = (category) => {
    router.push(`/productFilterPage?category=${category}`);
  };

  return (
    <div className="w-full flex justify-center p-1 bg-white shadow-lg">
      <div className="w-full flex justify-between items-center space-x-2 overflow-x-auto">
        {categorias.length > 0 ? (
          categorias.map((categoria) => (
            <button
              key={categoria.strCategory}
              onClick={() => handleClick(categoria.strCategory)}
              className="bg-gray-200 text-black p-1 px-6 rounded-md hover:text-white hover:bg-gray-400 transition duration-300 flex-shrink-0"
            >
              {categoria.strCategory}
            </button>
          ))
        ) : (
          <p>Carregando categorias...</p>
        )}
      </div>
    </div>
  );
}
