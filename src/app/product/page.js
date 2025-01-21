import React from "react"
import ProductForm from "../productsSearch/page"
import { pesquisaPorReceita } from "../api/searchProducts/router"

const ProductsPage = async ({ searchParams }) => {
  const { titleSearchKey = "Feijoada" } = searchParams

  let receitas = []
  let error = null

  try {
    receitas = await pesquisaPorReceita(titleSearchKey)
  } catch (err) {
    error = err.message
  }

  return (
    <div>
      <ProductForm />
      {error && <div>Erro: {error}</div>}
      {receitas.length === 0 ? (
        <div>Nenhuma receita encontrada</div>
      ) : (
        receitas.map((meal) => (
          <div key={meal.idMeal}>
            <h1>{meal.strMeal}</h1>
            <h2>{meal.strArea}</h2>
            <img src={meal.strMealThumb} alt={meal.strMeal} width={200} />
          </div>
        ))
      )}
    </div>
  )
}

export default ProductsPage
