import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/HomeScreen.css";

// Demonstrating how await keyword pauses the async function temporarily, the rest of your application can continue running other tasks

// console.log("Start");

// async function fetchData() {
//   console.log("Fetching data...");
//   await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulates a 2-second delay
//   console.log("Data fetched");
// }

// fetchData();

// console.log("End");

// output:
// --> Start
// --> Fetching data...
// --> End
// --> Data fetched

// Instead of using await for each request sequentially, you can use Promise.all to send both requests at the same time
// const [productsResponse, categoriesResponse] = await Promise.all([
//   axios.get("http://localhost:5239/api/products"),    // Request 1
//   axios.get("http://localhost:5239/api/categories"),  // Request 2
// ]);


const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");        

  useEffect(() => {                                           // as soon as the component is mounted, useeffect runs, handling side effects!
    const fetchProducts = async () => {                       // custom function: for fetching data from the server 
      
                                                              // Such operations are handled in the background without "blocking" the rest of the code.
      try {                                                   // async: It tells JavaScript that this function will handle some operations that take time (e.g., fetching data).                                                              
        const response = await axios.get("http://localhost:5239/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);     // await is non-blocking for the main thread of JavaScript.
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
            onChange={(e) => setSearchTerm(e.target.value)}     // An event handler that runs whenever the user types in the input box.
                                                                // It calls the setSearchTerm function to update the searchTerm state with the new value (e.target.value).
          />
          <button className="search-button">Search</button>
        </div>

        {/* Navigation Links: inserting icons for all the parameters */}                             
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

      {/* Product Listing, key={product.productId}: Ensures React efficiently updates the DOM by uniquely identifying each card. */}
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
