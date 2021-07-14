export enum Entry {
    invalid='INVALID ENTRY'
}

export function stringCalculator(entries: string) {
    if (entries[entries.length - 1] === ',') throw new Error(Entry.invalid);
    let delimiter = ',';
    const newLine = '\\n';
    if (entries.startsWith('//')) {
        delimiter = entries.substring(2, entries.indexOf(newLine));
        entries = entries.substring(entries.indexOf('n') + 1);
    }
    return entries
        .replace(newLine, delimiter)
        .split(delimiter)
        .reduce((accumulator, entry) => accumulator + Number(entry ?? 0), 0);
}
