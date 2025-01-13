using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public class ReviewService : IReviewService
{
    private readonly ECommerceDbContext _context;

    public ReviewService(ECommerceDbContext context)
    {
        _context = context;
    }

    // Get all reviews for a specific product using raw SQL query
    public async Task<IEnumerable<Review>> GetReviewsByProductIdAsync(int productId)
    {
        return await _context.Reviews
            .FromSqlRaw("SELECT * FROM Review WHERE ProductId = {0}", productId)
            .ToListAsync();
    }

    // Get a specific review by its ID using raw SQL query
    public async Task<Review> GetReviewByIdAsync(int reviewId)
    {
        var review = await _context.Reviews
            .FromSqlRaw("SELECT * FROM Review WHERE ReviewId = {0}", reviewId)
            .FirstOrDefaultAsync();

        if (review == null)
        {
            throw new KeyNotFoundException("Review not found.");
        }

        return review;
    }

    // Add a new review using raw SQL query
    public async Task AddReviewAsync(Review review)
    {
        if (review == null)
        {
            throw new ArgumentNullException(nameof(review), "Review cannot be null.");
        }

        await _context.Database.ExecuteSqlRawAsync(
            "INSERT INTO Review (ProductId, ReviewerName, Rating, Comment, Date) " +
            "VALUES ({0}, {1}, {2}, {3}, {4})",
             review.ProductId, review.ReviewerName, review.Rating, review.Comment, review.Date
        );
        
    }

    // Delete a review by its ID using raw SQL query
    public async Task DeleteReviewAsync(int reviewId)
    {
        var review = await _context.Reviews
            .FromSqlRaw("SELECT * FROM Review WHERE ReviewId = {0}", reviewId)
            .FirstOrDefaultAsync();

        if (review == null)
        {
            throw new KeyNotFoundException("Review not found.");
        }

        await _context.Database.ExecuteSqlRawAsync(
            "DELETE FROM Review WHERE ReviewId = {0}", reviewId
        );
    }
}
