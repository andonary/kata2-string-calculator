import {Entry} from "./entry";

export class ErrorMultipleDelimiter extends Error {
    constructor(variables: string[], msg?: string) {
        msg = Entry.multipleDelimiter
            .replace('%d', variables[0])
            .replace('%d', variables[1])
            .replace('%d', variables[2]);
        super(msg);
    }
}
