// /app/api/filterCategory.js

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const getProdutosPorCategoria = async (category) => {
  try {
    const res = await fetch(`${BASE_URL}/filter.php?c=${category}`);
    if (!res.ok) {
      throw new Error("Erro ao buscar produtos.");
    }
    const data = await res.json();
    return data.meals || [];
  } catch (error) {
    console.error("Erro na API:", error.message);
    return [];
  }
};

export const getInfCategoria = async () => {
  try {
    const res = await fetch(`${BASE_URL}/categories.php`);
    if (!res.ok) {
      throw new Error("Erro ao buscar categorias.");
    }
    const data = await res.json();
    return data.categories || [];
  } catch (error) {
    console.error("Erro na API:", error.message);
    return [];
  }
};
