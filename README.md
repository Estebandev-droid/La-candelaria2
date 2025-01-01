# La Candelaria

## Descripción del Proyecto
La Candelaria es una aplicación de domicilios para un supermercado que permite a los usuarios ver productos, realizar pedidos y gestionar su cuenta. La aplicación está diseñada para ser escalable y utiliza la arquitectura MERN (MongoDB, Express, React, Node.js) con un enfoque en un diseño moderno y atractivo utilizando Tailwind CSS.

## Estructura del Proyecto
El proyecto está dividido en dos partes principales: el backend y el frontend.

### Backend
- **controllers/userController.js**: Controlador que maneja el registro e inicio de sesión de usuarios.
- **models/userModel.js**: Modelo de usuario que define la estructura de los datos en la base de datos.
- **routes/userRoutes.js**: Configuración de las rutas para el registro e inicio de sesión.
- **config/db.js**: Configuración de la conexión a la base de datos MongoDB.
- **server.js**: Punto de entrada del servidor Express.
- **package.json**: Dependencias y scripts del backend.

### Frontend
- **public/index.html**: Plantilla HTML principal para la aplicación React.
- **src/components/Login.js**: Componente para el formulario de inicio de sesión.
- **src/pages/Home.js**: Componente que muestra la lista de productos.
- **src/App.js**: Componente principal que configura las rutas.
- **src/index.js**: Punto de entrada de la aplicación React.
- **src/tailwind.css**: Estilos de Tailwind CSS.
- **tailwind.config.js**: Configuración de Tailwind CSS.
- **package.json**: Dependencias y scripts del frontend.

## Instalación
1. Clona el repositorio:
   ```
   git clone <URL_DEL_REPOSITORIO>
   ```
2. Navega a la carpeta del backend y ejecuta:
   ```
   cd backend
   npm install
   ```
3. Configura la base de datos en `config/db.js`.
4. Inicia el servidor:
   ```
   node server.js
   ```
5. Navega a la carpeta del frontend y ejecuta:
   ```
   cd frontend
   npm install
   ```
6. Inicia la aplicación React:
   ```
   npm start
   ```

## Uso
- Los usuarios pueden registrarse y acceder a su cuenta.
- Navegar por la lista de productos disponibles.
- Realizar pedidos y gestionar su carrito de compras.

## Contribuciones
Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request para discutir cambios.

## Licencia
Este proyecto está bajo la Licencia MIT.