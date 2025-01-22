"use client";

import { useState, useEffect } from 'react';
import ProductForm from "./productsSearch/page";
import { fetchRandomRecipes } from "./api/randomProducts/router";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const fetchRecipes = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const newRecipes = await fetchRandomRecipes();
    setRecipes((prevRecipes) => [...prevRecipes, ...newRecipes]);
    setIsLoading(false);
  };

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) return;
    fetchRecipes();
  };

  const handleSearchSubmit = (query) => {
    setSearchQuery(query);
    setIsSearch(true);
  };

  useEffect(() => {
    fetchRecipes();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading]);

  return (
    <div>
      <div className="p-5 bg-gradient-to-r from-red-500 to-yellow-500 text-white flex justify-between items-center">
        <h1 className="text-3xl font-bold">Galeria de Receitas</h1>
        <ProductForm onSearchSubmit={handleSearchSubmit} />
        <h1 className="text-3xl font-bold">. . .</h1>
      </div>
      <div className="flex flex-wrap justify-center gap-8 p-5">
        {recipes.map((meal, index) => (
          <div key={index} className="max-w-xs bg-white p-4 rounded-lg shadow-lg">
            <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full rounded-lg" />
            <h3 className="text-xl font-semibold mt-3">{meal.strMeal}</h3>
            <p className="text-gray-600 text-sm">{meal.strCategory} - {meal.strArea}</p>
          </div>
        ))}
      </div>

      {isLoading && <div className="text-center text-xl p-4">Carregando...</div>}
    </div>
  );
};

export default Home;
