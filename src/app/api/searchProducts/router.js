
const BASE_URL = "https://www.themealdb.com/api/json/v1/1"

export const pesquisaPorReceita = async (receita) => {
  try {
    const res = await fetch(`${BASE_URL}/search.php?s=${receita}`)
    if (!res.ok) {
      throw new Error("Erro ao buscar refeições.")
    }
    const data = await res.json()
    return data.meals || []
  } catch (error) {
    console.error("Erro na API:", error.message)
    return []
  }
}
