import {Entry} from "./entry";

export class ErrorNegativeNumber extends Error {
    constructor(variables: string[], msg?: string) {
        msg = Entry.negativeNumber
            .replace('%d', variables[0]);
        super(msg);
    }
}
