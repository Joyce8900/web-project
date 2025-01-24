'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getProdutosPorCategoria, getInfCategoria } from '../api/filterCategory/router';
import ProductCard from '../components/productCard'
import PageBarCategory from '../components/pageBarCategory'
import NavBar from '../components/navBar';

export default function ProductFilterPage() {
    const searchParams = useSearchParams();
    const category = searchParams.get('category');
    const [produtos, setProdutos] = useState([]);
    const [categoriaInfo, setCategoriaInfo] = useState(null);

    useEffect(() => {
        if (category) {
            const fetchProdutos = async () => {
                try {
                    const data = await getProdutosPorCategoria(category);
                    setProdutos(data);
                } catch (error) {
                    console.error("Erro na API:", error.message);
                }
            };

            fetchProdutos();

            const fetchCategoriaInfo = async () => {
                try {
                    const categoriesData = await getInfCategoria();
                    const categoryInfo = categoriesData.find(cat => cat.strCategory === category);
                    setCategoriaInfo(categoryInfo);
                } catch (error) {
                    console.error("Erro na API:", error.message);
                }
            };

            fetchCategoriaInfo();
        }
    }, [category]);

    return (
        <div>
            <NavBar/>
            {categoriaInfo && (
                <PageBarCategory categoriaInfo={categoriaInfo} />
            )}
            <div className="flex flex-wrap justify-center gap-8 p-5">
                {produtos.length > 0 ? (
                    produtos.map((produto) => (
                        <ProductCard key={produto.idMeal} meal={produto} />
                    ))
                ) : (
                    <p>Carregando produtos...</p>
                )}
            </div>
        </div>
    );
}
