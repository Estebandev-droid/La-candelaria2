import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/api/products`;

const getProducts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

const getProductById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

const createProduct = async (productData) => {
    const formData = new FormData();
    for (const key in productData) {
        formData.append(key, productData[key]);
    }
    try {
        const response = await axios.post(API_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('token')}`, // Añade el token de autenticación
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al crear el producto:', error.response.data);
        throw error;
    }
};

const updateProduct = async (id, productData) => {
    const formData = new FormData();
    for (const key in productData) {
        formData.append(key, productData[key]);
    }
    try {
        const response = await axios.put(`${API_URL}/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('token')}`, // Añade el token de autenticación
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el producto:', error.response.data);
        throw error;
    }
};

const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, // Añade el token de autenticación
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el producto:', error.response.data);
        throw error;
    }
};

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct };