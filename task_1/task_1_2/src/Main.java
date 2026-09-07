import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int position = getCorrectPosition(scanner, "Enter number of position: ");
        long fibonacciNumber = calculateFibonacci(position);
        System.out.println("Number: "+fibonacciNumber);
        scanner.close();
    }

    public static int getCorrectPosition(Scanner scanner, String input){
        int number = 0;
        boolean valid = false;
        while(!valid){
            System.out.print(input);
            if(scanner.hasNextInt()) {
                number = scanner.nextInt();
                if (number >= 0) {
                    valid = true;
                }else{
                    System.out.println("Enter correct not negative number");
                }
            }else{
                System.out.println("Enter correct value");
                scanner.next();
            }
        }
        return number;
    }

    public static long calculateFibonacci(int n){
        if(n<=1){
            return n;
        }
        long a=0,b=1,c=0;
        for(int i=2;i<=n;i++){
            c=a+b;
            a=b;
            b=c;
        }
        return b;
    }
}