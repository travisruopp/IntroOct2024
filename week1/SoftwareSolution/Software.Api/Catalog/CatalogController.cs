using Microsoft.AspNetCore.Mvc;

namespace Software.Api.Catalog;

public class CatalogController : ControllerBase
{
    [HttpPost("/catalog")]
    public async Task<ActionResult> AddSoftwareToCatalogAsync()
    {
        return Ok();
    }
}
