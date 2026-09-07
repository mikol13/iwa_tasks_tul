import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Quadratic equation app");
        double a = getCoeffictient(scanner,"a");
        double b = getCoeffictient(scanner,"b");
        double c = getCoeffictient(scanner,"c");

        findZeroPlaces(a,b,c);
        scanner.close();
    }

    public static double getCoeffictient(Scanner scanner, String name){
        double value = 0.0;
        int valid = 0;

        while(valid != 1){
            System.out.println("Enter coefficient");

            if(scanner.hasNextDouble()) {
                value = scanner.nextDouble();
                valid = 1;
            }else{
                System.out.println("Enter correct number");
                scanner.next();
            }
        }
        return value;
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
