import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Login';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import ProductForm from './pages/ProductForm';
import ProductList from './pages/ProductList';
import EditProduct from './pages/EditProduct';
<<<<<<< HEAD
import CategoryProducts from './pages/CategoryProducts';
=======
import Category from './pages/Category'; // Importar el componente de categoría
>>>>>>> origin/main

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/create-product" element={<ProductForm />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/product-list" element={<ProductList />} />
<<<<<<< HEAD
          <Route path="/categories/:categoryName" element={<CategoryProducts />} />
=======
          <Route path="/category/:categoryName" element={<Category />} /> {/* Ruta para las categorías */}
>>>>>>> origin/main
        </Routes>
      </div>
    </Router>
  );
}

export default App;