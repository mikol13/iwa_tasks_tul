package pl.dmcs.rkotas.springbootjsp_iwa2026.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import pl.dmcs.rkotas.springbootjsp_iwa2026.model.Fibonacci;

@Controller
public class FibonacciController {

    @RequestMapping("/fibonacci")
    public String fibonacci(Model model) {
        model.addAttribute("message", "Fibonacci Number Calculator");
        Fibonacci newFibonacci = new Fibonacci();
        model.addAttribute("fibonacci", newFibonacci);
        return "fibonacci";
    }

    @RequestMapping(value = "/addFibonacci.html", method = RequestMethod.POST)
    public String addFibonacci(@ModelAttribute("fibonacci") Fibonacci fibonacci, Model model) {

        if (fibonacci.getPosition() == null) {
            System.out.println("Enter correct value");
            model.addAttribute("fibonacci", new Fibonacci());
            model.addAttribute("message", "Fibonacci Number Calculator");
            return "fibonacci";
        }

        int position = fibonacci.getPosition();

        if (position < 0) {
            System.out.println("Enter correct not negative number");
            model.addAttribute("fibonacci", new Fibonacci());
            model.addAttribute("message", "Fibonacci Number Calculator");
            return "fibonacci";
        }

        System.out.println("Enter number of position: " + position);

        long fibonacciNumber = calculateFibonacci(position);
        System.out.println("Number: " + fibonacciNumber);

        model.addAttribute("fibonacci", new Fibonacci());
        model.addAttribute("message", "Fibonacci Number Calculator");
        return "fibonacci";
    }

    public static long calculateFibonacci(int n) {
        if (n <= 1) {
            return n;
        }
        long a = 0, b = 1, c = 0;
        for (int i = 2; i <= n; i++) {
            c = a + b;
            a = b;
            b = c;
        }
        return b;
    }

}
