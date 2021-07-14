import {Entry} from "./entry";

export class ErrorNegativeNumber extends Error {
    constructor(listNegativeNumber: string, msg?: string) {
        msg = Entry.negativeNumber
            .replace('%d', listNegativeNumber);
        super(msg);
    }
}
