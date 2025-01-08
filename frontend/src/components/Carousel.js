import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Carousel.css'; // Importar los estilos del carrusel

const categories = [
    { name: 'Aseo', icon: '🧼', path: '/category/aseo' },
    { name: 'Dulces', icon: '🍬', path: '/category/dulces' },
    { name: 'Bebidas', icon: '🥤', path: '/category/bebidas' },
    { name: 'Frutas', icon: '🍎', path: '/category/frutas' },
    { name: 'Verduras', icon: '🥦', path: '/category/verduras' },
];

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
        }, 3000); // Cambiar categoría cada 3 segundos

        return () => clearInterval(interval);
    }, []);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + categories.length) % categories.length);
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
    };

    return (
        <div className="carousel-container">
            <button className="carousel-button left" onClick={handlePrev}>◀</button>
            <div className="carousel">
                {categories.map((category, index) => (
                    <Link
                        to={category.path}
                        key={index}
                        className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
                    >
                        <div className="carousel-icon">{category.icon}</div>
                        <div className="carousel-name">{category.name}</div>
                    </Link>
                ))}
            </div>
            <button className="carousel-button right" onClick={handleNext}>▶</button>
        </div>
    );
};

export default Carousel;