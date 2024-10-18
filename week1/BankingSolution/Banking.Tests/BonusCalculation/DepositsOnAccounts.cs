

using Banking.Domain;

namespace Banking.Tests.BonusCalculation;
public class DepositsOnAccounts
{
    [Fact]
    public void DepositsAboveThresholdGetBonus()
    {
        var bonusCalculator = new BonusCalculator();

        decimal bonus = bonusCalculator.CalculateBonusForDepositOn(balance: 5000M, amount: 100);

        Assert.Equal(10M, bonus);
    }

    [Fact]
    public void DepositsBelowThresholdDoNotGetBonus()
    {
        var bonusCalculator = new BonusCalculator();

        decimal bonus = bonusCalculator.CalculateBonusForDepositOn(4999.99M, 100);

        Assert.Equal(0, bonus);
    }
}
