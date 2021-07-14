export function stringCalculator(entry: string) {
    const entries = entry.split(',');
    const operandA = entries[0] ?? 0;
    const operandB = entries[1] ?? 0;
    return Number(operandA) + Number(operandB);
}
