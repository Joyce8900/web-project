"use client"; 

import { useState, useEffect } from 'react';
import ProductForm from "./productsSearch/page"; 
const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const fetchRandomRecipes = async () => {
    if (isLoading) return; 
    setIsLoading(true);

    try {
      const newRecipes = [];
      for (let i = 0; i < 10; i++) {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const data = await response.json();
        const meal = data.meals[0];
        newRecipes.push(meal);
      }

      setRecipes((prevRecipes) => [...prevRecipes, ...newRecipes]);
    } catch (error) {
      console.error('Erro ao buscar receitas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) return;
    fetchRandomRecipes();
  };

  const handleSearchSubmit = (query) => {
    setSearchQuery(query);
    setIsSearch(true);
  };

  useEffect(() => {
    fetchRandomRecipes(); 
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll); 
    };
  }, [isLoading]); 

  return (
    <div>
      <div className="p-5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg flex justify-between items-center">
        <h1 className="text-3xl font-bold">Galeria de Receitas</h1>
      </div>
      <ProductForm onSearchSubmit={handleSearchSubmit} />
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
