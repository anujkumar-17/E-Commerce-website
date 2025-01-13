using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

public class ProductService : IProductService
{
    private readonly ECommerceDbContext _context;

    public ProductService(ECommerceDbContext context)
    {
        _context = context;
    }

    // Fetch all products using raw SQL query
    public async Task<IEnumerable<Product>> GetProductsAsync()
    {
        return await _context.Products
            .FromSqlRaw("SELECT * FROM product")
            .ToListAsync();
    }

    // Fetch product by ID using raw SQL query
    public async Task<Product> GetProductByIdAsync(int id)
    {
        var product = await _context.Products
            .FromSqlRaw("SELECT * FROM product WHERE ProductId = {0}", id)
            .FirstOrDefaultAsync();

        if (product == null)
        {
            throw new KeyNotFoundException("Product not found.");
        }

        return product;
    }

    // Add a new product using EF Core (not SQL, as it simplifies insertions)
    public async Task AddProductAsync(Product product)
    {
        if (product == null)
        {
            throw new ArgumentNullException(nameof(product), "Product cannot be null.");
        }

        await _context.Database.ExecuteSqlRawAsync(
            "INSERT INTO product (Name, Description, Price, ImageUrl, Stock, Category) " +
            "VALUES ({0}, {1}, {2}, {3}, {4}, {5})",
            product.Name, product.Description, product.Price, product.ImageUrl, product.Stock, product.Category
        );
    }

    // Add a product to the cart using raw SQL query
    public async Task AddToCartAsync(int productId, int quantity)
    {
        var product = await _context.Products
            .FromSqlRaw("SELECT * FROM product WHERE ProductId = {0}", productId)
            .FirstOrDefaultAsync();

        if (product == null)
        {
            throw new KeyNotFoundException("Product not found.");
        }

        if (product.Stock < quantity)
        {
            throw new InvalidOperationException("Insufficient stock.");
        }

        await _context.Database.ExecuteSqlRawAsync(
            "UPDATE product SET Stock = Stock - {0} WHERE ProductId = {1}",
            quantity, productId
        );
    }

    // Delete a product using raw SQL query
public async Task DeleteProductAsync(int id)
{
    var product = await _context.Products
        .FromSqlRaw("SELECT * FROM product WHERE ProductId = {0}", id)
        .FirstOrDefaultAsync();

    if (product == null)
    {
        throw new KeyNotFoundException("Product not found.");
    }

    await _context.Database.ExecuteSqlRawAsync(
        "DELETE FROM product WHERE ProductId = {0}",
        id
    );
}

}
