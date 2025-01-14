// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import "../styles/ProductDetail.css";

// const ProductDetail = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [newReview, setNewReview] = useState({
//     reviewerName: "",
//     rating: 0,
//     comment: "",
//   });
//   const [loadingProduct, setLoadingProduct] = useState(true);
//   const [loadingReviews, setLoadingReviews] = useState(true);
//   const [cartCount, setCartCount] = useState(0); // To keep track of the cart count

//   // Fetch product details
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setLoadingProduct(true);
//         const productResponse = await axios.get(
//           `http://localhost:5239/api/products/${id}`
//         );
//         setProduct(productResponse.data);
//       } catch (err) {
//         console.error("Failed to fetch product details:", err);
//         setProduct(null);
//       } finally {
//         setLoadingProduct(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   // Fetch reviews
//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         setLoadingReviews(true);
//         const reviewsResponse = await axios.get(
//           `http://localhost:5239/api/reviews/product/${id}`
//         );
//         setReviews(reviewsResponse.data || []);
//       } catch (err) {
//         console.error("Failed to fetch reviews:", err);
//         setReviews([]); // Default to empty reviews if fetching fails
//       } finally {
//         setLoadingReviews(false);
//       }
//     };

//     fetchReviews();
//   }, [id]);

//   // Handle review submission
//   const handleReviewSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post("http://localhost:5239/api/reviews", {
//         productId: id,
//         reviewerName: newReview.reviewerName,
//         rating: newReview.rating,
//         comment: newReview.comment,
//         date: new Date().toISOString(),
//       });

//       // Refresh the reviews list
//       const updatedReviews = await axios.get(
//         `http://localhost:5239/api/reviews/product/${id}`
//       );
//       setReviews(updatedReviews.data || []);

//       // Reset form
//       setNewReview({ reviewerName: "", rating: 0, comment: "" });
//     } catch (err) {
//       console.error("Failed to add review:", err);
//     }
//   };

//   // Handle adding to cart
//   const handleAddToCart = () => {
//     if (product.stock > 0) {
//       setCartCount(cartCount + 1); // Increment cart count
//       setProduct({ ...product, stock: product.stock - 1 }); // Decrement stock
//     }
//   };

//   if (loadingProduct) return <p>Loading product details...</p>;

//   return (
//     <div className="product-detail">
//       {/* Custom Header */}
//       <header className="custom-header">
//         {/* Logo */}
//         <div className="logo-container">
//           <a href="/" className="logo">eShop</a>
//         </div>

//         {/* Search Bar */}
//         <div className="search-bar-container">
//           <input
//             type="text"
//             className="search-input"
//             placeholder="Search for products"
//           />
//           <button className="search-button">Search</button>
//         </div>

//         {/* Navigation Links */}
//         <div className="nav-links">
//           <a href="/account" className="nav-link">
//             <i className="fa fa-user"></i> Account
//           </a>
//           <a href="/orders" className="nav-link">
//             <i className="fa fa-box"></i> Orders
//           </a>
//           <a href="/cart" className="cart-link">
//             <i className="fa fa-shopping-cart"></i> Cart ({cartCount})
//           </a>
//         </div>
//       </header>

//       <div className="product-detail-content">
//         <div className="product-image-container">
//           <img
//             src={product.imageUrl}
//             alt={product.name}
//             className="product-image"
//           />
//         </div>

//         <div className="product-info-container">
//           <h1 className="product-title">{product.name}</h1>
//           <p className="product-description">{product.description}</p>
//           <p className="product-price">₹{product.price}</p>
//           <p className="product-stock" style={{ color: product.stock === 0 ? 'red' : 'black' }}>
//             {product.stock === 0 ? "Out of Stock" : `Stock Left: ${product.stock}`}
//           </p>
//           <div className="product-options">
//             <button className="buy-now-button">Buy Now</button>
//             <button
//               className="add-to-cart-button"
//               onClick={handleAddToCart}
//               disabled={product.stock === 0} // Disable button if stock is 0
//             >
//               {product.stock === 0 ? "No Stock Available" : "Add to Cart"}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Reviews Section */}
//       <div className="reviews-section">
//         <h2>Customer Reviews</h2>
//         {reviews.length > 0 ? (
//           <ul className="reviews-list">
//             {reviews.map((review) => (
//               <li key={review.id} className="review-item">
//                 <strong>{review.reviewerName}</strong> ({review.rating} / 5)
//                 <p>{review.comment}</p>
//                 <small>{new Date(review.date).toLocaleDateString()}</small>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No reviews yet. Be the first to review this product!</p>
//         )}
//       </div>

//       {/* Add Review Section */}
//       <div className="add-review-section">
//         <h3>Add a Review</h3>
//         <form onSubmit={handleReviewSubmit} className="review-form">
//           <input
//             type="text"
//             placeholder="Your Name"
//             value={newReview.reviewerName}
//             onChange={(e) =>
//               setNewReview({ ...newReview, reviewerName: e.target.value })
//             }
//             required
//           />
//           <input
//             type="number"
//             placeholder="Rating (1-5)"
//             value={newReview.rating}
//             onChange={(e) =>
//               setNewReview({ ...newReview, rating: parseInt(e.target.value) })
//             }
//             min="1"
//             max="5"
//             required
//           />
//           <textarea
//             placeholder="Your Review"
//             value={newReview.comment}
//             onChange={(e) =>
//               setNewReview({ ...newReview, comment: e.target.value })
//             }
//             required
//           ></textarea>
//           <button type="submit">Submit Review</button>
//         </form>
//       </div>

//       <footer className="footer">
//         <p>© 2025 eShop, All Rights Reserved</p>
//       </footer>
//     </div>
//   );
// };

// export default ProductDetail;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    reviewerName: "",
    rating: 0,
    comment: "",
  });
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoadingProduct(true);
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
  }, [id]);

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoadingReviews(true);
        const reviewsResponse = await axios.get(
          `http://localhost:5239/api/reviews/product/${id}`
        );
        setReviews(reviewsResponse.data || []);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
        setReviews([]);
      } finally {
        setLoadingReviews(false);
      }
    };

    fetchReviews();
  }, [id]);

  // Handle review submission
  const handleReviewSubmit = async (e) => {
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

  // Handle adding to cart
  const handleAddToCart = () => {
    if (product.stock > 0) {
      setCartCount(cartCount + 1); // Increment cart count
      setProduct({ ...product, stock: product.stock - 1 }); // Decrement stock
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
