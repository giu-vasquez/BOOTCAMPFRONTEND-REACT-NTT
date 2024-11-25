import { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';


interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    thumbnail: string;
    price: number;
}

export const useProducts = (category: string = '', searchTerm: string = '') => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                const data = await fetchProducts(category, searchTerm);
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, [category, searchTerm]);

    return { products, loading };
};
