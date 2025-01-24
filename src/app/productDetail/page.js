"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import NavBar from '../components/navBar';


export default function ProductDetails() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [product, setProduct] = useState(null);



  const handleSearchSubmit = (query) => {
    setSearchQuery(query)
    setIsSearch(true)
  }
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
    <div>
      <NavBar />
      <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
        <div className="max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src={product.strMealThumb}
            alt={product.strMeal}
            className="w-full h-80 object-cover"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {product.strMeal}
            </h1>
            <p className="text-gray-600 text-lg">
              <strong>Categoria:</strong> {product.strCategory}
            </p>
            <p className="text-gray-600 text-lg">
              <strong>Área:</strong> {product.strArea}
            </p>
            <p className="text-gray-700 text-md mt-4 leading-relaxed">
              {product.strInstructions}
            </p>
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
          </div>
        </div>
      </div>
    </div>
  )
}
