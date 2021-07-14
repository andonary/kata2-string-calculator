import {Entry} from "./entry";

export class ErrorInvalid extends Error {
    constructor(msg?: string) {
        msg = Entry.invalid;
        super(msg);
    }
}
