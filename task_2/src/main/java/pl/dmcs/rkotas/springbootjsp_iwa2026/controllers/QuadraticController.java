package pl.dmcs.rkotas.springbootjsp_iwa2026.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import pl.dmcs.rkotas.springbootjsp_iwa2026.model.Quadratic;

@Controller
public class QuadraticController {

    @RequestMapping("/quadratic")
    public String quadratic(Model model) {
        model.addAttribute("message", "Quadratic Equation Solver");
        Quadratic newQuadratic = new Quadratic();
        model.addAttribute("quadratic", newQuadratic);
        return "quadratic";
    }

    @RequestMapping(value = "/addQuadratic.html", method = RequestMethod.POST)
    public String addQuadratic(@ModelAttribute("quadratic") Quadratic quadratic, Model model) {

        double a = quadratic.getA() != null ? quadratic.getA() : 0;
        double b = quadratic.getB() != null ? quadratic.getB() : 0;
        double c = quadratic.getC() != null ? quadratic.getC() : 0;

        System.out.println("Quadratic equation app");
        System.out.println("Coefficients: a=" + a + ", b=" + b + ", c=" + c);

        findZeroPlaces(a, b, c);

        model.addAttribute("quadratic", new Quadratic());
        model.addAttribute("message", "Quadratic Equation Solver");
        return "quadratic";
    }

    public static void findZeroPlaces(double a, double b, double c) {
        if (a == 0) {
            if (b == 0) {
                if (c == 0) {
                    System.out.println("Result: Every x is a zero place");
                } else {
                    System.out.println("Result: No zero places");
                }
            } else {
                double zeroPlace = -c / b;
                System.out.println("Zero place: x = " + zeroPlace);
            }
            return;
        }

        double delta = b * b - 4 * a * c;

        System.out.println("Delta: " + delta);

        if (delta > 0) {
            double zero1 = (-b + Math.sqrt(delta)) / (2 * a);
            double zero2 = (-b - Math.sqrt(delta)) / (2 * a);
            System.out.println("Two zero places:");
            System.out.println("x1 = " + zero1);
            System.out.println("x2 = " + zero2);
        } else if (delta == 0) {
            double zero = -b / (2 * a);
            System.out.println("One zero place:");
            System.out.println("x = " + zero);
        } else {
            System.out.println("No real zero places");
        }
    }

}
