export function stringCalculator(entry: string) {
    if (entry.length > 1) return Number(entry[0]) + Number(entry[2]);
    if (entry) return Number(entry);
    return 0;
}
