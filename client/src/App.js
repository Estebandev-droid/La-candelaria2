import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Login';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import ProductForm from './pages/ProductForm';
import ProductList from './pages/ProductList';
import EditProduct from './pages/EditProduct';
import CategoryProducts from './pages/CategoryProducts';
import Inventory from './pages/Inventory';
import OrderHistory from './pages/OrderHistory';
import SalesStats from './components/SalesStats';
import UserProfile from './pages/UserProfile'; // Importar el componente UserProfile
import { LoadingProvider } from './context/LoadingContext';

function App() {
  return (
    <LoadingProvider>
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
            <Route path="/categories/:categoryName" element={<CategoryProducts />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/sales-stats" element={<SalesStats />} />
            <Route path="/profile" element={<UserProfile />} /> {/* Agregar la ruta para UserProfile */}
          </Routes>
        </div>
      </Router>
    </LoadingProvider>
  );
}

export default App;