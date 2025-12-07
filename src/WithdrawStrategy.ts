import type { BanknoteNominal } from "./TypeBanknote";
import type { SlotBanknote } from "./SlotBanknote";

export interface WithdrawStrategy {
    withdraw(amount: number, slots: ReadonlyMap<BanknoteNominal, SlotBanknote>): Map<BanknoteNominal, number>;
}