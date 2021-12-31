class Calculator {
    private _result: number = 0;
    private separator = ",";
    private lineRegex = "\\\\n";
    private line = "\\n";

    constructor(private inputs: string) {
    }

    convertToNumber() {
        if (this.inputs) {
            if (this.invalidInput()) throw new Error("Invalid inputs");
            if (this.inputsStartWithNewSeparator()) this.determineNewSeparator()
            const numbers: string[] = this.getNumbers();
            numbers.forEach(nb => this.addNumber(nb));
        }
    }

    private inputsStartWithNewSeparator() {
        // @ts-ignore
        return this.inputs.startsWith("//");
    }

    private determineNewSeparator() {
        const inputs = this.inputs.split(this.line);
        const firstLine = inputs[0];
        this.separator = firstLine.substring(2);
        this.inputs = this.filterFirstLine(inputs);
    }

    private filterFirstLine(inputs: string[]) {
        return inputs
            .filter((v, i) => i !== 0)
            .join(this.separator);
    }

    private invalidInput() {
        const regex = new RegExp(`.*${this.separator}${this.lineRegex}.*`)
        return regex.test(this.inputs);
    }

    private getNumbers(): string[] {
        return this.inputs
            .split(this.line)
            .join(this.separator)
            .split(this.separator);
    }

    private addNumber(stringToConvert: string) {
        this._result += Number(stringToConvert);
    }

    get result() {
        return this._result;
    }
}

export function stringCalculator(inputs: string) {
    const calculator: Calculator = new Calculator(inputs);
    calculator.convertToNumber();
    return calculator.result;
}
