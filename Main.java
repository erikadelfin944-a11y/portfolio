import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.println("====================================");
        System.out.println("       ERA MULTI-CALCULATOR         ");
        System.out.println("====================================");
        System.out.println("1. Shells Calculator");
        System.out.println("2. Trash Calculator");
        System.out.print("Choose mode (1 or 2): ");
        
        int choice = 1;
        if (input.hasNextInt()) {
            choice = input.nextInt();
        }

        if (choice == 2) {
            // Trash Calculator Mode
            System.out.println("\n--- TRASH CALCULATOR ---");
            System.out.print("Enter amount of bottles: ");
            double bottles = input.nextDouble();

            System.out.print("Enter amount of papers: ");
            double paper = input.nextDouble();

            System.out.print("Enter amount of news papers: ");
            double news = input.nextDouble();

            System.out.print("Enter amount of tires: ");
            double tire = input.nextDouble();

            System.out.print("Enter Trochus ratio (press Enter for default 3.7): ");
            input.nextLine(); // consume leftover newline
            String ratioLine = input.nextLine().trim();
            double ratio = 3.7;
            if (!ratioLine.isEmpty()) {
                try {
                    ratio = Double.parseDouble(ratioLine);
                } catch (NumberFormatException e) {
                    ratio = 3.7;
                }
            }

            double bott = bottles * 5;
            double ppr = paper * 4;
            double nppr = news * 4;
            double tre = tire * 6;

            double gralats = bott + ppr + nppr + tre;
            double totalTro = ratio > 0 ? (gralats / ratio) : 0;

            System.out.println("\n--- BREAKDOWN ---");
            System.out.println("Your total Gralats on bottles is: " + (long) bott);
            System.out.println("Your total Gralats on papers is: " + (long) ppr);
            System.out.println("Your total Gralats on news papers is: " + (long) nppr);
            System.out.println("Your total Gralats on tires is: " + (long) tre);
            System.out.println("Your total Gralats is: " + (long) gralats);
            System.out.printf("Your Gralats divided into tro (ratio %.2f): %.2f (or %d)\n", ratio, totalTro, (long) totalTro);

        } else {
            // Shells Calculator Mode
            System.out.println("\n--- SHELLS CALCULATOR ---");
            System.out.print("Enter Sand: ");
            double sand = input.nextDouble();

            System.out.print("Enter Scallop: ");
            double scall = input.nextDouble();

            System.out.print("Enter Starfish: ");
            double star = input.nextDouble();

            System.out.print("Enter Aero: ");
            double aero = input.nextDouble();

            System.out.print("Enter Ratio (e.g. 4.8): ");
            double ratio = input.nextDouble();

            double gra = sand * 5;
            double gral = scall * 5;
            double grala = star * 7;
            double gralat = aero * 3;

            double gralatss = gra + gral + grala + gralat;
            double total = ratio > 0 ? gralatss / ratio : 0;

            System.out.println("\n--- BREAKDOWN ---");
            System.out.println("Total Gralats: " + (long) gralatss);
            System.out.printf("Total Trochus: %.2f (or %d)\n", total, (long) total);
        }

        input.close();
    }
}