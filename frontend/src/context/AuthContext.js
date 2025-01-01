import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await axios.get('/api/users/me', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUser(response.data);
                }
            } catch (error) {
                console.error('Error al obtener el usuario:', error);
            }
        };

        fetchUser();
    }, []);

    const login = async (username, password) => {
        try {
            const response = await axios.post('/api/users/login', { username, password });
            localStorage.setItem('token', response.data.token);
            setUser(response.data);
            return response.data;
        } catch (error) {
            throw new Error('Error al iniciar sesión. Verifica tus credenciales.');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};