// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AddToCart = ({ productId }) => {
//   const [stockCount, setStockCount] = useState(0);
//   const [cartMessage, setCartMessage] = useState("");
//   const [loading, setLoading] = useState(true);

//   // Fetch the initial stock count for the product
//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5239/api/products/${productId}`);
//         setStockCount(response.data.stock); // Assuming the stock count is in the 'stock' field
//         console.log(response.data.stock);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching product details:", error);
//         setLoading(false);
//       }
//     };

//     fetchProductDetails();
//   }, [productId]);

//   // Function to add the product to the cart
//   const addToCart = async () => {
//     try {
//       // Send a request to add the product to the cart
//       await axios.post("http://localhost:5239/api/products/add-to-cart", {
//         productId: productId,
//         quantity: 1, // Default quantity
//       });

//       // Reduce stock count on successful addition to the cart
//       setStockCount((prevStock) => prevStock - 1);
//       setCartMessage("Product added to cart successfully!");
//     } catch (err) {
//       setCartMessage("Failed to add product to cart.");
//     }
//   };

//   if (loading) return <p>Loading product details...</p>;

//   return (
//     <div className="add-to-cart">
//       <h2>Product Details</h2>
//       {stockCount === 0 ? (
//         <p>Product not available</p> // Show message when stock is 0
//       ) : (
//         <>
//           <p>Stock Left: {stockCount}</p>
//           <button
//             onClick={addToCart}
//             disabled={stockCount <= 0} // Disable button if no stock is left
//           >
//             Add to Cart
//           </button>
//         </>
//       )}
//       {cartMessage && <p>{cartMessage}</p>}
//     </div>
//   );
// };

// export default AddToCart;
