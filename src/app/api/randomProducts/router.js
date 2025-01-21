export const fetchRandomRecipes = async () => {
    const newRecipes = [];
    try {
      for (let i = 0; i < 10; i++) {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const data = await response.json();
        const meal = data.meals[0];
        newRecipes.push(meal);
      }
    } catch (error) {
      console.error('Erro ao buscar receitas:', error);
      throw new Error('Erro ao buscar receitas');
    }
    return newRecipes;
  };
  