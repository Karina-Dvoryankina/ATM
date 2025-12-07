import type { BanknoteNominal } from "./TypeBanknote";
import type { SlotBanknote } from "./SlotBanknote";

export interface StorageBanknote {
    add(nominal: BanknoteNominal, count: number): void;
    getSlots(): ReadonlyMap<BanknoteNominal, SlotBanknote>;
    getTotalAmount(): number;
    remove(banknotes: Map<BanknoteNominal, number>): void;
}