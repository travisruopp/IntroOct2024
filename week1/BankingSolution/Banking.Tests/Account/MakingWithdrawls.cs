

using Banking.Domain;
using Banking.Tests.TestDoubles;

namespace Banking.Tests.Account;
public class MakingWithdrawls
{
    [Theory]
    [InlineData(112.25)]
    [InlineData(305.26)]
    public void WithdrawingMoneyDecreasesBalance(decimal amountToWithdraw)
    {
        // Given
        var account = new BankAccount(new DummyBonusCalculator());
        var openingBalance = account.GetBalance();
        //var amountToWithdraw = 112.25M;

        // When
        account.Withdraw(amountToWithdraw);

        // Then
        var endingBalance = account.GetBalance();

        Assert.Equal(openingBalance - amountToWithdraw, endingBalance);
    }


    [Fact]
    public void CustomersCanTheirFullBalance()
    {
        var account = new BankAccount(new DummyBonusCalculator());
        var openingBalance = account.GetBalance();

        account.Withdraw(openingBalance);

        Assert.Equal(0, account.GetBalance());
    }
}
