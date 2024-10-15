namespace CSharpSyntax;

public class UnitTest1
{
    [Fact]
    public void CanAddTwoIntegers()
    {
        int a = 10;
        int b = 20;
        int answer;

        answer = a + b; // System Under Test -(SUT)

        Assert.Equal(30, answer);

    }

    [Theory]
    [InlineData(10, 20, 30)]
    [InlineData(2, 2, 4)]
    [InlineData(10, 2, 12)]
    public void CanAddSomeIntegersTogether(int a, int b, int expecting)
    {
        int answer = a + b;

        Assert.Equal(expecting, answer);
    }
}