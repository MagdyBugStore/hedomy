import axios from 'axios';

export async function getProducts({ id }) {
    const params = {
        vendor: id,
        values:'title,images,slug,price,ratingScore'
    };

    try {
        const response = await axios.get('/api/products/get', { params });
        const products = response.data
        return { error: null, products };
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        return { error: error.message, products: [] };
    }
}