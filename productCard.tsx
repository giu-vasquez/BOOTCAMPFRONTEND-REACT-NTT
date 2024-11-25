import React from 'react';

interface ProductCardProps {
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    category: string;
    onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
    title, description, price, thumbnail, category, onAddToCart
}) => (
    <div className="product-card">
        <img src={thumbnail} alt={title} />
        <h2>{title}</h2>
        <p>{description}</p>
        <h4>Categoría: {category}</h4>
        <h3>Precio: S/. {price.toFixed(2)}</h3>
        <button onClick={onAddToCart}>Añadir al carrito</button>
    </div>
);

export default ProductCard;