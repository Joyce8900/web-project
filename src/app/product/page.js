import React from "react";
import ProductForm from "../productsSearch/page";
import { pesquisaPorReceita } from "../api/searchProducts/router";
import Link from "next/link";

const ProductsPage = async ({ searchParams }) => {
  const { titleSearchKey = "Feijoada" } = searchParams;

  let receitas = [];
  let error = null;

  try {
    receitas = await pesquisaPorReceita(titleSearchKey);
  } catch (err) {
    error = err.message;
  }

  return (
    <div>
      <div className="p-5 bg-gradient-to-r from-red-500 to-yellow-500 text-white  flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold">Galeria de Receitas</Link>
        <ProductForm onSearchSubmit/>
        <h1 className="text-3xl font-bold">. . .</h1>
      </div>
      {error && <div className="bg-red-500 text-white p-3 rounded my-3">Erro: {error}</div>}
      {receitas.length === 0 ? (
        <div className="bg-yellow-500 text-white p-3 rounded my-3">Nenhuma receita encontrada</div>
      ) : (
        <Link href={`/productDetail?id=${receitas[0].idMeal}`} className="flex flex-wrap justify-center gap-8 p-5 mt-5">
          {receitas.map((meal) => (
            <div key={meal.idMeal} className="max-w-xs bg-white p-4 rounded-lg shadow-lg">
              <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full rounded-lg" />
              <h1 className="text-xl font-semibold mt-3">{meal.strMeal}</h1>
              <h2 className="text-gray-600 text-sm">{meal.strArea}</h2>
            </div>
          ))}
        </Link>
      )}
    </div>
  );
};

export default ProductsPage;
