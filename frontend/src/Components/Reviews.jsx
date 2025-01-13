// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Reviews = ({ productId }) => {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5239/api/reviews/${productId}`);

//         // Normalize the response to always be an array
//         const reviewsData = Array.isArray(response.data)
//           ? response.data
//           : [response.data]; // Wrap single object in an array

//         setReviews(reviewsData);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching reviews:", error);
//         setReviews([]); // Fallback to an empty array
//         setLoading(false);
//       }
//     };

//     fetchReviews();
//   }, [productId]);

//   if (loading) return <p>Loading reviews...</p>;

//   return (
//     <div className="reviews">
//       <h2>Reviews</h2>
//       {reviews.length === 0 ? (
//         <p>No reviews yet.</p>
//       ) : (
//         <ul>
//           {reviews.map((review) => (
//             <li key={review.reviewId}>
//               <p>
//                 <strong>{review.reviewerName}</strong>: {review.comment}
//               </p>
//               <p>Rating: {review.rating}/5</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Reviews;


import React, { useEffect, useState } from "react";
import axios from "axios";

const Reviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Dynamically fetch reviews based on productId
        const response = await axios.get(`http://localhost:5239/api/reviews/product/${productId}`);

        // Check if the response contains a review object or an array
        const fetchedReviews = Array.isArray(response.data)
          ? response.data
          : [response.data]; // Wrap single review in an array

        setReviews(fetchedReviews);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setReviews([]); // Fallback to an empty array
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  if (loading) return <p>Loading reviews...</p>;

  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet for this product.</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.reviewId}>
              <p>
                <strong>{review.reviewerName}</strong>: {review.comment}
              </p>
              <p>Rating: {review.rating}/5</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reviews;
