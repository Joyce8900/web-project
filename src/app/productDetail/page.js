"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProductDetails() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (id) {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await res.json();
        setProduct(data.meals[0]);
      }
    }
    fetchData();
  }, [id]);

  if (!product) {
    return <p className="text-center text-gray-500 text-xl mt-20">Carregando...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden">
        <img src={product.strMealThumb} alt={product.strMeal} className="w-full h-80 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.strMeal}</h1>
          <p className="text-gray-600 text-lg"><strong>Categoria:</strong> {product.strCategory}</p>
          <p className="text-gray-600 text-lg"><strong>Área:</strong> {product.strArea}</p>
          <p className="text-gray-700 text-md mt-4 leading-relaxed">{product.strInstructions}</p>
          <div className="mt-6 flex justify-center">
            <a 
              href={product.strYoutube} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-600 transition"
            >
              Ver vídeo da receita
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
