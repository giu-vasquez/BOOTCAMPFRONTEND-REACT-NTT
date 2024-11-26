const BASE_URL = 'https://dummyjson.com/products';

export const fetchCategories = async (): Promise<string[]> => {
    const response = await fetch(`${BASE_URL}/categories`);
    if (!response.ok) throw new Error('Error fetching categories');
    return response.json();
};

export const fetchProducts = async (category: string = '', searchTerm: string = '') => {
    const url = category ? `${BASE_URL}/category/${category}` : BASE_URL;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error fetching products');
    const data = await response.json();

    // esta logica la debe tener el consumidor no el servicio
    if (searchTerm) {
        const searchTermLower = searchTerm.toLowerCase();
        return data.products.filter((product: any) =>
            product.title.toLowerCase().includes(searchTermLower)
        );
    }

    return data.products;
};
