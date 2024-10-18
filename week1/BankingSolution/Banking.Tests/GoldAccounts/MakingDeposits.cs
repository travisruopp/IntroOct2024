

using Banking.Domain;
using Banking.Tests.TestDoubles;

namespace Banking.Tests.GoldAccounts;
public class MakingDeposits
{
    [Fact]
    public void GetsBonus()
    {
        // Given
        var account = new BankAccount(new StubbedBonusCalculator());
        var openingBalance = account.GetBalance();
        var amountToDeposit = 100M;


        // when

        account.Deposit(amountToDeposit);

        // then
        var expectedBalance = openingBalance + amountToDeposit + 42.23M;

        Assert.Equal(expectedBalance, account.GetBalance());


    }
}
