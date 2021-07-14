export function stringCalculator(entries: string) {
    return entries
        .split(',')
        .reduce((accumulator, entry) => accumulator + Number(entry ?? 0), 0);
}
