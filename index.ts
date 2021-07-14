export enum Entry {
    invalid='INVALID ENTRY'
}

class Calculator {
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
        this.guard();
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

    private guard(): void {
        if (this.value.endsWith(this.delimiter)) throw new Error(Entry.invalid);
        const entriesSplitted: string[] = this.value.split(this.delimiter);
        const invalidValIndex: number = entriesSplitted.findIndex(val => isNaN(Number(val)));
        if (invalidValIndex > -1) {
            const indexInvalid = this.value.indexOf(entriesSplitted[invalidValIndex]) + entriesSplitted[invalidValIndex].toString().search(/\D/);
            throw new Error(`${this.delimiter} expected but "${this.value[indexInvalid]}" found at position ${indexInvalid}`);
        }
    }

    public add(): number {
        return this.value
            .split(this.delimiter)
            .reduce((accumulator, entry) => accumulator + Number(entry ?? 0), 0);
    }
}

export function stringCalculator(input: string): number {
    return new Calculator(input).add();
}
