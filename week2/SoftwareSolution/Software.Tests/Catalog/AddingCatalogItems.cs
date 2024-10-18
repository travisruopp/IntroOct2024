using Alba;
using Software.Api.Catalog;

namespace Software.Tests.Catalog;
public class AddingCatalogItems
{
    [Fact]
    public async Task AddingAnItemToTheCatalogAsync()
    {
        var host = await AlbaHost.For<Program>();
        var request = new CatalogCreateModel
        {
            Title = "Rider",
            Vendor = "Jetrains",
            IsOpenSource = false
        };
        var expected = new CatalogResponseModel
        {
            Id = Guid.Empty,
            Title = "Rider",
            Vendor = "Jetrains",
            IsOpenSource = false
        };
        var response = await host.Scenario(api =>
        {
            api.Post.Json(request).ToUrl("/catalog");
            api.StatusCodeShouldBeOk();
        });
        var actualResponse = await response.ReadAsJsonAsync<CatalogResponseModel>();

        Assert.Equal(expected, actualResponse);
    }
}
