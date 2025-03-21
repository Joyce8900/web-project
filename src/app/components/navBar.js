import Link from "next/link";
import ProductForm from '../productsSearch/page';
import { GaleriaReceitas } from '../galeriaReceitas/page';

export default function NavBar({ submit }) {
  return (
    <div className="p-5 bg-gradient-to-r from-red-500 to-yellow-500 text-white flex justify-between items-center">
      <GaleriaReceitas />
      <ProductForm onSearchSubmit={submit} />
      <Link href="/favoritos">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-gray-600 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6.5 3.5 5 5.5 5c1.54 0 3.04.99 3.57 2.36h1.87C14.46 5.99 15.96 5 17.5 5 19.5 5 21 6.5 21 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
          Favoritos
        </button>

      </Link>
    </div>
  );
}