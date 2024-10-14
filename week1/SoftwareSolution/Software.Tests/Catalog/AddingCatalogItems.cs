using Alba;

namespace Software.Tests.Catalog;
public class AddingCatalogItems
{
    [Fact]
    public async Task AddingAnItemToTheCatalogAsync()
    {
        var host = await AlbaHost.For<Program>();

        await host.Scenario(api =>
        {
            api.Post.Url("/catalog");
            api.StatusCodeShouldBeOk();
        });
    }
}
