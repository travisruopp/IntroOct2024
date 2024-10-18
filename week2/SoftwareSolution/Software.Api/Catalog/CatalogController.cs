using Marten;
using Microsoft.AspNetCore.Mvc;

namespace Software.Api.Catalog;

public class CatalogController(IDocumentSession session) : ControllerBase
{
    [HttpPost("/catalog")]
    public async Task<ActionResult> AddSoftwareToCatalogAsync([FromBody] CatalogCreateModel request)
    {
        var response = new CatalogResponseModel()
        {
            Id = Guid.NewGuid(),
            IsOpenSource = request.IsOpenSource,
            Title = request.Title,
            Vendor = request.Vendor,
        };
        var thingToSave = new CatalogEntity()
        {
            Id = response.Id,
            IsOpenSource = response.IsOpenSource,
            Title = response.Title,
            Vendor = response.Vendor,
        };
        session.Store(thingToSave);
        await session.SaveChangesAsync();

        return Ok(response);
    }
}

public class CatalogCreateModel
{
    public string Title { get; set; } = string.Empty;
    public string Vendor { get; set; } = string.Empty;
    public bool IsOpenSource { get; set; }
}

public record CatalogResponseModel
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Vendor { get; set; } = string.Empty;
    public bool IsOpenSource { get; set; }
}
public class CatalogEntity
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Vendor { get; set; } = string.Empty;
    public bool IsOpenSource { get; set; }
}
