using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Review
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int ReviewId { get; set; }

    [Required]
    [ForeignKey("Product")]
    public int ProductId { get; set; }  // Foreign key to Product

    [Required]
    [StringLength(100)]
    public string ReviewerName { get; set; }

    [Required]
    [Range(1, 5)]
    public int Rating { get; set; }

    public string Comment { get; set; }

    [Required]
    public DateTime Date { get; set; } = DateTime.Now;

    // You don't need the Product navigation property if you are not including it in the model
}
