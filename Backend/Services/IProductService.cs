public interface IProductService
{
    Task<IEnumerable<Product>> GetProductsAsync();
    Task<Product> GetProductByIdAsync(int id);
    Task AddProductAsync(Product product);
    Task AddToCartAsync(int productId, int quantity);
    Task DeleteProductAsync(int id); // Add this method
}
