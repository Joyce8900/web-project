import ProductForm from '../productsSearch/page';
import { GaleriaReceitas } from '../galeriaReceitas/page';


export default function NavBar({submit }) {
    return (
        <div className="p-5 bg-gradient-to-r from-red-500 to-yellow-500 text-white flex justify-between items-center">
            <GaleriaReceitas/>
            <ProductForm onSearchSubmit={submit} />
            <h1 className="text-3xl font-bold">. . .</h1>
        </div>
    );
}