using Microsoft.EntityFrameworkCore;

public class ECommerceDbContext : DbContext
{
    public ECommerceDbContext(DbContextOptions<ECommerceDbContext> options) : base(options) { }

    public DbSet<Product> Products { get; set; }
    public DbSet<Review> Reviews { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Define the relationship between Review and Product using the foreign key
        modelBuilder.Entity<Review>()
            .HasOne<Product>()  // Define the navigation to the Product table (no need to reference the Product property in Review)
            .WithMany()         // Product can have many Reviews
            .HasForeignKey(r => r.ProductId)  // Use ProductId as the foreign key
            .OnDelete(DeleteBehavior.Cascade);  // Optional: Set cascade delete behavior (if needed)
    }
}
