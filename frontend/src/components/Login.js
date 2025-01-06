import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Checkbox from './Checkbox';

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
            const response = await axios.post('/api/users/register', { username, password, email });
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
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-900 via-red-800 to-green-900">
            <form 
                onSubmit={mode === 'login' ? handleLogin : mode === 'register' ? handleRegister : handleForgotPassword} 
                className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-2xl w-96 transform transition-all duration-500 hover:scale-105">
                <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-green-600 mb-6 text-center">
                    {mode === 'login' ? 'Iniciar Sesión' : mode === 'register' ? 'Registrar Usuario' : 'Recuperar Contraseña'}
                </h2>
                {error && <p className="text-red-500 font-semibold text-sm mb-4">{error}</p>}
                {mode !== 'forgotPassword' && (
                    <div className="mb-4 relative">
                        <label className="block text-sm font-semibold text-gray-300">Usuario</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full border border-gray-600 rounded-lg p-3 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 pl-10"
                            placeholder="Ingresa tu usuario"
                            required
                        />
                        <i className="fas fa-user absolute left-3 top-10 text-gray-400"></i>
                    </div>
                )}
                {mode === 'register' && (
                    <div className="mb-4 relative">
                        <label className="block text-sm font-semibold text-gray-300">Correo Electrónico</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full border border-gray-600 rounded-lg p-3 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 pl-10"
                            placeholder="Ingresa tu correo"
                            required
                        />
                        <i className="fas fa-envelope absolute left-3 top-10 text-gray-400"></i>
                    </div>
                )}
                {mode !== 'forgotPassword' && (
                    <div className="mb-4 relative">
                        <label className="block text-sm font-semibold text-gray-300">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full border border-gray-600 rounded-lg p-3 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500 pl-10"
                            placeholder="Ingresa tu contraseña"
                            required
                        />
                        <i className="fas fa-lock absolute left-3 top-10 text-gray-400"></i>
                    </div>
                )}
                {mode === 'login' && (
                    <div className="mb-4 flex items-center">
                        <Checkbox
                            checked={rememberUser}
                            onChange={(e) => setRememberUser(e.target.checked)}
                        />
                        <span className="text-sm text-green-500 ml-2">Recordar usuario</span>
                    </div>
                )}
                <button type="submit" className="w-full bg-gradient-to-r from-red-500 to-green-500 text-white font-bold py-2 px-4 rounded-lg hover:scale-105 transition-transform">
                    {mode === 'login' ? 'Iniciar Sesión' : mode === 'register' ? 'Registrar' : 'Recuperar Contraseña'}
                </button>
                <div className="mt-6 text-center">
                    {mode === 'login' && (
                        <>
                            <p className="text-sm text-gray-300">
                                ¿No tienes una cuenta?{' '}
                                <span className="text-green-500 font-medium cursor-pointer" onClick={() => setMode('register')}>
                                    Regístrate
                                </span>
                            </p>
                            <p className="text-sm text-gray-300 mt-2">
                                ¿Olvidaste tu contraseña?{' '}
                                <span className="text-red-500 font-medium cursor-pointer" onClick={() => setMode('forgotPassword')}>
                                    Recupérala
                                </span>
                            </p>
                        </>
                    )}
                    {mode === 'register' && (
                        <p className="text-sm text-gray-300">
                            ¿Ya tienes una cuenta?{' '}
                            <span className="text-red-500 font-medium cursor-pointer" onClick={() => setMode('login')}>
                                Inicia Sesión
                            </span>
                        </p>
                    )}
                    {mode === 'forgotPassword' && (
                        <p className="text-sm text-gray-300">
                            ¿Ya tienes una cuenta?{' '}
                            <span className="text-green-500 font-medium cursor-pointer" onClick={() => setMode('login')}>
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
