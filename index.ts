export enum Entry {
    invalid='INVALID ENTRY'
}

export function stringCalculator(entries: string) {
    if (entries[entries.length - 1] === ',') throw new Error(Entry.invalid);
    return entries
        .replace('\\n', ',')
        .split(',')
        .reduce((accumulator, entry) => accumulator + Number(entry ?? 0), 0);
}
