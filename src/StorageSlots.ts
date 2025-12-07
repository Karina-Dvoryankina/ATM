import type { BanknoteNominal } from "./TypeBanknote";
import { SlotBanknote } from "./SlotBanknote";

export class StorageSlots {
    slots: Map<BanknoteNominal, SlotBanknote> = new Map();

    add(nominal: BanknoteNominal, count: number): void {
        if(count < 0) {
            throw new Error("Количество банкнот должно быть положительным числом");
        }

        let slot = this.slots.get(nominal);
        if(!slot){
            slot = new SlotBanknote(nominal);
            this.slots.set(nominal, slot);
        }
        slot.count += count;
    }

    getSlots(): ReadonlyMap<BanknoteNominal, SlotBanknote> {
        return this.slots;
    }

    getTotalAmount(): number {
        let total = 0;
        this.slots.forEach((slot) => {
            total += slot.nominal * slot.count;
        });
        return total;
    }

    remove(banknotes: Map<BanknoteNominal, number>): void {
        console.log("Выданные банкноты:");
        banknotes.forEach((count, nominal) => {
            console.log(`Номинал: ${nominal}, Количество: ${count}`);
            const slot = this.slots.get(nominal);
            if(slot){
                slot.count -= count;
            }
        });
    }
}