import React from "react"

export default async function Home({ params }) {
  const { id } = await params

  const productData = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  ).then((res) => res.json())

  const product = productData.meals[0]

  return (
    <div>
      <h1>
        {product.strMeal} ({product.strCategory})
      </h1>

      <p>Area: {product.strArea}</p>

      <p>Instructions: {product.strInstructions}</p>
    </div>
  )
}

export async function generateStaticParams() {
  const allMeals = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772"
  ).then((res) => res.json())

  return allMeals.meals.map((meals) => ({
    id: meals.idMeal,
  }))
}