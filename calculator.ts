import {Entry} from "./errors/entry";
import {ErrorHandler} from "./errors/errorHandler";

export class Calculator {
    private newLine = '\\n';
    private indicatorOfDifferentDelimiter = '//';
    private delimiter = ',';

    constructor(private value: string) {
        this.init();
    }

    private init() {
        if (this.startWithNewDelimiter()) {
            this.changeDelimiter();
            this.removeIndicatorOfDifferentDelimiterFromValue();
        }
        this.replaceNewLineWithDelimiter();
        this.validator();
    }

    private startWithNewDelimiter(): boolean {
        return this.value.startsWith(this.indicatorOfDifferentDelimiter);
    }

    private changeDelimiter(): void {
        this.delimiter = this.value.substring(2, this.value.indexOf(this.newLine));
    }

    private removeIndicatorOfDifferentDelimiterFromValue(): void {
        this.value = this.value.substring(this.value.indexOf(this.newLine[this.newLine.length - 1]) + 1);
    }

    private replaceNewLineWithDelimiter(): void {
        this.value = this.value.replace(this.newLine, this.delimiter);
    }

    private validator(): void {
        this.valueEndsWithDelimiter();
        this.delimiterIncorrect();
    }

    private valueEndsWithDelimiter(): void {
        if (this.value.endsWith(this.delimiter)) throw new ErrorHandler(Entry.invalid);
    }

    private delimiterIncorrect(): void {
        const entriesSplitted: string[] = this.value.split(this.delimiter);
        const invalidValIndex: number = entriesSplitted.findIndex(val => isNaN(Number(val)));
        if (invalidValIndex > -1) {
            const indexInvalid = this.value.indexOf(entriesSplitted[invalidValIndex]) + entriesSplitted[invalidValIndex].toString().search(/\D/);
            throw new ErrorHandler(Entry.multipleDelimiter, [this.delimiter, this.value[indexInvalid], indexInvalid.toString()]);
        }
    }

    public add(): number {
        return this.value
            .split(this.delimiter)
            .reduce((accumulator, entry) => accumulator + Number(entry ?? 0), 0);
    }
}