import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard/productCard';
import Footer from '../components/footer/footer';
import './home.css';

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    category: string;
}

const Home: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    // Fetch productos
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // esto debe estar en otro archivo ya que de lo contrario se le esta dando m'as resposnabilidades al home de las que deber'ia tener
                const response = await fetch('https://dummyjson.com/products');
                const data = await response.json();
                setProducts(data.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    // Fetch categorías
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // lo mismo aqu'i
                const response = await fetch('https://dummyjson.com/products/categories');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleSearch = () => {
        const filteredProducts = products.filter(product =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setProducts(filteredProducts);
    };

    const handleFilterByCategory = async () => {
        if (selectedCategory) {
            try {
                // igual aqu'i
                const response = await fetch(`https://dummyjson.com/products/category/${selectedCategory}`);
                const data = await response.json();
                setProducts(data.products);
            } catch (error) {
                console.error('Error filtering by category:', error);
            }
        } else {
            // igual aqu'i
            const response = await fetch('https://dummyjson.com/products');
            const data = await response.json();
            setProducts(data.products);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
    };

    const handleClearFilters = async () => {
        setSearchTerm('');
        setSelectedCategory('');
        // igual aqu'i
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        setProducts(data.products);
    };

    return (
        <div className="home">
            <header>
                <h1>My Market</h1>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        value={searchTerm}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleSearch}>Buscar</button>
                </div>
                <div className="filter-bar">
                    <select value={selectedCategory} onChange={handleCategoryChange}>
                        <option value="">Todas las categorías</option>
                        {categories.map(category => (
                            <option key={category} value={category}>
                            </option>
                        ))}
                    </select>
                    <button onClick={handleFilterByCategory}>Filtrar</button>
                    <button onClick={handleClearFilters}>Limpiar filtros</button>
                </div>
            </header>
            <main className="products">
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        title={product.title}
                        description={product.description}
                        price={product.price}
                        thumbnail={product.thumbnail}
                        category={product.category}
                        onAddToCart={() => console.log(`Añadido: ${product.title}`)}
                    />
                ))}
            </main>
            <Footer/>
        </div>
    );
};

export default Home;
