using Microsoft.AspNetCore.Mvc;

[Route("api/products")]
[ApiController]
public class ProductController : ControllerBase
{
    private readonly IProductService _productService;

    public ProductController(IProductService productService)
    {
        _productService = productService;
    }

    // GET: api/products
    [HttpGet]
    public async Task<IActionResult> GetAllProducts()
    {
        try
        {
            var products = await _productService.GetProductsAsync();
            return Ok(products);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal server error: " + ex.Message);
        }
    }

    // GET: api/products/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetProductById(int id)
    {
        try
        {
            var product = await _productService.GetProductByIdAsync(id);
            if (product == null)
            {
                return NotFound("Product not found.");
            }
            return Ok(product);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal server error: " + ex.Message);
        }
    }

    // POST: api/products
    [HttpPost]
    public async Task<IActionResult> CreateProduct([FromBody] Product product)
    {
        try
        {
            if (product == null)
            {
                return BadRequest("Product data is null.");
            }

            if (string.IsNullOrEmpty(product.Name) || product.Price <= 0 || product.Stock < 0)
            {
                return BadRequest("Invalid product data.");
            }

            await _productService.AddProductAsync(product);
            return CreatedAtAction(nameof(GetProductById), new { id = product.ProductId }, product);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal server error: " + ex.Message);
        }
    }

    // POST: api/products/add-to-cart
    [HttpPost("add-to-cart")]
    public async Task<IActionResult> AddToCart([FromBody] CartRequest cartRequest)
    {
        try
        {
            if (cartRequest == null || cartRequest.Quantity <= 0)
            {
                return BadRequest("Invalid cart request.");
            }

            await _productService.AddToCartAsync(cartRequest.ProductId, cartRequest.Quantity);
            return Ok("Product added to cart successfully.");
        }
        catch (Exception ex)
        {
            return BadRequest("Failed to add to cart: " + ex.Message);
        }
    }

    // DELETE: api/products/{id}
[HttpDelete("{id}")]
public async Task<IActionResult> DeleteProduct(int id)
{
    try
    {
        var product = await _productService.GetProductByIdAsync(id);
        if (product == null)
        {
            return NotFound("Product not found.");
        }

        await _productService.DeleteProductAsync(id);
        return Ok("Product deleted successfully.");
    }
    catch (Exception ex)
    {
        return StatusCode(500, "Internal server error: " + ex.Message);
    }
}

}
