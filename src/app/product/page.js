import React from "react";
import { pesquisaPorReceita } from "../api/searchProducts/router";
import ProductCard from "../components/productCard";
import NavBar from "../components/navBar"; // Importa a NavBar centralizada

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
      {/* Inclui a NavBar no topo */}
      <NavBar />
      <div className="p-5">
        {error && (
          <div className="bg-red-500 text-white p-3 rounded my-3">
            Erro: {error}
          </div>
        )}
        {receitas.length === 0 ? (
          <div className="bg-yellow-500 text-white p-3 rounded my-3">
            Nenhuma receita encontrada
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-8 p-5 mt-5">
            {receitas.map((meal, index) => (
              <ProductCard key={index} meal={meal} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
