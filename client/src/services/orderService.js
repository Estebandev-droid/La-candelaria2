import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/api/orders`;

export const createOrder = async (orderData, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL, orderData, config);
    return response.data;
};

const getMyOrders = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.get(`${API_URL}/myorders`, config);
    return response.data;
};

const getOrderById = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.get(`${API_URL}/${id}`, config);
    return response.data;
};

export { getMyOrders, getOrderById };