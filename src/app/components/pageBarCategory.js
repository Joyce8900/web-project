export default function PageBarCategory({ categoriaInfo }) {
    return (
      <div className="p-5 bg-gradient-to-r from-red-500 to-yellow-500 text-black flex items-center justify-between ">
        <img src={categoriaInfo.strCategoryThumb} alt={categoriaInfo.strCategory} className="object-cover" />
        <div className="bg-white p-5 ml-5 flex flex-col rounded-lg p-7">
          <h1 className="text-3xl font-bold mb-2">{categoriaInfo.strCategory}</h1>
          <p className="text-base">{categoriaInfo.strCategoryDescription}</p>
        </div>
      </div>
    );
  }
  