import {ErrorInvalid} from "./errors/errorInvalid";
import {ErrorMultipleDelimiter} from "./errors/errorMultipleDelimiter";
import {ErrorNegativeNumber} from "./errors/errorNegativeNumber";

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
        let errorAccumulator = '';
        try {
            this.valueEndsWithDelimiter();
        } catch (e) {
            if (errorAccumulator) errorAccumulator += this.newLine;
            errorAccumulator += e.message;
        }
        try {
            this.onlyPositiveNumber();
        } catch (e) {
            if (errorAccumulator) errorAccumulator += this.newLine;
            errorAccumulator += e.message;
        }
        let negativeNumbers: string[] = this.getValueSplitted().filter(val => isNaN(Number(val)));
        try {
            if (negativeNumbers.length) {
                const copy = [...negativeNumbers];
                copy.forEach((input, i) => {
                    if (isNaN(Number(input))) {
                        const delimiter = input[input.toString().search(/\D/)];
                        const newInputs = input.split(delimiter);
                        negativeNumbers.splice(i, 1);
                        negativeNumbers.splice(i, 0, newInputs[0], newInputs[1]);
                    }
                });
                this.onlyPositiveNumber(negativeNumbers);
            }
        } catch (e) {
            if (errorAccumulator) errorAccumulator += this.newLine;
            errorAccumulator += e.message;
        }
        try {
            this.delimiterIncorrect();
        } catch (e) {
            if (errorAccumulator) errorAccumulator += this.newLine;
            errorAccumulator += e.message;
        }
        if (errorAccumulator) throw new Error(errorAccumulator);
    }

    private valueEndsWithDelimiter(): void {
        if (this.value.endsWith(this.delimiter)) throw new ErrorInvalid();
    }

    private delimiterIncorrect(): void {
        const entriesSplitted: string[] = this.value.split(this.delimiter);
        const invalidValIndex: number = entriesSplitted.findIndex(val => isNaN(Number(val)));
        if (invalidValIndex > -1) {
            const indexInvalid = this.value.indexOf(entriesSplitted[invalidValIndex]) + entriesSplitted[invalidValIndex].toString().search(/\D/);
            throw new ErrorMultipleDelimiter([this.delimiter, this.value[indexInvalid], indexInvalid.toString()]);
        }
    }

    private onlyPositiveNumber(valueToCheck = this.getValueSplitted()): void {
        const entriesSplitted: string[] = valueToCheck;
        const negativeNumbers: string[] = entriesSplitted.filter(val => Number(val) < 0);
        if (negativeNumbers.length > 0) {
            let negativeValues: string = negativeNumbers[0].toString();
            if (negativeNumbers.length > 1) negativeValues = negativeNumbers.join(', ');
            throw new ErrorNegativeNumber(negativeValues);
        }
    }

    getValueSplitted(): string[] {
        return this.value.split(this.delimiter);
    }

    public add(): number {
        return this.value
            .split(this.delimiter)
            .reduce((accumulator, entry) => accumulator + Number(entry ?? 0), 0);
    }
}
