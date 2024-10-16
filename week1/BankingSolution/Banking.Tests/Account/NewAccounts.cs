
using Banking.Domain;

namespace Banking.Tests.Account;
public class NewAccounts
{
    [Fact]
    public void NewAccountsHaveCorrectOpeningBalance()
    {
        //Given(Arrange)
        var account = new BankAccount();
        //When (Act)
        decimal balance = account.GetBalance();
        //Then (Assert)
        Assert.Equal(5000M, balance);
    }
}
