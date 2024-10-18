


namespace Banking.Domain;

public class BankAccount(ICalculateBonusesForDeposits calculator)
{
    private decimal _balance = 7000M;
    //private ICalculateBonusesForDeposits calculator;

    //public BankAccount(ICalculateBonusesForDeposits calculator)
    //{
    //    this.calculator = calculator;
    //}

    public void Deposit(decimal amountToDeposit)
    {

        decimal bonus = calculator.CalculateBonusForDepositOn(_balance, amountToDeposit);

        _balance += amountToDeposit + bonus;
    }

    public decimal GetBalance()
    {
        return _balance;
    }

    public void Withdraw(decimal amountToWithdraw)
    {
        if (_balance >= amountToWithdraw)
        {
            _balance -= amountToWithdraw;
        }
        else
        {
            throw new AccountOverdraftException();
        }
    }
}

public class AccountOverdraftException : ArgumentOutOfRangeException;