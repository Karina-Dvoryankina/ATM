import type { BanknoteNominal } from "./TypeBanknote";
import { SlotBanknote } from "./SlotBanknote";
import { StorageBanknote } from "./StorageBanknote";

export class StorageSlots implements StorageBanknote {
    private slots: Map<BanknoteNominal, SlotBanknote> = new Map();

    add(nominal: BanknoteNominal, count: number): void {
        if(count <= 0) {
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
        let executedOperations: Array<{slot: SlotBanknote, count: number}> = [];
        try {
            console.log("Выданные банкноты:");
        let totalWithdrawn = 0;
        
        for (const [nominal, requestedCount] of banknotes) {
            if (requestedCount <= 0) {
                throw new Error(`Неверное количество банкнот: ${requestedCount}`);
            }
            const slot = this.slots.get(nominal);
            if (!slot) {
                throw new Error(`Нет ячейки для номинала ${nominal}`);
            }
            if (slot.count < requestedCount) {
                throw new Error(`Недостаточно банкнот номиналом ${nominal}`);
            }
            
            console.log(`Номинал: ${nominal}, Количество: ${requestedCount}`);
            slot.count -= requestedCount;
            totalWithdrawn += nominal * requestedCount;
            
            executedOperations.push({slot, count: requestedCount});
        }
        console.log(`Общая выданная сумма: ${totalWithdrawn}`);

        } catch (error) {
            this.rollbackOperations(executedOperations);
            throw error;
        }
    }

    private rollbackOperations(operations: Array<{slot: SlotBanknote, count: number}>): void {
        for (const {slot, count} of operations) {
            slot.count += count;
        }
    }
}