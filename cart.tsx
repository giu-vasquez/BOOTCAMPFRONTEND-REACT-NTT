
interface CartProps {
    items: { title: string; quantity: number; price: number }[];
    total: number;
    onRemoveItem: (index: number) => void;
}

const Cart: React.FC<CartProps> = ({ items, total, onRemoveItem }) => (
    <div>
        <h2>Carrito</h2>
        <ul>
            {items.map((item, index) => (
                <li key={index}>
                    {item.title} (x{item.quantity}) - S/. {(item.price * item.quantity).toFixed(2)}
                    <button onClick={() => onRemoveItem(index)}>X</button>
                </li>
            ))}
        </ul>
        <h3>Total: S/. {total.toFixed(2)}</h3>
    </div>
);

export default Cart;
