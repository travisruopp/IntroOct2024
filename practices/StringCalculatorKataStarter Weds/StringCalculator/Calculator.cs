public class Calculator
{
    public int Add(string numbers)
    {
        char newChar;

        if (numbers == "")
        {
            return 0;
        }
        if (numbers.StartsWith("//"))
        {
            newChar = Convert.ToChar(numbers.Substring(2, 3));
        }
        char[] delimiters = new char[] { ',', '\n' };
        if (numbers.Contains(',') || numbers.Contains("\n"))
        {
            var sum = 0;
            for (int i = 0; i < numbers.Split(delimiters).Length; i++)
            {
                string num = numbers.Split(delimiters)[i];
                sum += Convert.ToInt32(num);
            }
            return sum;
        }

        return Int32.Parse(numbers);
    }

}
