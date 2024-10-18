namespace Banking.Domain;

public interface ICalculateBonusesForDeposits
{
    decimal CalculateBonusForDepositOn(decimal balance, decimal amount);
}