import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import Header from '../components/Header';
import Menu from '../components/Menu'; // Importar el componente Menu

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesStats = () => {
    const [stats, setStats] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalSales, setTotalSales] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para manejar el menú

    useEffect(() => {
        fetchStats();
    }, [startDate, endDate]);

    const fetchStats = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/stats/sales', {
                params: { startDate, endDate },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setStats(response.data);
            calculateTotals(response.data);
        } catch (error) {
            console.error('Error al obtener las estadísticas de ventas:', error);
        }
    };

    const calculateTotals = (stats) => {
        const totalSales = stats.reduce((sum, stat) => sum + stat.totalSales, 0);
        const totalOrders = stats.reduce((sum, stat) => sum + stat.totalOrders, 0);
        setTotalSales(totalSales);
        setTotalOrders(totalOrders);
    };

    const salesData = {
        labels: stats.map(stat => `${stat._id.day}/${stat._id.month}/${stat._id.year}`),
        datasets: [
            {
                label: 'Total de Ventas',
                data: stats.map(stat => stat.totalSales),
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                tension: 0.4,
            },
        ],
    };

    const ordersData = {
        labels: stats.map(stat => `${stat._id.day}/${stat._id.month}/${stat._id.year}`),
        datasets: [
            {
                label: 'Total de Pedidos',
                data: stats.map(stat => stat.totalOrders),
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                tension: 0.4,
            },
        ],
    };

    const chartOptions = {
        plugins: {
            legend: {
                labels: {
                    color: 'white',
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: 'white',
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)',
                },
            },
            y: {
                ticks: {
                    color: 'white',
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)',
                },
            },
        },
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-100 via-yellow-100 to-orange-200 text-gray-800">
            <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
            <Menu toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
            <div className={`container mx-auto p-6 mt-16 transition-all duration-300 ${isMenuOpen ? 'ml-64' : ''}`}>
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 rounded-3xl shadow-lg">
                    <h2 className="text-4xl font-extrabold mb-6 text-center text-white">Estadísticas de Ventas</h2>
                    <div className="flex justify-center mb-8 space-x-4">
                        <div>
                            <label className="text-gray-400 text-sm mb-2 block">Fecha Inicio</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="px-4 py-2 border border-gray-600 bg-gray-700 text-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400"
                            />
                        </div>
                        <div>
                            <label className="text-gray-400 text-sm mb-2 block">Fecha Fin</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="px-4 py-2 border border-gray-600 bg-gray-700 text-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-gray-800 p-6 rounded-2xl shadow-inner flex flex-col items-center justify-center">
                            <h3 className="text-xl font-semibold text-gray-300">Valor Total de Ventas</h3>
                            <p className="text-3xl font-bold text-orange-400 mt-2">${totalSales.toFixed(2)}</p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-2xl shadow-inner flex flex-col items-center justify-center">
                            <h3 className="text-xl font-semibold text-gray-300">Total de Pedidos</h3>
                            <p className="text-3xl font-bold text-orange-400 mt-2">{totalOrders}</p>
                        </div>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-2xl shadow-inner mb-6">
                        <h3 className="text-2xl font-semibold text-white mb-4">Total de Ventas</h3>
                        <Line data={salesData} options={chartOptions} />
                    </div>
                    <div className="bg-gray-800 p-6 rounded-2xl shadow-inner">
                        <h3 className="text-2xl font-semibold text-white mb-4">Total de Pedidos</h3>
                        <Line data={ordersData} options={chartOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalesStats;
