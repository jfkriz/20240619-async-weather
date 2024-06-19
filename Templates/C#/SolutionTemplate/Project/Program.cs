using System;
using System.Threading.Tasks;

namespace Project
{
    class Program
    {
        static async Task Main(string[] args)
        {
            Console.WriteLine($"Hello World! {DateTime.Now.ToLongTimeString()}");
            await Task.Delay(10 * 1000);
            Console.WriteLine($"And Goodbye too! {DateTime.Now.ToLongTimeString()}");
        }
    }
}
