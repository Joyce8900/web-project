import Link from "next/link";
import ProductForm from '../productsSearch/page';
import { GaleriaReceitas } from '../galeriaReceitas/page';

export default function NavBar({ submit }) {
  return (
    <div className="p-5 bg-gradient-to-r from-red-500 to-yellow-500 text-white flex justify-between items-center">
      <GaleriaReceitas />
      <ProductForm onSearchSubmit={submit} />
      <Link href="/favoritos">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Favoritos
        </button>
      </Link>
    </div>
  );
}