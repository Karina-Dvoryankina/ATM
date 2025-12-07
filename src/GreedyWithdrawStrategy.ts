import type { BanknoteNominal } from "./TypeBanknote";
import { SlotBanknote } from "./SlotBanknote";
import { WithdrawStrategy } from "./WithdrawStrategy";

export class GreedyWithdrawStrategy implements WithdrawStrategy {
    constructor() {}

    withdraw(amount: number, slots: ReadonlyMap<BanknoteNominal, SlotBanknote>) {
        let result: Map<BanknoteNominal, number> = new Map();
        let remaining = amount;

        const sortedNominals = Array.from(slots.keys()).sort((a, b) => b - a);

        for(const nominal of sortedNominals){
            const slot = slots.get(nominal);
            if(!slot || slot.count === 0 || nominal > remaining) continue;

            const neededBanknotes = Math.floor(remaining / nominal);
            const banknotesToWithdraw = Math.min(neededBanknotes, slot.count);

            if(banknotesToWithdraw > 0){
                result.set(nominal, banknotesToWithdraw);
                remaining -= banknotesToWithdraw * nominal;
            }

            if(remaining === 0) break;
        }

        if(remaining > 0){
            throw new Error("Невозможно выдать запрошенную сумму");
        }
        return result;
    }
}