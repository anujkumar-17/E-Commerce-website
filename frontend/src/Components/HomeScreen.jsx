import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/HomeScreen.css";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5239/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-screen">
      {/* Custom Header */}
      <header className="custom-header">
        {/* Logo */}
        <div className="logo-container">
          <Link to="/" className="logo">eShop</Link>
        </div>

        {/* Search Bar */}
        <div className="search-bar-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search for products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button">Search</button>
        </div>

        {/* Navigation Links */}
        <div className="nav-links">
          <Link to="/account" className="nav-link">
            <i className="fa fa-user"></i> Account
          </Link>
          <Link to="/orders" className="nav-link">
            <i className="fa fa-box"></i> Orders
          </Link>
          <Link to="/cart" className="cart-link">
            <i className="fa fa-shopping-cart"></i> Cart
          </Link>
        </div>
      </header>

      {/* Product Listing */}
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <Link to={`/${product.productId}`} key={product.productId} className="product-card">
            <img src={product.imageUrl} alt={product.name} />
            <h2>{product.name}</h2>
            <p className="price">₹{product.price.toFixed(2)}</p>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 eShop, All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default HomeScreen;
