// hay que separarlo en varios archivos para hacer reutilizable parte de la l'ogica y que pueda tambi'en tener responsabilidad 'unica cada funci'on.


// URLs de las APIs de productos y categorías
const API_PRODUCTS = 'https://dummyjson.com/products';
const API_CATEGORIES = 'https://dummyjson.com/products/categories';


// Función para cargar las categorías al buscador 2 desde la API

// podr'ia estar en una carpeta services/categories.service.js
async function loadCategories() {
    try {
        const response = await fetch(API_CATEGORIES);
        const categories = await response.json();

        // separemos la logica de la interface de las llamadas al servicio, esto deber'ia estar en otra funci'on que lea la repsuesta del servicio
        const categorySelect = document.querySelector('.buscador-2');
        categorySelect.insertAdjacentHTML = '<option value="">Todas las categorías</option>'; 
            categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.slug;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar las categorías:', error);
    }
}
loadCategories();


// Función para cargar y mostrar productos
async function loadProducts(searchTerm = '', category = '') {
    let apiUrl = `${API_PRODUCTS}`;
    if (category) apiUrl += `/category/${category}`;
    
    const response = await fetch(apiUrl);
    const data = await response.json();
    let products = data.products;

    // igual aqu'i esto debe estar separado
    // Filtrar productos según el término de búsqueda
    if (searchTerm) {
        searchTerm = searchTerm.toLowerCase();
        products = products.filter(product => 
            product.title.toLowerCase().includes(searchTerm)
        );
    }
    displayProducts(products);
}

// Función para mostrar los productos en la sección de productos
function displayProducts(products) {
    const productContainer = document.getElementById('productos');
    productContainer.insertAdjacentHTML = ''; 

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('producto');

        productDiv.insertAdjacentHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <h4>Categoría</h4>
            <button>${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</button>
            <h1>Precio: S/. ${product.price.toFixed(2)}</h1>
            <button class="btn-large">Añadir al carrito</button>
        `;
        productContainer.appendChild(productDiv);
    });
}


//Botón que filtra por nombre
function filterName() {
    // variables en ingles y clases en spanish mantener uniforme el idiome
    const searchTerm = document.querySelector('.buscador-1').value;
    const selectedCategory = document.querySelector('.buscador-2').value;
    loadProducts(searchTerm, selectedCategory);
}

document.addEventListener('DOMContentLoaded', () => {
    loadCategories();
    loadProducts();
});



// Carrito de compras
let carrito = [];
let totalPrecio = 0;

function displayProducts(products) {
    const productContainer = document.getElementById('productos');
    productContainer.innerHTML = ''; 

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('producto');

        // este mismo c'odigo se repite 2 veces
        productDiv.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <h4>Categoría</h4>
            <button>${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</button>
            <h1>Precio: S/. ${product.price.toFixed(2)}</h1>
            <button class="btn-large">Añadir al carrito</button>
        `;

        const addToCartButton = productDiv.querySelector('.btn-large');
        addToCartButton.addEventListener('click', () => addToCart(product));

        productContainer.appendChild(productDiv);
    });
}
// Verificar si el producto ya está en el carrito
function addToCart(product) {
    const existingProduct = carrito.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        carrito.push({ ...product, quantity: 1 });
    }
    totalPrecio += product.price;

    updateCartView();
}

function updateCartView() {
    const cartList = document.getElementById('carrito-lista');
    const totalPriceElement = document.getElementById('total-precio');

    cartList.innerHTML = '';

    // Generar la lista del carrito
    carrito.forEach((product, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${product.title} (x${product.quantity}) - S/. ${(product.price * product.quantity).toFixed(2)}`;

        // Botón para eliminar del carrito
        const removeButton = document.createElement('button');
        removeButton.textContent = 'X';
        removeButton.style.marginLeft = '10px';
        removeButton.addEventListener('click', () => removeFromCart(index));

        listItem.appendChild(removeButton);
        cartList.appendChild(listItem);
    });

    // Actualizar el total
    totalPriceElement.textContent = totalPrecio.toFixed(2);
}

function removeFromCart(index) {
    const product = carrito[index];
    totalPrecio -= product.price;
    if (product.quantity > 1) {
        product.quantity -= 1;
    } else {
        carrito.splice(index, 1);
    }
    updateCartView();
}
