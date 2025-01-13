using System.Collections.Generic;
using System.Threading.Tasks;

public interface IReviewService
{
    Task<IEnumerable<Review>> GetReviewsByProductIdAsync(int productId);
    Task<Review> GetReviewByIdAsync(int reviewId);
    Task AddReviewAsync(Review review);
    Task DeleteReviewAsync(int reviewId);
}
