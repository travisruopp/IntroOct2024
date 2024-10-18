
using Banking.Domain;

namespace Banking.Tests.TestDoubles;
public class StubbedBonusCalculator : ICalculateBonusesForDeposits
{
    // Stubs provide canned responses to questions.
    public decimal CalculateBonusForDepositOn(decimal balance, decimal amount)
    {
        return balance == 7000M && amount == 100M ? 42.23M : 0;
    }
}
