import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Checkbox from './Checkbox';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [mode, setMode] = useState('login'); // 'login', 'register', 'forgotPassword'
    const [rememberUser, setRememberUser] = useState(false);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    useEffect(() => {
        const savedUsername = localStorage.getItem('rememberedUsername');
        if (savedUsername) {
            setUsername(savedUsername);
            setRememberUser(true);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            if (rememberUser) {
                localStorage.setItem('rememberedUsername', username);
            } else {
                localStorage.removeItem('rememberedUsername');
            }
            navigate('/'); // Redirigir a la pantalla de inicio
        } catch (err) {
            setError('Error al iniciar sesión. Verifica tus credenciales.');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/users/register', { username, password, email });
            console.log(response.data);
            setMode('login'); // Cambiar al modo de inicio de sesión
        } catch (err) {
            setError('Error al registrar el usuario.');
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        // Implementar lógica de recuperación de contraseña
        console.log('Recuperación de contraseña no implementada');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-orange-100 via-yellow-100 to-orange-200">
            <form 
                onSubmit={mode === 'login' ? handleLogin : mode === 'register' ? handleRegister : handleForgotPassword} 
                className="bg-white/80 backdrop-blur-xl p-8 rounded-xl shadow-xl w-96 transform transition-all duration-500 hover:scale-105">
                <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500 mb-6 text-center">
                    {mode === 'login' ? 'Iniciar Sesión' : mode === 'register' ? 'Registrar Usuario' : 'Recuperar Contraseña'}
                </h2>
                {error && <p className="text-red-600 font-semibold text-sm mb-4">{error}</p>}
                {mode !== 'forgotPassword' && (
                    <div className="mb-4 relative">
                        <label className="block text-sm font-semibold text-orange-700">Usuario</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full border border-orange-300 rounded-lg p-3 bg-orange-50 text-orange-800 focus:outline-none focus:ring-2 focus:ring-orange-400 pl-10"
                            placeholder="Ingresa tu usuario"
                            required
                        />
                        <i className="fas fa-user absolute left-3 top-10 text-orange-400"></i>
                    </div>
                )}
                {mode === 'register' && (
                    <div className="mb-4 relative">
                        <label className="block text-sm font-semibold text-orange-700">Correo Electrónico</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full border border-orange-300 rounded-lg p-3 bg-orange-50 text-orange-800 focus:outline-none focus:ring-2 focus:ring-orange-400 pl-10"
                            placeholder="Ingresa tu correo"
                            required
                        />
                        <i className="fas fa-envelope absolute left-3 top-10 text-orange-400"></i>
                    </div>
                )}
                {mode !== 'forgotPassword' && (
                    <div className="mb-4 relative">
                        <label className="block text-sm font-semibold text-orange-700">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full border border-orange-300 rounded-lg p-3 bg-orange-50 text-orange-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 pl-10"
                            placeholder="Ingresa tu contraseña"
                            required
                        />
                        <i className="fas fa-lock absolute left-3 top-10 text-orange-400"></i>
                    </div>
                )}
                {mode === 'login' && (
                    <div className="mb-4 flex items-center">
                        <Checkbox
                            checked={rememberUser}
                            onChange={(e) => setRememberUser(e.target.checked)}
                        />
                        <span className="text-sm text-orange-600 ml-2">Recordar usuario</span>
                    </div>
                )}
                <button type="submit" className="w-full bg-gradient-to-r from-orange-400 to-yellow-400 text-white font-bold py-2 px-4 rounded-lg hover:scale-105 transition-transform">
                    {mode === 'login' ? 'Iniciar Sesión' : mode === 'register' ? 'Registrar' : 'Recuperar Contraseña'}
                </button>
                <div className="mt-6 text-center">
                    {mode === 'login' && (
                        <>
                            <p className="text-sm text-orange-600">
                                ¿No tienes una cuenta?{' '}
                                <span className="text-yellow-500 font-medium cursor-pointer" onClick={() => setMode('register')}>
                                    Regístrate
                                </span>
                            </p>
                            <p className="text-sm text-orange-600 mt-2">
                                ¿Olvidaste tu contraseña?{' '}
                                <span className="text-red-500 font-medium cursor-pointer" onClick={() => setMode('forgotPassword')}>
                                    Recupérala
                                </span>
                            </p>
                        </>
                    )}
                    {mode === 'register' && (
                        <p className="text-sm text-orange-600">
                            ¿Ya tienes una cuenta?{' '}
                            <span className="text-red-500 font-medium cursor-pointer" onClick={() => setMode('login')}>
                                Inicia Sesión
                            </span>
                        </p>
                    )}
                    {mode === 'forgotPassword' && (
                        <p className="text-sm text-orange-600">
                            ¿Ya tienes una cuenta?{' '}
                            <span className="text-yellow-500 font-medium cursor-pointer" onClick={() => setMode('login')}>
                                Inicia Sesión
                            </span>
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Login;
