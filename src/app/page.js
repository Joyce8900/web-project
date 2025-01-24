"use client";

import { useState, useEffect } from 'react';
import ProductForm from "./productsSearch/page";
import ProductFilter from "./productFilter/page";
import ProductCard from './components/productCard'
import { fetchRandomRecipes } from "./api/randomProducts/router";
import Link from 'next/link';

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
        <Link href="/" className="text-3xl font-bold">Galeria de Receitas</Link>
        <ProductForm onSearchSubmit={handleSearchSubmit} />
        <h1 className="text-3xl font-bold">. . .</h1>
      </div>
      <ProductFilter/>
      <div className="flex flex-wrap justify-center gap-8 p-5">
        {recipes.map((meal, index) => (
          <ProductCard key={index} meal={meal} />
        ))}
      </div>
      {isLoading && <div className="text-center text-xl p-4">Carregando...</div>}
    </div>
  );
};

export default Home;
