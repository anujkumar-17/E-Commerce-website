using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

[Route("api/reviews")]
[ApiController]
public class ReviewController : ControllerBase
{
    private readonly IReviewService _reviewService;

    public ReviewController(IReviewService reviewService)
    {
        _reviewService = reviewService;
    }

    // GET: api/reviews/product/{productId}
    [HttpGet("product/{productId}")]
    public async Task<IActionResult> GetReviewsByProductId(int productId)
    {
        try
        {
            var reviews = await _reviewService.GetReviewsByProductIdAsync(productId);
            if (reviews == null || !reviews.Any())
            {
                return NotFound("No reviews found for this product.");
            }
            return Ok(reviews);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal server error: " + ex.Message);
        }
    }

    // GET: api/reviews/{reviewId}
    [HttpGet("{reviewId}")]
    public async Task<IActionResult> GetReviewById(int reviewId)
    {
        try
        {
            var review = await _reviewService.GetReviewByIdAsync(reviewId);
            if (review == null)
            {
                return NotFound("Review not found.");
            }
            return Ok(review);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal server error: " + ex.Message);
        }
    }

    // POST: api/reviews
    [HttpPost]
    public async Task<IActionResult> AddReview([FromBody] Review review)
    {
        try
        {
            if (review == null)
            {
                return BadRequest("Review data is null.");
            }

            if (string.IsNullOrEmpty(review.ReviewerName) || string.IsNullOrEmpty(review.Comment) || review.Rating < 1 || review.Rating > 5)
            {
                return BadRequest("Invalid review data. Rating should be between 1 and 5, and all fields must be provided.");
            }

            await _reviewService.AddReviewAsync(review);
            return CreatedAtAction(nameof(GetReviewById), new { reviewId = review.ReviewId }, review);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal server error: " + ex.Message);
        }
    }

    // DELETE: api/reviews/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteReview(int id)
    {
        try
        {
            var review = await _reviewService.GetReviewByIdAsync(id);
            if (review == null)
            {
                return NotFound("Review not found.");
            }

            await _reviewService.DeleteReviewAsync(id);
            return Ok("Review deleted successfully.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal server error: " + ex.Message);
        }
    }
}
