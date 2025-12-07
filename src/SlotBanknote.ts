import type { BanknoteNominal } from "./TypeBanknote";

export class SlotBanknote {
    constructor(private _nominal: BanknoteNominal, private _count: number = 0) {}

    get nominal(): BanknoteNominal {
        return this._nominal;
    }

    get count(): number {
        return this._count;
    }

    set count(value: number) {
        if(value < 0) {
            throw new Error("Количество банкнот не может быть отрицательным");
        }
        this._count = value;
    }
}
