// ⁃  принимать банкноты разных номиналов (на каждый номинал должна быть своя
// ячейка)
//  ⁃ выдавать запрошенную сумму минимальным количеством банкнот или ошибку если
// сумму нельзя выдать
//  ⁃  выдавать сумму остатка денежных средств

import type { BanknoteNominal } from "./TypeBanknote";
import { StorageSlots } from "./StorageSlots";
import { WithdrawStrategy } from "./WithdrawStrategy";
import { SlotBanknote } from "./SlotBanknote";

export class ATM {
    constructor(
        private storage: StorageSlots = new StorageSlots(),
        private strategy: WithdrawStrategy = new WithdrawStrategy()
    ) {}

    deposit(nominal: BanknoteNominal, count: number) {
        this.storage.add(nominal, count);
    }

    withdraw(amount: number): void {
        if(amount <= 0) {
            throw new Error("Сумма для снятия должна быть положительным числом");
        }
        const slots = this.storage.getSlots();
        const banknotes = this.strategy.withdraw(amount, slots);
        this.storage.remove(banknotes);
    }

    getBalance(): number {
        return this.storage.getTotalAmount();
    }
}