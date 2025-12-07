import { ATM } from "./ATM";

const atm = new ATM();


atm.deposit(500, 10);
atm.deposit(1000, 0);
atm.deposit(50, 30);
atm.deposit(2000, 2);
atm.deposit(5000, 1);
atm.deposit(100, 15);

atm.withdraw(1600);
