

using Banking.Domain;

namespace Banking.Tests.Account;
public class MakingWithdrawls
{
    [Fact]
    public void MakingAWithdrawalToDecreaseOurBalance()
    {
        // Given
        var account = new BankAccount();
        var openingBalance = account.GetBalance();
        var amountToWithdraw = 50M;

        // When
        account.Withdraw(amountToWithdraw);

        // Then
        var endingBalance = account.GetBalance();

        Assert.Equal(openingBalance - amountToWithdraw, endingBalance);
    }
    [Fact]
    public void CustomerCannTakeTheirFullBalance()
    {
        var account = new BankAccount();
        var openingBalance = account.GetBalance();

        account.Withdraw(openingBalance);

        Assert.Equal(0, account.GetBalance());
    }
}
