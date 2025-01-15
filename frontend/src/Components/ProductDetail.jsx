import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();   // useParams(): A hook from react-router-dom used to extract parameters from the URL
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    reviewerName: "",
    rating: 0,
    comment: "",
  });
  const [loadingProduct, setLoadingProduct] = useState(true);
  // const [loadingReviews, setLoadingReviews] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoadingProduct(true);   // used to track whether the product data is still being fetched from the server or if it has finished loading
        const productResponse = await axios.get(
          `http://localhost:5239/api/products/${id}`
        );
        setProduct(productResponse.data);
      } catch (err) {
        console.error("Failed to fetch product details:", err);
        setProduct(null);
      } finally {
        setLoadingProduct(false);
      }
    };

    fetchProduct();
  }, [id]);               // dependency array: whenever any of those dependencies change, useeffect will be executed again, 
                          // if it is empty, useeffect runs only once when the component mounts.
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // setLoadingReviews(true);
        const reviewsResponse = await axios.get(
          `http://localhost:5239/api/reviews/product/${id}`
        );
        setReviews(reviewsResponse.data || []);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
        setReviews([]);
      } finally {
        // setLoadingReviews(false);
      }
    };

    fetchReviews();
  }, [id]);

  const handleReviewSubmit = async (e) => {     // event
    e.preventDefault();

    try {
      await axios.post("http://localhost:5239/api/reviews", {
        productId: id,
        reviewerName: newReview.reviewerName,
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString(),
      });

      // Refresh the reviews list
      const updatedReviews = await axios.get(
        `http://localhost:5239/api/reviews/product/${id}`
      );
      setReviews(updatedReviews.data || []);

      // Reset form
      setNewReview({ reviewerName: "", rating: 0, comment: "" });
    } catch (err) {
      console.error("Failed to add review:", err);
    }
  };

  const handleAddToCart = async () => {
    if (!product || product.stock <= 0) {
      console.error("Product is out of stock or not loaded properly.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5239/api/products/add-to-cart", {
        productId: product.productId, 
        Quantity: 1,          
      });
  
      if (response.status === 200 || response.status === 201) {
        setCartCount(cartCount + 1);                                  
        setProduct((prevProduct) => ({                                         // callback function to access the previous state
          ...prevProduct,                                      // // Copies all existing properties of the prevProduct object to ensure no data is lost.
          stock: prevProduct.stock - 1,
        }));
      } else {
        console.error("Failed to add product to cart: Unexpected response", response);
      }
    } catch (err) {
      console.error("Failed to add product to cart:", err.message || err);
    }
  };


  const handleStarClick = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i <= rating ? "filled" : ""}`}
          onClick={() => handleStarClick(i)}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  if (loadingProduct) return <p>Loading product details...</p>;

  return (
    <div className="product-detail">
      <header className="custom-header">
        <div className="logo-container">
          <a href="/" className="logo">eShop</a>
        </div>
        <div className="search-bar-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search for products"
          />
          <button className="search-button">Search</button>
        </div>
        <div className="nav-links">
          <a href="/account" className="nav-link">
            <i className="fa fa-user"></i> Account
          </a>
          <a href="/orders" className="nav-link">
            <i className="fa fa-box"></i> Orders
          </a>
          <a href="/cart" className="cart-link">
            <i className="fa fa-shopping-cart"></i> Cart ({cartCount})
          </a>
        </div>
      </header>

      <div className="product-detail-content">
        <div className="product-image-container">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="product-image"
          />
        </div>

        <div className="product-info-container">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-description">{product.description}</p>
          <p className="product-price">₹{product.price}</p>
          <p className="product-stock" style={{ color: product.stock === 0 ? 'red' : 'black' }}>
            {product.stock === 0 ? "Out of Stock" : `Stock Left: ${product.stock}`}
          </p>
          <div className="product-options">
            <button className="buy-now-button">Buy Now</button>
            <button
              className="add-to-cart-button"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? "No Stock Available" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>

      <div className="reviews-section">
        <h2>Customer Reviews</h2>
        {reviews.length > 0 ? (
          <ul className="reviews-list">
            {reviews.map((review) => (
              <li key={review.id} className="review-item">
                <strong>{review.reviewerName}</strong> ({review.rating} / 5)
                <div className="star-rating">{renderStars(review.rating)}</div>
                <p>{review.comment}</p>
                <small>{new Date(review.date).toLocaleDateString()}</small>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet. Be the first to review this product!</p>
        )}
      </div>

      <div className="add-review-section">
        <h3>Add a Review</h3>
        <form onSubmit={handleReviewSubmit} className="review-form">
          <input
            type="text"
            placeholder="Your Name"
            value={newReview.reviewerName}
            onChange={(e) =>
              setNewReview({ ...newReview, reviewerName: e.target.value })
            }
            required
          />
          <div className="star-rating">{renderStars(newReview.rating)}</div>
          <textarea
            placeholder="Your Review"
            value={newReview.comment}
            onChange={(e) =>
              setNewReview({ ...newReview, comment: e.target.value })
            }
            required
          ></textarea>
          <button type="submit">Submit Review</button>
        </form>
      </div>

      <footer className="footer">
        <p>© 2025 eShop, All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default ProductDetail;
