import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { categoriesData } from '../data/categoriesData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CategoryCarousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '0',
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-4xl font-bold mb-8 text-center text-green-300">Categorías</h2>
            <Slider {...settings}>
                {categoriesData.map((category) => (
                    <div key={category.name} className="px-4">
                        <Link
                            to={`/categories/${category.name}`}
                            className="block bg-gray-800 p-8 rounded-full shadow-lg hover:scale-105 transition-transform"
                        >
                            <div className="flex flex-col items-center justify-center h-32 w-32 mx-auto">
                                <FontAwesomeIcon icon={category.icon} className="text-5xl text-green-400 mb-2" />
                                <h3 className="text-lg font-semibold text-green-400 text-center">{category.name}</h3>
                            </div>
                        </Link>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default CategoryCarousel;
