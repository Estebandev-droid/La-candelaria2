import { faUtensils, faBroom, faHeart, faBaby, faPaw, faPlug, faTshirt, faGift } from '@fortawesome/free-solid-svg-icons';

export const categoriesData = [
    {
        name: 'Alimentos y Bebidas',
        icon: faUtensils,
        subcategories: [
            'Frutas y Verduras',
            'Carnes y Pescados',
            'Lácteos y Huevos',
            'Panadería y Repostería',
            'Productos Congelados',
            'Productos Secos y Enlatados',
            'Snacks y Dulces',
            'Bebidas',
        ],
    },
    {
        name: 'Artículos de Limpieza y Hogar',
        icon: faBroom,
        subcategories: [
            'Detergentes, desinfectantes, jabones para platos',
            'Productos para baño: papel higiénico, limpiadores, ambientadores',
            'Bolsas de basura, esponjas, trapos',
        ],
    },
    {
        name: 'Higiene y Cuidado Personal',
        icon: faHeart,
        subcategories: [
            'Champús, acondicionadores, jabones corporales',
            'Productos para el cuidado dental: pasta de dientes, cepillos, enjuagues bucales',
            'Cremas, desodorantes, lociones',
        ],
    },
    {
        name: 'Bebés y Niños',
        icon: faBaby,
        subcategories: [
            'Pañales, toallitas húmedas',
            'Fórmulas infantiles, comida para bebés',
        ],
    },
    {
        name: 'Mascotas',
        icon: faPaw,
        subcategories: [
            'Comida para perros y gatos',
            'Productos para cuidado de mascotas: shampoo, juguetes',
        ],
    },
    {
        name: 'Electrónica y Electrodomésticos Pequeños',
        icon: faPlug,
        subcategories: [
            'Pilas, bombillos',
            'Electrodomésticos pequeños: licuadoras, cafeteras',
        ],
    },
    {
        name: 'Ropa y Accesorios',
        icon: faTshirt,
        subcategories: [
            'Calcetines, camisetas básicas, ropa interior',
        ],
    },
    {
        name: 'Otros Productos',
        icon: faGift,
        subcategories: [
            'Revistas, libros',
            'Juguetes, artículos para oficina',
            'Productos de temporada: decoraciones navideñas, artículos para fiestas',
        ],
    },
];