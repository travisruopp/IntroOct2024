

using Banking.Domain;

namespace Banking.Tests.Account;
public class MakingDeposits
{
    [Fact]
    public void MakingADepositIncreasesOurBalance()
    {
        // Given
        var account = new BankAccount();
        var openingBalance = account.GetBalance();
        var amountToDeposit = 112.25M;

        // When
        account.Deposit(amountToDeposit);

        // Then
        var endingBalance = account.GetBalance();

        Assert.Equal(amountToDeposit + openingBalance, endingBalance);
    }
}
