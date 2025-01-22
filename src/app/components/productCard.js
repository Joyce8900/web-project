export default function ProductCard({ meal }) {
    return (
      <div key={meal.idMeal} className="max-w-xs bg-white p-4 rounded-lg shadow-lg">
        <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full rounded-lg" />
        <h3 className="text-xl font-semibold mt-3">{meal.strMeal}</h3>
        <p className="text-gray-600 text-sm">{meal.strCategory} - {meal.strArea}</p>
      </div>
    );
  }
  