"use client";

import { useState, useEffect } from 'react';
import ProductFilter from "./productFilter/page";
import ProductCard from './components/productCard'
import { fetchRandomRecipes } from "./api/randomProducts/router";
import Link from 'next/link';
import NavBar from './components/navBar';

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


  useEffect(() => {
    fetchRecipes();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading]);

  return (
    <div>
      <NavBar/>
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
