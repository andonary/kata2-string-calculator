export enum Entry {
    invalid='INVALID ENTRY'
}

export function stringCalculator(entries: string) {
    let delimiter = ',';
    const newLine = '\\n';
    if (entries.startsWith('//')) {
        delimiter = entries.substring(2, entries.indexOf(newLine));
        entries = entries.substring(entries.indexOf('n') + 1);
    }
    if (entries.endsWith(delimiter)) throw new Error(Entry.invalid);
    return entries
        .replace(newLine, delimiter)
        .split(delimiter)
        .reduce((accumulator, entry) => accumulator + Number(entry ?? 0), 0);
}
