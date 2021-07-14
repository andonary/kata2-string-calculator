import {Calculator} from "./calculator";

export function stringCalculator(input: string): number {
    return new Calculator(input).add();
}
