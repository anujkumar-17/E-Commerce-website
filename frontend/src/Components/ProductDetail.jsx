import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // To extract productId from URL
import Reviews from "./Reviews"; // Assuming Reviews component is already implemented
import "../styles/ProductDetail.css"; // For styling

const ProductDetail = () => {
  const { id } = useParams(); // Extract product ID from URL (this will match the /product/:id route)
  const [product, setProduct] = useState(null);
  const [cartMessage, setCartMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stockCount, setStockCount] = useState(0);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        // Fetch product details based on the product ID from the URL
        const response = await axios.get(`http://localhost:5239/api/products/${id}`);
        setProduct(response.data);
        setStockCount(response.data.stock); // Assuming stock field exists in the response

        setLoading(false);
      } catch (err) {
        setError("Failed to load product details.");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // Re-run this effect if the product ID changes

  // Add to Cart function
  const addToCart = async () => {
    if (stockCount === 0) {
      setCartMessage("Product not available.");
      return;
    }

    try {
      await axios.post("http://localhost:5239/api/products/add-to-cart", {
        productId: id,
        quantity: 1, // Default quantity
      });

      // Reduce stock count on successful addition to the cart
      setStockCount((prevStock) => prevStock - 1);
      setCartMessage("Product added to cart successfully!");
    } catch (err) {
      setCartMessage("Failed to add product to cart.");
    }
  };

  // Loading state
  if (loading) return <p>Loading...</p>;

  // Error state
  if (error) return <p>{error}</p>;

  // Render product details
  return (
    <div className="product-detail">
      {product && (
        <div className="product-info">
          <img src={product.imageUrl} alt={product.name} className="product-image" />
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>Price: ₹{product.price}</p>

          {/* Display stock count or product not available message */}
          {stockCount === 0 ? (
            <p>Product not available</p>
          ) : (
            <p>Stock Left: {stockCount}</p>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={addToCart}
            className="add-to-cart-button"
            disabled={stockCount <= 0} // Disable if no stock is left
          >
            Add to Cart
          </button>

          {cartMessage && <p className="cart-message">{cartMessage}</p>}
        </div>
      )}

      {/* Reviews Component */}
      <Reviews productId={id} />
    </div>
  );
};

export default ProductDetail;
