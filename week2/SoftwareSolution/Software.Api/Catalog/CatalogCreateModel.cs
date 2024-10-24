using System.ComponentModel.DataAnnotations;

namespace Software.Api.Catalog;

public class CatalogCreateModel
{
    [Required, MinLength(3), MaxLength(20)]
    public string Title { get; set; } = string.Empty;
    public string Vendor { get; set; } = string.Empty;
    public bool IsOpenSource { get; set; }
}
