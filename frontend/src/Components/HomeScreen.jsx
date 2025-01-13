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
      {/* Header */}
      <header className="header">
        <div className="logo">
          <h1>eShop</h1>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="header-links">
          <Link to="/cart" className="cart-link">Cart</Link>
          <Link to="/account" className="account-link">Account</Link>
        </div>
      </header>

      {/* Product Listing */}
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <Link to={`/${product.productId}`} key={product.productId} className="product-card">
            <img src={product.imageUrl} alt={product.name} />
            <h2>{product.name}</h2>
            <p>₹{product.price.toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
