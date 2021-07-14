import {Entry} from "./entry";

export class ErrorHandler extends Error {
    constructor(entry: Entry, variables?: string[], msg?: string) {
        if (entry === Entry.invalid) msg = entry;
        if (entry === Entry.multipleDelimiter) {
            if (variables) {
                msg = Entry.multipleDelimiter
                    .replace('%d', variables[0])
                    .replace('%d', variables[1])
                    .replace('%d', variables[2])
            }
        }
        super(msg);
    }
}
