public class Calculator
{
    public int Add(string numbers)
    {
        List<string> delimiters = new() { ",", "\n" };

        if (numbers == "")
        {
            return 0;
        }

        if (numbers.Contains(",") || numbers.Contains("\n"))
        {
            int sumNumber = 0;

            foreach (char n in numbers.ToCharArray())
            {
                string numStr = "";
                if (!Char.IsDigit(n))
                {
                    if (numStr.Length == 0)
                    {
                        continue;
                    }
                    sumNumber += Int32.Parse(numStr);
                    numStr = "";
                }
                else
                {
                    numStr += n;
                }
            }
            return sumNumber;
        }
        // "1\n2,3"
        //if (numbers.Contains(',') || numbers.Contains("\n"))
        //{
        //    var sum = 0;
        //    for (int i = 0; i < numbers.Split(delimiter).Length; i++)
        //    {
        //        string num = numbers.Split(delimiter)[i];
        //        sum += Convert.ToInt32(num);
        //    }
        //    return sum;
        //}

        return Int32.Parse(numbers);
    }

}
