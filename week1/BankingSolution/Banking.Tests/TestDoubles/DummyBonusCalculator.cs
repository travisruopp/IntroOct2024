
using Banking.Domain;

namespace Banking.Tests.TestDoubles;

// A dummy is just a place holder.

public class DummyBonusCalculator : ICalculateBonusesForDeposits
{
    public decimal CalculateBonusForDepositOn(decimal balance, decimal amount)
    {
        return 0;
    }
}
