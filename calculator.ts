import {ErrorInvalid} from "./errors/errorInvalid";
import {ErrorMultipleDelimiter} from "./errors/errorMultipleDelimiter";
import {ErrorNegativeNumber} from "./errors/errorNegativeNumber";

export class Calculator {
    private newLine = '\\n';
    private indicatorOfDifferentDelimiter = '//';
    private delimiter = ',';
    private errorAccumulator = '';

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

    private accumulator(e: Error): void {
        if (this.errorAccumulator) this.errorAccumulator += this.newLine;
        this.errorAccumulator += e.message;
    }

    private checkAccumulatorError() {
        if (this.errorAccumulator) throw new Error(this.errorAccumulator);
    }

    private validator(): void {
        try {
            this.valueEndsWithDelimiter();
        } catch (error) {
            this.accumulator(error);
        }
        try {
            this.onlyPositiveNumber();
        } catch (error) {
            this.accumulator(error);
        }
        try {
            this.onlyPositiveIfNaN();
        } catch (error) {
            this.accumulator(error);
        }
        try {
            this.delimiterIncorrect();
        } catch (error) {
            this.accumulator(error);
        }
        this.checkAccumulatorError();
    }

    private valueEndsWithDelimiter(): void {
        if (this.value.endsWith(this.delimiter)) throw new ErrorInvalid();
    }

    private delimiterIncorrect(): void {
        const entriesSplitted: string[] = this.getValueSplitted();
        const invalidValIndex: number = entriesSplitted.findIndex(val => isNaN(Number(val)));
        if (invalidValIndex > -1) {
            const indexInvalid = this.value.indexOf(entriesSplitted[invalidValIndex]) + entriesSplitted[invalidValIndex].toString().search(/\D/);
            throw new ErrorMultipleDelimiter([this.delimiter, this.value[indexInvalid], indexInvalid.toString()]);
        }
    }

    private onlyPositiveNumber(valueToCheck = this.getValueSplitted()): void {
        const negativeNumbers: string[] = valueToCheck.filter(val => Number(val) < 0);
        if (negativeNumbers.length > 0) {
            let negativeValues: string = negativeNumbers[0].toString();
            if (negativeNumbers.length > 1) negativeValues = negativeNumbers.join(', ');
            throw new ErrorNegativeNumber(negativeValues);
        }
    }

    private onlyPositiveIfNaN(): void {
        const notANumberValue: string[] = this.getValueSplitted().filter(val => isNaN(Number(val)));
        if (notANumberValue.length) {
            [...notANumberValue].forEach((input, i) => {
                if (isNaN(Number(input))) {
                    const delimiter = input[input.toString().search(/\D/)];
                    const newInputs = input.split(delimiter);
                    notANumberValue.splice(i, 1, newInputs[0], newInputs[1]);
                }
            });
            this.onlyPositiveNumber(notANumberValue);
        }
    }

    private getValueSplitted(): string[] {
        return this.value.split(this.delimiter);
    }

    public add(): number {
        return this.value
            .split(this.delimiter)
            .reduce((accumulator, entry) => accumulator + this.entryParsed(entry), 0);
    }

    private entryParsed(entry: string): number {
        const result = Number(entry ?? 0);
        return result < 1000 ? result : 0;
    }
}
