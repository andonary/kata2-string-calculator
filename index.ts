export function stringCalculator(entries: string) {
    return entries
        .replace('\\n', ',')
        .split(',')
        .reduce((accumulator, entry) => accumulator + Number(entry ?? 0), 0);
}
