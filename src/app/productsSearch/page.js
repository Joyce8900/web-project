export default function ProductForm() {
  return (
    <form action="/product" className="flex items-center p-1 space-x-2 max-w-sm mx-auto bg-white shadow-lg rounded-lg">
      <input 
        id="idTitleSearchKey" 
        name="titleSearchKey" 
        placeholder="Título da Receita"
        className="flex-grow border border-gray-300 p-2 text-gray-700 rounded-l-md focus:outline-none focus:border-blue-500"
      />
      <button 
        type="submit" 
        className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-700 transition duration-300"
      >
        Pesquisar
      </button>
    </form>
  )
}
